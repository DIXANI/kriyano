export interface PromptLibraryItem {
  title: string;
  category: string;
  description: string;
  href: string;
  keywords?: string;
}

export const promptLibrary: PromptLibraryItem[] = [
  // =========================================================
  // WORK & PRODUCTIVITY
  // =========================================================

  {
    title: "Professional Email Writer",
    category: "Work & Productivity",
    description:
      "Turn rough notes into a clear, professional email with the right tone and structure.",
    href: "/prompts/professional-email-writer/",
    keywords:
      "email message reply communication workplace business formal writing",
  },
  {
    title: "Meeting Summary",
    category: "Work & Productivity",
    description:
      "Turn meeting notes or transcripts into a clear summary with decisions and action items.",
    href: "/prompts/meeting-summary/",
    keywords:
      "meeting minutes notes actions decisions follow up summary work",
  },
  {
    title: "Task Prioritization",
    category: "Work & Productivity",
    description:
      "Prioritize competing tasks using urgency, importance, impact and practical constraints.",
    href: "/prompts/task-prioritization/",
    keywords:
      "tasks priority workload urgent important productivity planning",
  },
  {
    title: "Weekly Work Planner",
    category: "Work & Productivity",
    description:
      "Turn responsibilities and deadlines into a realistic weekly work plan.",
    href: "/prompts/weekly-work-planner/",
    keywords:
      "weekly schedule planning productivity tasks workload time management",
  },
  {
    title: "Manager Update Writer",
    category: "Work & Productivity",
    description:
      "Create concise professional updates for managers about progress, issues and next steps.",
    href: "/prompts/manager-update-writer/",
    keywords:
      "manager status update progress report supervisor communication",
  },
  {
    title: "Problem Solving",
    category: "Work & Productivity",
    description:
      "Break a problem into causes, options, constraints and practical next actions.",
    href: "/prompts/problem-solving/",
    keywords:
      "problem solve troubleshooting analysis options solution work",
  },
  {
    title: "Decision Making",
    category: "Work & Productivity",
    description:
      "Compare options using clear criteria, risks, trade-offs and available evidence.",
    href: "/prompts/decision-making/",
    keywords:
      "decision compare options criteria risk choice recommendation",
  },
  {
    title: "Process Improvement",
    category: "Work & Productivity",
    description:
      "Review an existing process and identify waste, delays, risks and improvement opportunities.",
    href: "/prompts/process-improvement/",
    keywords:
      "process workflow improvement efficiency waste bottleneck lean",
  },
  {
    title: "Performance Review Preparation",
    category: "Work & Productivity",
    description:
      "Prepare evidence, achievements and development points for a performance review.",
    href: "/prompts/performance-review-preparation/",
    keywords:
      "performance appraisal review achievements career employee manager",
  },
  {
    title: "Difficult Workplace Conversation",
    category: "Work & Productivity",
    description:
      "Prepare for a sensitive professional conversation with clear and constructive language.",
    href: "/prompts/difficult-workplace-conversation/",
    keywords:
      "workplace conversation conflict feedback employee manager difficult",
  },
  {
    title: "Action Plan Generator",
    category: "Work & Productivity",
    description:
      "Turn a goal or problem into practical actions, priorities, owners and checkpoints.",
    href: "/prompts/action-plan-generator/",
    keywords:
      "action plan goals tasks implementation priorities follow up",
  },
  {
    title: "Work Document Simplifier",
    category: "Work & Productivity",
    description:
      "Simplify complex workplace documents while preserving important meaning and requirements.",
    href: "/prompts/work-document-simplifier/",
    keywords:
      "document simplify rewrite policy procedure workplace text clarity",
  },

  // =========================================================
  // BUSINESS
  // =========================================================

  {
    title: "Business Idea Evaluator",
    category: "Business",
    description:
      "Evaluate a business idea using customer need, competition, feasibility, cost and risk.",
    href: "/prompts/business-idea-evaluator/",
    keywords:
      "business idea startup opportunity feasibility market entrepreneur",
  },
  {
    title: "Business Plan Builder",
    category: "Business",
    description:
      "Build a structured practical business plan from an idea, market and operating model.",
    href: "/prompts/business-plan-builder/",
    keywords:
      "business plan startup strategy operations finance entrepreneur",
  },
  {
    title: "Customer Persona Builder",
    category: "Business",
    description:
      "Build useful customer personas around real needs, behaviors, constraints and buying context.",
    href: "/prompts/customer-persona-builder/",
    keywords:
      "customer persona buyer audience target market user profile",
  },
  {
    title: "Pricing Strategy",
    category: "Business",
    description:
      "Evaluate pricing options using customer value, costs, positioning and market context.",
    href: "/prompts/pricing-strategy/",
    keywords:
      "pricing price margin value cost profit business strategy",
  },
  {
    title: "SWOT Analysis",
    category: "Business",
    description:
      "Create a practical SWOT analysis focused on decisions rather than generic observations.",
    href: "/prompts/swot-analysis/",
    keywords:
      "swot strengths weaknesses opportunities threats strategy business",
  },
  {
    title: "Business Risk Analysis",
    category: "Business",
    description:
      "Identify business risks, causes, impact, controls and practical mitigation actions.",
    href: "/prompts/business-risk-analysis/",
    keywords:
      "risk business mitigation controls threats operational financial",
  },
  {
    title: "Business Decision Framework",
    category: "Business",
    description:
      "Structure an important business decision using evidence, criteria and trade-offs.",
    href: "/prompts/business-decision-framework/",
    keywords:
      "business decision options criteria strategy recommendation tradeoffs",
  },
  {
    title: "Competitor Analysis",
    category: "Business",
    description:
      "Compare competitors using products, positioning, customers, strengths and strategic gaps.",
    href: "/prompts/competitor-analysis/",
    keywords:
      "competitor competition business market analysis benchmarking",
  },
  {
    title: "Market Research",
    category: "Business",
    description:
      "Structure market research around customers, demand, competitors, evidence and uncertainty.",
    href: "/prompts/market-research/",
    keywords:
      "market research demand customers competitors industry opportunity",
  },
  {
    title: "Root Cause Analysis",
    category: "Business",
    description:
      "Investigate a recurring problem by separating symptoms from underlying causes.",
    href: "/prompts/root-cause-analysis/",
    keywords:
      "root cause rca problem investigation 5 why fishbone corrective",
  },

  // =========================================================
  // MARKETING
  // =========================================================

  {
    title: "Marketing Strategy",
    category: "Marketing",
    description:
      "Build a practical marketing strategy around audience, positioning, channels and objectives.",
    href: "/prompts/marketing-strategy/",
    keywords:
      "marketing strategy audience channels positioning promotion growth",
  },
  {
    title: "Campaign Idea Generator",
    category: "Marketing",
    description:
      "Generate campaign concepts connected to a clear audience, offer and marketing objective.",
    href: "/prompts/campaign-idea-generator/",
    keywords:
      "campaign ideas advertising promotion marketing concept creative",
  },
  {
    title: "Customer Pain Point Research",
    category: "Marketing",
    description:
      "Identify and organize customer problems, frustrations, motivations and unresolved needs.",
    href: "/prompts/customer-pain-point-research/",
    keywords:
      "customer pain points problems audience research needs frustrations",
  },
  {
    title: "Value Proposition Builder",
    category: "Marketing",
    description:
      "Develop a clear value proposition connecting customer problems to meaningful benefits.",
    href: "/prompts/value-proposition-builder/",
    keywords:
      "value proposition positioning offer benefits customer marketing",
  },
  {
    title: "Ad Copy Writer",
    category: "Marketing",
    description:
      "Create advertising copy built around the audience, offer, evidence and campaign objective.",
    href: "/prompts/ad-copy-writer/",
    keywords:
      "advertising ad copy ads headline campaign marketing conversion",
  },
  {
    title: "Landing Page Messaging",
    category: "Marketing",
    description:
      "Structure landing-page messaging around visitor intent, benefits, objections and action.",
    href: "/prompts/landing-page-messaging/",
    keywords:
      "landing page website copy conversion headline offer cta marketing",
  },
  {
    title: "Content Repurposing",
    category: "Marketing",
    description:
      "Transform strong source content into useful platform-native secondary content.",
    href: "/prompts/content-repurposing/",
    keywords:
      "repurpose content social media blog video posts marketing creator",
  },
  {
    title: "Email Marketing Campaign",
    category: "Marketing",
    description:
      "Plan a purposeful email campaign with messaging, sequence, audience and calls to action.",
    href: "/prompts/email-marketing-campaign/",
    keywords:
      "email marketing campaign newsletter sequence automation promotion",
  },
  {
    title: "Marketing Performance Review",
    category: "Marketing",
    description:
      "Review marketing performance against objectives and identify useful next actions.",
    href: "/prompts/marketing-performance-review/",
    keywords:
      "marketing analytics performance kpi campaign metrics review",
  },
  {
    title: "Social Media Content Planner",
    category: "Marketing",
    description:
      "Plan useful social content around audience needs, objectives and repeatable content pillars.",
    href: "/prompts/social-media-content-planner/",
    keywords:
      "social media content calendar posts planning creators marketing",
  },

  // =========================================================
  // WRITING
  // =========================================================

  {
    title: "Article & Blog Writer",
    category: "Writing",
    description:
      "Develop a useful article or blog post with structure, audience fit and clear reasoning.",
    href: "/prompts/article-blog-writer/",
    keywords:
      "article blog writing content seo draft writer",
  },
  {
    title: "Text Summarizer",
    category: "Writing",
    description:
      "Condense long text while preserving its important ideas, context and limitations.",
    href: "/prompts/text-summarizer/",
    keywords:
      "summary summarize text document notes concise writing",
  },
  {
    title: "Report Writer",
    category: "Writing",
    description:
      "Turn information, findings and observations into a structured professional report.",
    href: "/prompts/report-writer/",
    keywords:
      "report writing professional findings analysis document work",
  },
  {
    title: "Proofreading & Grammar",
    category: "Writing",
    description:
      "Correct grammar, spelling and readability while preserving the writer's intended meaning.",
    href: "/prompts/proofreading-grammar/",
    keywords:
      "proofread grammar spelling correction edit writing",
  },
  {
    title: "Tone & Style Adapter",
    category: "Writing",
    description:
      "Adapt existing writing to a target tone, audience and communication context.",
    href: "/prompts/tone-style-adapter/",
    keywords:
      "tone style rewrite audience formal casual writing voice",
  },
  {
    title: "Rewrite for Clarity",
    category: "Writing",
    description:
      "Rewrite unclear text into simpler, more direct and easier-to-understand language.",
    href: "/prompts/rewrite-for-clarity/",
    keywords:
      "rewrite clarity simplify improve writing text",
  },
  {
    title: "Professional Tone Rewriter",
    category: "Writing",
    description:
      "Rewrite messages and documents in a natural professional tone without sounding robotic.",
    href: "/prompts/professional-tone-rewriter/",
    keywords:
      "professional tone rewrite business writing human natural",
  },
  {
    title: "Humanize AI-Written Text",
    category: "Writing",
    description:
      "Improve AI-generated writing so it sounds more natural, specific and context-aware.",
    href: "/prompts/humanize-ai-written-text/",
    keywords:
      "humanize ai text rewrite natural writing robotic",
  },

  // =========================================================
  // RESEARCH
  // =========================================================

  {
    title: "Research & Comparison",
    category: "Research",
    description:
      "Compare options through defined criteria, evidence, limitations and recommendations.",
    href: "/prompts/research-comparison/",
    keywords:
      "research comparison compare options evidence recommendation",
  },
  {
    title: "Research Plan Builder",
    category: "Research",
    description:
      "Turn a question into a structured research plan with scope, sources and evaluation criteria.",
    href: "/prompts/research-plan-builder/",
    keywords:
      "research plan methodology questions sources scope",
  },
  {
    title: "Source Evaluation",
    category: "Research",
    description:
      "Evaluate a source for relevance, authority, evidence, bias and limitations.",
    href: "/prompts/source-evaluation/",
    keywords:
      "source credibility evidence authority reliability research",
  },
  {
    title: "Fact Checking",
    category: "Research",
    description:
      "Break claims into verifiable parts and assess them against appropriate evidence.",
    href: "/prompts/fact-checking/",
    keywords:
      "fact check verification claim evidence source accuracy",
  },
  {
    title: "Competitor Research",
    category: "Research",
    description:
      "Research competitors systematically without confusing assumptions with verified information.",
    href: "/prompts/competitor-research/",
    keywords:
      "competitor research competition market benchmarking evidence",
  },
  {
    title: "Topic Deep Dive",
    category: "Research",
    description:
      "Explore a topic systematically from fundamentals through evidence, debates and open questions.",
    href: "/prompts/topic-deep-dive/",
    keywords:
      "deep research topic analysis learn evidence overview",
  },
  {
    title: "Research Summary",
    category: "Research",
    description:
      "Turn research findings into a structured summary with evidence, uncertainty and conclusions.",
    href: "/prompts/research-summary/",
    keywords:
      "research summary findings evidence synthesis conclusions",
  },
  {
    title: "Market Research",
    category: "Research",
    description:
      "Investigate a market through customer demand, competitors, trends and supporting evidence.",
    href: "/prompts/market-research/",
    keywords:
      "market industry customer research demand trends competition",
  },

  // =========================================================
  // CREATORS
  // =========================================================

  {
    title: "Short-Form Video Idea Generator",
    category: "Creators",
    description:
      "Generate practical short-form video ideas around audience needs and creator goals.",
    href: "/prompts/short-form-video-idea-generator/",
    keywords:
      "reels shorts tiktok ideas creator video content social media",
  },
  {
    title: "Hook Generator",
    category: "Creators",
    description:
      "Generate strong, relevant hooks without relying on misleading clickbait.",
    href: "/prompts/hook-generator/",
    keywords:
      "hook opening headline reels shorts content attention creator",
  },
  {
    title: "Short-Form Video Script",
    category: "Creators",
    description:
      "Turn a content idea into a concise short-form video script with a clear flow.",
    href: "/prompts/short-form-video-script/",
    keywords:
      "video script reels shorts tiktok creator social content",
  },
  {
    title: "Creator Content Pillar Builder",
    category: "Creators",
    description:
      "Build sustainable content pillars around expertise, audience needs and creator goals.",
    href: "/prompts/creator-content-pillar-builder/",
    keywords:
      "content pillars creator strategy topics niche social media",
  },
  {
    title: "Audience Question Generator",
    category: "Creators",
    description:
      "Generate useful audience questions for research, education and future content planning.",
    href: "/prompts/audience-question-generator/",
    keywords:
      "audience questions content ideas research creator topics",
  },
  {
    title: "YouTube Video Outline",
    category: "Creators",
    description:
      "Build a structured YouTube video outline with hooks, sections, visuals and retention points.",
    href: "/prompts/youtube-video-outline/",
    keywords:
      "youtube outline video creator long form script retention",
  },
  {
    title: "Caption Writer",
    category: "Creators",
    description:
      "Write platform-aware social media captions that add value to the visual content.",
    href: "/prompts/caption-writer/",
    keywords:
      "caption instagram facebook linkedin tiktok youtube social media",
  },
  {
    title: "Creator Workflow Planner",
    category: "Creators",
    description:
      "Build a sustainable creator workflow from idea capture through publishing and review.",
    href: "/prompts/creator-workflow-planner/",
    keywords:
      "creator workflow content production batching scheduling ai publishing",
  },
  {
    title: "Social Media Content Planner",
    category: "Creators",
    description:
      "Plan useful social content around audience needs, objectives and repeatable content pillars.",
    href: "/prompts/social-media-content-planner/",
    keywords:
      "social media planner calendar creator posts content strategy",
  },
  {
    title: "Content Repurposing",
    category: "Creators",
    description:
      "Turn strong source content into adapted content for other platforms and formats.",
    href: "/prompts/content-repurposing/",
    keywords:
      "repurpose content creator platforms reels posts clips",
  },

  // =========================================================
  // IMAGE GENERATION
  // =========================================================

  {
    title: "AI Image Prompt Builder",
    category: "Image Generation",
    description:
      "Build detailed AI image prompts around subject, composition, lighting, style and constraints.",
    href: "/prompts/ai-image-prompt-builder/",
    keywords:
      "image prompt ai art generation visual prompt builder",
  },
  {
    title: "Product Photography",
    category: "Image Generation",
    description:
      "Create detailed prompts for professional product photography and commercial visuals.",
    href: "/prompts/product-photography/",
    keywords:
      "product photography commercial image studio lighting ecommerce",
  },
  {
    title: "Food Photography",
    category: "Image Generation",
    description:
      "Build appetizing food photography prompts with realistic styling, lighting and composition.",
    href: "/prompts/food-photography/",
    keywords:
      "food photography recipe restaurant image lighting dish",
  },
  {
    title: "Character Consistency",
    category: "Image Generation",
    description:
      "Create image prompts designed to preserve character identity across multiple generations.",
    href: "/prompts/character-consistency/",
    keywords:
      "character consistency identity avatar image ai person continuity",
  },
  {
    title: "Social Media Visual",
    category: "Image Generation",
    description:
      "Create image prompts for platform-ready social media graphics and visual content.",
    href: "/prompts/social-media-visual/",
    keywords:
      "social media visual graphic image instagram facebook linkedin",
  },
  {
    title: "Advertising Creative",
    category: "Image Generation",
    description:
      "Create commercially focused image prompts for advertising concepts and campaigns.",
    href: "/prompts/advertising-creative/",
    keywords:
      "advertising creative image ad commercial campaign visual",
  },
  {
    title: "Thumbnail Design",
    category: "Image Generation",
    description:
      "Build clear thumbnail concepts designed for readability, relevance and visual hierarchy.",
    href: "/prompts/thumbnail-design/",
    keywords:
      "thumbnail youtube cover image design click visual",
  },
  {
    title: "Infographic Image",
    category: "Image Generation",
    description:
      "Turn structured information into a clear AI-generated infographic design brief.",
    href: "/prompts/infographic-image/",
    keywords:
      "infographic information graphic image educational visual design",
  },

  // =========================================================
  // VIDEO GENERATION
  // =========================================================

  {
    title: "AI Video Prompt Builder",
    category: "Video Generation",
    description:
      "Build structured AI video prompts covering scene, subject, motion, camera and continuity.",
    href: "/prompts/ai-video-prompt-builder/",
    keywords:
      "ai video prompt builder scene camera motion generation",
  },
  {
    title: "Text to Video",
    category: "Video Generation",
    description:
      "Turn a written concept into a detailed prompt for text-to-video generation.",
    href: "/prompts/text-to-video/",
    keywords:
      "text to video ai generation scene prompt",
  },
  {
    title: "Image to Video",
    category: "Video Generation",
    description:
      "Animate a source image while preserving important visual identity and scene details.",
    href: "/prompts/image-to-video/",
    keywords:
      "image to video animate motion ai generation reference",
  },
  {
    title: "Multi-Scene Video",
    category: "Video Generation",
    description:
      "Plan multiple AI-generated scenes with consistent progression and visual continuity.",
    href: "/prompts/multi-scene-video/",
    keywords:
      "multi scene video sequence storyboard continuity ai",
  },
  {
    title: "Product Commercial Video",
    category: "Video Generation",
    description:
      "Create AI video prompts for polished product-focused commercial sequences.",
    href: "/prompts/product-commercial-video/",
    keywords:
      "product commercial advertising video cinematic ecommerce",
  },
  {
    title: "Cinematic Camera Motion",
    category: "Video Generation",
    description:
      "Describe intentional camera movement for more controlled cinematic AI video generation.",
    href: "/prompts/cinematic-camera-motion/",
    keywords:
      "camera motion cinematic dolly pan tilt tracking video",
  },
  {
    title: "Short-Form Reel Video",
    category: "Video Generation",
    description:
      "Build vertical short-form AI video prompts for Reels, Shorts and similar formats.",
    href: "/prompts/short-form-reel-video/",
    keywords:
      "reel reels shorts tiktok vertical short video ai",
  },
  {
    title: "Character & Scene Continuity",
    category: "Video Generation",
    description:
      "Maintain character, environment and visual continuity across generated video scenes.",
    href: "/prompts/character-scene-continuity/",
    keywords:
      "character scene continuity consistent video identity ai",
  },

  // =========================================================
  // OPERATIONS & LOGISTICS
  // =========================================================

  {
    title: "SOP Creation",
    category: "Operations & Logistics",
    description:
      "Create a structured standard operating procedure from a process, task or workflow.",
    href: "/prompts/sop-creation/",
    keywords:
      "sop standard operating procedure process instructions warehouse operations",
  },
  {
    title: "Inventory Discrepancy Investigation",
    category: "Operations & Logistics",
    description:
      "Investigate physical-versus-system stock differences before making inventory adjustments.",
    href: "/prompts/inventory-discrepancy-investigation/",
    keywords:
      "inventory stock discrepancy variance physical system warehouse investigation",
  },
  {
    title: "Warehouse Process Improvement",
    category: "Operations & Logistics",
    description:
      "Review warehouse workflows to identify waste, delays, risks and improvement opportunities.",
    href: "/prompts/warehouse-process-improvement/",
    keywords:
      "warehouse process improvement logistics productivity workflow efficiency",
  },
  {
    title: "Inventory Report Analysis",
    category: "Operations & Logistics",
    description:
      "Analyze inventory reports for exceptions, patterns, risks and operational actions.",
    href: "/prompts/inventory-report-analysis/",
    keywords:
      "inventory report stock analysis ageing variance warehouse",
  },
  {
    title: "Receiving Discrepancy Investigation",
    category: "Operations & Logistics",
    description:
      "Investigate quantity, item, condition and documentation discrepancies during receiving.",
    href: "/prompts/receiving-discrepancy-investigation/",
    keywords:
      "receiving discrepancy inbound shortage excess damaged warehouse grn",
  },
  {
    title: "Stock Count Planning",
    category: "Operations & Logistics",
    description:
      "Plan an accurate physical stock count with preparation, controls and reconciliation steps.",
    href: "/prompts/stock-count-planning/",
    keywords:
      "stock count inventory physical cycle count warehouse reconciliation",
  },
  {
    title: "Warehouse KPI Analysis",
    category: "Operations & Logistics",
    description:
      "Review warehouse KPIs and connect performance changes to likely operational causes.",
    href: "/prompts/warehouse-kpi-analysis/",
    keywords:
      "warehouse kpi productivity accuracy receiving picking inventory logistics",
  },
  {
    title: "Warehouse Safety Review",
    category: "Operations & Logistics",
    description:
      "Review warehouse activities for practical hazards, controls and follow-up actions.",
    href: "/prompts/warehouse-safety-review/",
    keywords:
      "warehouse safety hazard risk forklift racking operations",
  },
  {
    title: "Corrective Action Plan",
    category: "Operations & Logistics",
    description:
      "Turn an operational issue into clear corrective actions, responsibilities and follow-up checks.",
    href: "/prompts/corrective-action-plan/",
    keywords:
      "corrective action capa root cause issue operations warehouse",
  },
  {
    title: "Root Cause Analysis",
    category: "Operations & Logistics",
    description:
      "Investigate operational problems systematically before selecting corrective action.",
    href: "/prompts/root-cause-analysis/",
    keywords:
      "root cause rca warehouse operations problem investigation 5 why",
  },
];