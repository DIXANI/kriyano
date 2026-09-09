interface Env {
  AI: Ai;
  ASSETS: Fetcher;
}

export default {
  async fetch(
    request: Request,
    env: Env
  ): Promise<Response> {
    const url = new URL(request.url);

    /*
     * KRIYANO CHECK API
     */
    if (url.pathname === "/api/check") {
      if (request.method !== "POST") {
        return Response.json(
          {
            ok: false,
            error: "Method not allowed"
          },
          {
            status: 405,
            headers: {
              "Allow": "POST"
            }
          }
        );
      }

      try {
        const body = await request.json() as {
          text?: unknown;
        };

        if (
          typeof body.text !== "string" ||
          body.text.trim().length === 0
        ) {
          return Response.json(
            {
              ok: false,
              error: "Text is required"
            },
            { status: 400 }
          );
        }

        const text = body.text.trim();

        if (text.length > 8000) {
          return Response.json(
            {
              ok: false,
              error: "Text exceeds the 8,000 character limit"
            },
            { status: 400 }
          );
        }

        /*
         * First controlled Workers AI test.
         *
         * For now we ask for only a very small semantic analysis:
         * identify up to 3 statements that may need verification.
         */
        const aiResponse = await env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct-fast",
  {
    messages: [
      {
        role: "system",
        content: `
You are the semantic review engine for KRIYANO CHECK.

KRIYANO CHECK helps users identify what needs verification in
AI-generated work before they rely on it.

IMPORTANT:
- Do NOT decide whether the text is true or false.
- Do NOT provide an accuracy percentage.
- Do NOT claim a statement is false merely because it needs verification.
- Review requirements are not truth scores.

Analyze the supplied text for:

1. Specific factual claims
2. Numbers or statistics that carry factual meaning
3. Assumptions
4. Recommendations or instructions
5. Sources or citations that should be checked
6. Time-sensitive or potentially outdated information
7. Statements where relying on them could have meaningful consequences

Your job is to identify and classify the findings that require review.

KRIYANO determines the final review level separately from your findings.

FINDING CLASSIFICATION RULES:

light_review:
Use when the text is mostly explanatory, creative, organizational,
or low-risk and contains little that requires external verification.

review_advised:
Use when the text contains factual claims, recommendations,
assumptions, numbers, or sources that would be sensible to check,
but ordinary use is unlikely to cause significant harm.

verification_needed:
Use when important claims, numbers, recommendations, sources,
or time-sensitive information materially affect how the user may
act on the answer and should be verified before relying on it.

high_impact_review:

Use this level when the AI-generated text could directly influence
a consequential decision involving:

- medical treatment, medication, dosage, diagnosis, symptoms, or health decisions
- legal rights, legal obligations, contracts, immigration, or legal action

LEGAL HIGH-IMPACT RULE:

If the text tells someone what they legally can, cannot, must, or do not
have to do, and acting on that information could materially affect
another person's rights, property, employment, immigration status,
contractual rights, or access to housing, classify the relevant finding
as "high_impact".

Examples include advice or claims about:
- eviction or removing a tenant
- changing locks or removing someone's belongings
- terminating a lease or contract
- arrest, criminal liability, or reporting someone to authorities
- immigration or visa status
- firing or disciplining a specific employee
- legal deadlines, required notices, or legal procedures
- whether someone has a legal right or obligation

Do not classify these merely as "factual_claim" or "recommendation"
when the text could cause someone to take consequential legal action.

General explanations of legal concepts that do not instruct or strongly
influence a real-world consequential action do not automatically require
a high_impact finding.

- significant personal financial decisions, investments, loans, debt, or taxes
- personal or workplace safety where injury could result
- cybersecurity or physical security where harmful access or loss could result
- employment or hiring decisions that materially affect a specific person
- other situations where acting on incorrect information could reasonably
  cause serious harm

IMPORTANT:

If a recommendation concerns medication, dosage, stopping or starting
treatment, diagnosis, or medical action, classify that finding as
"high_impact", not merely "recommendation".

If advice tells someone to take, stop, reduce, increase, replace,
or change prescribed medication, it MUST produce a high_impact finding.

Likewise, when a recommendation directly concerns another consequential
category above, prefer "high_impact" over "recommendation".

Do NOT use high_impact merely because ordinary business, warehouse,
marketing, productivity, writing, educational, or operational advice
could cost time or money.

When uncertain between two levels, choose the lower level.

Identify no more than 5 priority findings.

For every finding provide:
- type
- text
- why
- howToVerify

DEDUPLICATION RULES:

Each underlying issue should normally appear only once in priorities.

Do not create separate findings for a number and the factual claim
containing that number when they refer to the same verification task.

Example:
"Inventory accuracy should be 99.5%."

Do NOT return both:
- a factual_claim about the 99.5% accuracy requirement
- a number finding about 99.5%

Return the single finding that best represents what the user needs
to verify.

Prefer:
- "high_impact" when the issue is consequential
- "source" when verification primarily depends on checking a cited source
- "time_sensitive" when freshness is the main concern
- "factual_claim" when a claim needs external verification
- "recommendation" when advice or judgment is the main issue
- "assumption" when an unstated premise is the main issue
- "number" only when the numeric value or calculation itself is the
  main verification issue

Do not repeat substantially the same statement under multiple types.

Allowed finding types:

factual_claim
number
assumption
recommendation
source
time_sensitive
high_impact

Return ONLY valid JSON.

Use exactly this structure:

{
  "summary": "Short review summary.",
  "priorities": [
    {
      "type": "factual_claim",
      "text": "Exact or concise statement requiring review.",
      "why": "Why this deserves verification.",
      "howToVerify": "Practical verification step."
    }
  ]
}

Do not wrap the JSON in markdown.
Do not include commentary outside the JSON.
        `.trim()
      },
      {
        role: "user",
        content: text
      }
    ],
    max_tokens: 900,
    temperature: 0
  }
);
        const rawAnalysis =
  (aiResponse as any).response ??
  (aiResponse as any).choices?.[0]?.message?.content;

let analysis;

if (typeof rawAnalysis === "string") {
  analysis = JSON.parse(rawAnalysis);
} else {
  analysis = rawAnalysis;
}

if (
  !analysis ||
  typeof analysis !== "object" ||
  typeof analysis.summary !== "string" ||
  !Array.isArray(analysis.priorities)
) {
  throw new Error("Workers AI returned an invalid analysis structure");
}



const allowedTypes = [
  "factual_claim",
  "number",
  "assumption",
  "recommendation",
  "source",
  "time_sensitive",
  "high_impact"
];



const validFindings = analysis.priorities.filter(
  (item: any) =>
    item &&
    allowedTypes.includes(item.type) &&
    typeof item.text === "string" &&
    typeof item.why === "string" &&
    typeof item.howToVerify === "string"
);

/*
 * Remove duplicate numeric findings when the same number
 * already appears inside a more meaningful semantic finding.
 *
 * Example:
 * factual_claim: "Inventory accuracy should be 99.5%."
 * number: "99.5%"
 *
 * Keep the factual claim and remove the duplicate number finding.
 */
const deduplicatedFindings = validFindings.filter(
  (item: any, index: number, items: any[]) => {
    if (item.type !== "number") {
      return true;
    }

    const numericText = item.text.trim().toLowerCase();

    const coveredByAnotherFinding = items.some(
      (other: any, otherIndex: number) =>
        otherIndex !== index &&
        other.type !== "number" &&
        other.text
          .trim()
          .toLowerCase()
          .includes(numericText)
    );

    return !coveredByAnotherFinding;
  }
);

analysis.priorities = deduplicatedFindings.slice(0, 5);

  /*
 * KRIYANO REVIEW LEVEL
 *
 * The model identifies semantic findings.
 * KRIYANO determines the final review level so that
 * repeated checks are more consistent.
 */

const findings = analysis.priorities;

const hasHighImpact = findings.some(
  (item: any) => item.type === "high_impact"
);

const verificationTypes = new Set([
  "factual_claim",
  "number",
  "source",
  "time_sensitive"
]);

const verificationCount = findings.filter(
  (item: any) => verificationTypes.has(item.type)
).length;

const advisoryCount = findings.filter(
  (item: any) =>
    item.type === "assumption" ||
    item.type === "recommendation"
).length;

let reviewLevel:
  | "light_review"
  | "review_advised"
  | "verification_needed"
  | "high_impact_review";

if (hasHighImpact) {
  reviewLevel = "high_impact_review";
} else if (verificationCount >= 2) {
  reviewLevel = "verification_needed";
} else if (
  verificationCount === 1 ||
  advisoryCount > 0
) {
  reviewLevel = "review_advised";
} else {
  reviewLevel = "light_review";
}

analysis.reviewLevel = reviewLevel;

return Response.json({
  ok: true,
  analysis
});
     } catch (error) {
  console.error("KRIYANO CHECK error:", error);

  const message =
    error instanceof Error
      ? error.message
      : String(error);

  return Response.json(
    {
      ok: false,
      error: "Unable to complete AI review",
      details: message
    },
    { status: 500 }
  );
}
    }

    /*
     * Serve the existing Astro site.
     */
    return env.ASSETS.fetch(request);
  }
};