export type RelatedTool = { name: string; href: string; note: string };
export type ToolGuide = {
  pathname: string;
  purpose: string;
  useCases: string[];
  example: { title: string; input: string; output: string; explanation: string };
  mistakes: string[];
  privacy: string;
  faqs: { question: string; answer: string }[];
  related: RelatedTool[];
};

export const toolGuides: Record<string, ToolGuide> = {
  '/tools/uuid-generator/': {
    pathname: '/tools/uuid-generator/',
    purpose: 'Use this UUID generator when you need random version 4 identifiers for application records, API examples, test data or distributed systems. UUID v4 values are generated from random bytes, so separate systems can create identifiers without coordinating a shared numeric counter.',
    useCases: [
      'Create primary keys or public identifiers for prototypes and test fixtures.',
      'Generate several IDs at once for API payloads, seed data or spreadsheet imports.',
      'Produce hyphenated or compact UUID values while preserving UUID v4 randomness.',
      'Create sample identifiers for documentation without exposing production data.'
    ],
    example: { title: 'Example: create test IDs for an API', input: 'Generate 3 UUIDs with hyphens', output: '550e8400-e29b-41d4-a716-446655440000\n6ba7b810-9dad-4d80-80b4-00c04fd430c8\n9b2f4ac1-2b75-4a8e-9bd3-2e4c1f1029b4', explanation: 'Each value follows the familiar UUID layout. The exact values will be different every time because version 4 UUIDs are random.' },
    mistakes: [
      'Do not treat random UUIDs as secret tokens; uniqueness and secrecy are different properties.',
      'Do not remove hyphens if another system expects the standard 36-character display format.',
      'Check whether a database already has a native UUID type before storing identifiers as plain text.'
    ],
    privacy: 'UUIDs are generated in your browser. KRIYANO does not receive or store the generated values.',
    faqs: [
      { question: 'Are UUID v4 values guaranteed to be unique?', answer: 'No random identifier can provide a mathematical guarantee, but the 122 random bits available in UUID v4 make accidental collisions extremely unlikely for normal application use.' },
      { question: 'Is a UUID the same as a GUID?', answer: 'GUID is Microsoft terminology for identifiers that generally use the UUID format. In everyday development, the terms are often used interchangeably.' },
      { question: 'Can I use these UUIDs as passwords or API keys?', answer: 'They are identifiers, not password-strength secrets. Use a purpose-built secure token generator when secrecy and unpredictable authentication credentials are required.' }
    ],
    related: [
      { name: 'SHA-256 Generator', href: '/tools/sha-256-generator/', note: 'Create a deterministic hash from text.' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/', note: 'Inspect JSON Web Token headers and payloads.' },
      { name: 'Base64 Encoder & Decoder', href: '/tools/base64-encoder/', note: 'Encode and decode Base64 text locally.' }
    ]
  },
  '/tools/timestamp-converter/': {
    pathname: '/tools/timestamp-converter/',
    purpose: 'Convert Unix or epoch timestamps into readable dates, or turn a date and time back into Unix seconds and milliseconds. This is useful when APIs, logs, databases and JavaScript code use different time representations.',
    useCases: [
      'Read an epoch value from an API response or application log.',
      'Convert a date into seconds for an API request, scheduled job or database field.',
      'Compare second-based Unix timestamps with JavaScript millisecond timestamps.',
      'Check UTC, local time and ISO 8601 representations of the same instant.'
    ],
    example: { title: 'Example: seconds versus milliseconds', input: '1704067200', output: '2024-01-01T00:00:00.000Z', explanation: 'A 10-digit value is commonly Unix seconds. JavaScript timestamps are normally milliseconds, so the equivalent JavaScript value is 1704067200000.' },
    mistakes: [
      'Do not confuse seconds with milliseconds; the wrong unit can shift a date by decades.',
      'Remember that Unix timestamps represent an instant in UTC even when you display them in local time.',
      'When copying dates between systems, confirm whether the source includes a timezone or assumes one.'
    ],
    privacy: 'All timestamp calculations happen in the browser. Dates and times entered here are not uploaded to KRIYANO.',
    faqs: [
      { question: 'What is the Unix epoch?', answer: 'It is the reference point 1970-01-01 00:00:00 UTC. Unix timestamps count elapsed seconds from that point, with negative values representing earlier dates.' },
      { question: 'Why do some timestamps have 10 digits and others 13?', answer: 'Modern Unix timestamps in seconds are often 10 digits, while millisecond timestamps are usually 13 digits. The exact length changes over time.' },
      { question: 'Does a Unix timestamp contain a timezone?', answer: 'No. It identifies an instant. A timezone is applied only when that instant is formatted for display.' }
    ],
    related: [
      { name: 'Cron Expression Generator', href: '/tools/cron-expression-generator/', note: 'Build recurring schedules and preview runs.' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/', note: 'Read exp, iat and other JWT time claims.' },
      { name: 'URL Parser', href: '/tools/url-parser/', note: 'Inspect the parts of a URL.' }
    ]
  },
  '/tools/jwt-decoder/': {
    pathname: '/tools/jwt-decoder/',
    purpose: 'Decode the readable header and payload portions of a JSON Web Token without sending the token to a server. This helps developers inspect claims, expiration times and token structure while debugging authentication flows.',
    useCases: [
      'Inspect the alg and typ fields in a JWT header.',
      'Read application claims in the payload during authentication debugging.',
      'Convert exp, nbf or iat timestamp claims into understandable dates.',
      'Check whether a copied value has the three dot-separated parts expected of a JWT.'
    ],
    example: { title: 'Example: inspect an expiration claim', input: 'Payload contains { "sub": "123", "exp": 1893456000 }', output: 'sub: 123\nexp: 1893456000', explanation: 'Decoding reveals the claim values. It does not prove that the token signature is valid or that the issuer should be trusted.' },
    mistakes: [
      'Decoding a JWT is not the same as verifying its cryptographic signature.',
      'Avoid pasting production tokens into third-party tools that transmit data to a server.',
      'Do not assume every JWT uses the same claims; applications can add their own fields.'
    ],
    privacy: 'The decoder runs locally in your browser. KRIYANO does not receive the token you paste into this page.',
    faqs: [
      { question: 'Can this tool verify a JWT signature?', answer: 'No. It decodes the header and payload for inspection. Signature verification requires the correct key and verification rules for the issuer.' },
      { question: 'Why can JWT payloads be decoded without a secret?', answer: 'JWT header and payload segments are Base64URL encoded, not encrypted. The signature protects integrity; it does not hide the payload.' },
      { question: 'Should sensitive information be stored inside a JWT?', answer: 'Treat ordinary signed JWT payloads as readable by anyone who obtains the token. Sensitive data should not be placed there unless an appropriate encrypted token format is used.' }
    ],
    related: [
      { name: 'Base64 Encoder & Decoder', href: '/tools/base64-encoder/', note: 'Work with Base64 and Base64URL text.' },
      { name: 'Unix Timestamp Converter', href: '/tools/timestamp-converter/', note: 'Convert JWT time claims to readable dates.' },
      { name: 'SHA-256 Generator', href: '/tools/sha-256-generator/', note: 'Generate SHA-256 hashes locally.' }
    ]
  },
  '/tools/url-encoder/': {
    pathname: '/tools/url-encoder/',
    purpose: 'Percent-encode text so it can safely appear inside URL components, or decode percent-encoded values back into readable text. This is especially useful for query parameters, redirect URLs, search terms and API requests.',
    useCases: [
      'Encode spaces, ampersands and non-ASCII characters inside a query parameter.',
      'Decode a copied tracking URL to understand the original parameter text.',
      'Prepare values for links generated by JavaScript or API clients.',
      'Compare full URL encoding with component-level encoding when debugging requests.'
    ],
    example: { title: 'Example: encode a search query', input: 'coffee & tea', output: 'coffee%20%26%20tea', explanation: 'The ampersand must be encoded when it is part of a value; otherwise it could be interpreted as a separator between query parameters.' },
    mistakes: [
      'Do not encode an entire URL with a component encoder if you need to preserve separators such as : / ? and &.',
      'Avoid double-encoding values that already contain percent escapes such as %20.',
      'Remember that plus signs may represent spaces in form-style query strings but not in every URL context.'
    ],
    privacy: 'Encoding and decoding use browser-native functions. The text you enter is processed locally and is not sent to KRIYANO.',
    faqs: [
      { question: 'What is percent encoding?', answer: 'It represents characters with a percent sign followed by hexadecimal bytes, allowing reserved or non-ASCII characters to be carried safely in URL components.' },
      { question: 'Should spaces become %20 or +?', answer: 'General URL component encoding commonly uses %20. The plus sign is a convention used by application/x-www-form-urlencoded data and many query-string implementations.' },
      { question: 'Why does decoding sometimes fail?', answer: 'Malformed percent sequences, such as a lone % or incomplete hexadecimal escape, are not valid encoded input and can cause a decoder to reject the value.' }
    ],
    related: [
      { name: 'URL Parser', href: '/tools/url-parser/', note: 'Break a URL into its individual components.' },
      { name: 'Query String Parser', href: '/tools/query-string-parser/', note: 'Inspect query parameters and repeated keys.' },
      { name: 'Base64 Encoder & Decoder', href: '/tools/base64-encoder/', note: 'Encode binary-safe text representations.' }
    ]
  },
  '/tools/yaml-validator/': {
    pathname: '/tools/yaml-validator/',
    purpose: 'Check YAML for common syntax and indentation problems before using it in configuration files, CI pipelines or application manifests. The validator also previews parsed data so you can confirm that values are structured the way you intended.',
    useCases: [
      'Check configuration copied into a CI/CD pipeline or deployment manifest.',
      'Find indentation errors after manually editing nested YAML.',
      'Confirm whether lists and mappings parse into the expected structure.',
      'Review a YAML snippet before converting it to JSON.'
    ],
    example: { title: 'Example: indentation matters', input: 'service:\n  name: api\n  ports:\n    - 8080', output: 'Valid YAML with one service mapping and a ports list.', explanation: 'YAML uses indentation to express nesting. Moving the list marker to the wrong indentation level can change the structure or make the document invalid.' },
    mistakes: [
      'Do not use tabs for indentation in YAML; spaces are the safer standard choice.',
      'Quote values that could be misread as booleans, numbers, dates or special syntax when exact text matters.',
      'Be careful when copying examples that rely on advanced YAML features not supported by every parser.'
    ],
    privacy: 'Validation happens locally in the browser. Configuration text is not uploaded to KRIYANO.',
    faqs: [
      { question: 'Why is YAML indentation so important?', answer: 'Indentation defines parent-child relationships. A different number of leading spaces can move a value into another mapping or list.' },
      { question: 'Is valid YAML always valid for my application?', answer: 'No. Syntax validation only confirms that the document can be parsed. Your application may require a particular schema, field name or value type.' },
      { question: 'Can YAML contain multiple documents?', answer: 'Yes, YAML supports multiple documents separated by markers such as ---. This lightweight validator focuses on common configuration-style structures, so application-specific behavior should still be checked with the target system.' }
    ],
    related: [
      { name: 'JSON ↔ YAML Converter', href: '/tools/json-yaml-converter/', note: 'Convert structured data between JSON and YAML.' },
      { name: 'JSON Minifier', href: '/tools/json-minifier/', note: 'Validate and compact JSON.' },
      { name: 'XML Formatter', href: '/tools/xml-formatter/', note: 'Validate and pretty-print XML.' }
    ]
  },
  '/tools/json-yaml-converter/': {
    pathname: '/tools/json-yaml-converter/',
    purpose: 'Convert common structured data between JSON and YAML when moving configuration, API examples or deployment settings between tools that prefer different formats.',
    useCases: [
      'Turn an API JSON example into human-readable YAML for documentation.',
      'Convert YAML configuration into JSON for systems that only accept JSON.',
      'Compare how arrays, nested objects, strings and numbers map between formats.',
      'Cleanly reformat structured data before sharing it with another developer.'
    ],
    example: { title: 'Example: JSON object to YAML', input: '{"service":{"name":"api","port":8080}}', output: 'service:\n  name: api\n  port: 8080', explanation: 'The JSON object becomes an indented YAML mapping while preserving the same logical data structure.' },
    mistakes: [
      'Comments in YAML generally cannot be preserved when converting through a parsed data model.',
      'Some advanced YAML features have no direct JSON equivalent.',
      'Check strings that resemble dates, booleans or numbers when exact type preservation is important.'
    ],
    privacy: 'Conversion runs locally in the browser. KRIYANO does not receive the JSON or YAML you paste into the tool.',
    faqs: [
      { question: 'Will JSON and YAML always convert perfectly both ways?', answer: 'For common arrays, objects, strings, numbers, booleans and null values, conversion is straightforward. YAML-specific features such as comments, anchors and custom tags may not survive a round trip.' },
      { question: 'Why are JSON keys quoted but YAML keys often are not?', answer: 'JSON requires quoted string keys. YAML allows many plain scalar keys without quotes when they are unambiguous.' },
      { question: 'Which format should I use?', answer: 'JSON is common for APIs and machine interchange. YAML is often chosen for hand-edited configuration because it can be more readable. The target application ultimately determines the required format.' }
    ],
    related: [
      { name: 'YAML Validator', href: '/tools/yaml-validator/', note: 'Check YAML syntax and indentation.' },
      { name: 'JSON Minifier', href: '/tools/json-minifier/', note: 'Compact validated JSON.' },
      { name: 'XML Formatter', href: '/tools/xml-formatter/', note: 'Work with another common structured-data format.' }
    ]
  },
  '/tools/base64-encoder/': {
    pathname: '/tools/base64-encoder/',
    purpose: 'Encode UTF-8 text as Base64 or decode Base64 and Base64URL values back into readable text. Base64 is commonly used when binary-safe text must travel through JSON, URLs, data fields or protocols that expect printable characters.',
    useCases: [
      'Inspect Base64 values found in API responses and configuration.',
      'Encode small UTF-8 text snippets for test data or examples.',
      'Work with Base64URL values that replace URL-sensitive characters.',
      'Check whether an encoded value decodes to the text you expect.'
    ],
    example: { title: 'Example: encode UTF-8 text', input: 'Hello, Kriyano!', output: 'SGVsbG8sIEtyaXlhbm8h', explanation: 'Base64 represents the underlying bytes with a restricted character set. It is reversible encoding, not encryption.' },
    mistakes: [
      'Do not use Base64 as a security mechanism; anyone can decode it.',
      'Base64 and Base64URL use slightly different alphabets and padding rules.',
      'Binary files need byte-aware handling; a text box is intended for textual data rather than large file conversion.'
    ],
    privacy: 'Encoding and decoding are performed locally in your browser. KRIYANO does not receive the text you process.',
    faqs: [
      { question: 'Is Base64 encryption?', answer: 'No. Base64 is an encoding scheme designed to represent bytes as text. It provides no confidentiality.' },
      { question: 'Why does Base64 output look longer than the original?', answer: 'Base64 represents every three input bytes with four encoded characters, plus possible padding, so the encoded representation is normally larger.' },
      { question: 'What is Base64URL?', answer: 'It is a URL-safe variation that typically replaces + and / with - and _, and may omit = padding. JWT segments commonly use Base64URL.' }
    ],
    related: [
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/', note: 'Decode JWT segments that use Base64URL.' },
      { name: 'URL Encoder & Decoder', href: '/tools/url-encoder/', note: 'Percent-encode text for URL components.' },
      { name: 'SHA-256 Generator', href: '/tools/sha-256-generator/', note: 'Create one-way SHA-256 hashes.' }
    ]
  },
  '/tools/cron-expression-generator/': {
    pathname: '/tools/cron-expression-generator/',
    purpose: 'Build standard five-field cron expressions for recurring jobs and preview upcoming run times before copying the schedule into a crontab or compatible service.',
    useCases: [
      'Schedule a script every hour, every day or on selected weekdays.',
      'Translate a desired recurring time into cron field syntax.',
      'Review the next few runs to catch a schedule mistake before deployment.',
      'Create examples for infrastructure documentation and runbooks.'
    ],
    example: { title: 'Example: weekdays at 09:00', input: 'Minute 0 · Hour 9 · Day * · Month * · Weekday 1-5', output: '0 9 * * 1-5', explanation: 'This standard five-field expression means minute 0 of hour 9 on Monday through Friday, subject to the timezone used by the cron runner.' },
    mistakes: [
      'Cron implementations can differ, especially for seconds, year fields and special characters.',
      'The schedule timezone is controlled by the system or service running cron, not by the expression itself in many environments.',
      'Day-of-month and day-of-week behavior can vary between implementations, so test complex combinations with your target platform.'
    ],
    privacy: 'The expression builder and schedule preview run locally. No schedule configuration is sent to KRIYANO.',
    faqs: [
      { question: 'What do the five cron fields mean?', answer: 'In standard order they are minute, hour, day of month, month and day of week.' },
      { question: 'Does cron use my local timezone?', answer: 'It depends on the machine or hosted service executing the schedule. Check that environment rather than assuming the browser timezone.' },
      { question: 'Why does another cron service show different syntax?', answer: 'Some products add a seconds field, year field or product-specific syntax. Confirm the format required by your target platform before deployment.' }
    ],
    related: [
      { name: 'Unix Timestamp Converter', href: '/tools/timestamp-converter/', note: 'Convert scheduled instants between timestamps and dates.' },
      { name: 'YAML Validator', href: '/tools/yaml-validator/', note: 'Validate configuration files that may contain schedules.' },
      { name: 'URL Parser', href: '/tools/url-parser/', note: 'Inspect endpoints used by scheduled jobs.' }
    ]
  },
  '/tools/sql-formatter/': {
    pathname: '/tools/sql-formatter/',
    purpose: 'Reformat common SQL statements into a more readable layout so joins, clauses and nested expressions are easier to review. Formatting changes presentation, not the intended database operation.',
    useCases: [
      'Make a long one-line query easier to review during debugging.',
      'Clean up SQL copied from logs, monitoring tools or generated code.',
      'Prepare readable query examples for documentation and code review.',
      'Spot clause boundaries before investigating query logic or performance.'
    ],
    example: { title: 'Example: format a compact SELECT', input: 'SELECT id,name FROM users WHERE active=1 ORDER BY name;', output: 'SELECT id, name\nFROM users\nWHERE active = 1\nORDER BY name;', explanation: 'Formatting adds line breaks and spacing so the query structure is easier to scan. Always execute important queries in a safe database environment to verify behavior.' },
    mistakes: [
      'Formatting does not validate that table names, columns or SQL semantics are correct.',
      'Different SQL dialects have syntax that a lightweight formatter may not fully understand.',
      'Never execute untrusted SQL simply because it has been formatted successfully.'
    ],
    privacy: 'SQL is formatted in your browser and is not uploaded to KRIYANO. Avoid sharing production secrets in any third-party tool as a general security practice.',
    faqs: [
      { question: 'Does formatting change the query result?', answer: 'Whitespace and layout changes should not change ordinary SQL semantics, but always review generated output when dialect-specific syntax or quoted literals are involved.' },
      { question: 'Does this optimize SQL performance?', answer: 'No. Formatting improves readability. Query optimization requires examining execution plans, indexes, data distribution and database-specific behavior.' },
      { question: 'Which SQL dialects are supported?', answer: 'The formatter is intended for common SQL syntax and everyday SELECT, INSERT, UPDATE and DELETE readability. Database-specific extensions may need manual review.' }
    ],
    related: [
      { name: 'JSON Minifier', href: '/tools/json-minifier/', note: 'Compact JSON used in APIs or database fields.' },
      { name: 'YAML Validator', href: '/tools/yaml-validator/', note: 'Check configuration used by database services.' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/', note: 'Generate identifiers for test records.' }
    ]
  },
  '/tools/xml-formatter/': {
    pathname: '/tools/xml-formatter/',
    purpose: 'Validate XML syntax and pretty-print nested elements with readable indentation. This is useful for configuration files, SOAP payloads, feeds and legacy integrations where compact XML is difficult to inspect.',
    useCases: [
      'Pretty-print minified XML returned by an API or integration.',
      'Catch mismatched tags and malformed document structure.',
      'Review nested attributes and elements during debugging.',
      'Prepare an XML example for documentation or support tickets.'
    ],
    example: { title: 'Example: format a compact document', input: '<user><id>7</id><name>Ana</name></user>', output: '<user>\n  <id>7</id>\n  <name>Ana</name>\n</user>', explanation: 'Indentation makes the tree structure visible without changing the logical element hierarchy.' },
    mistakes: [
      'Well-formed XML is not necessarily valid against an XML Schema or DTD.',
      'Whitespace can be meaningful inside mixed-content XML, so review sensitive document types before replacing production files.',
      'Namespaces affect element meaning even when local tag names look identical.'
    ],
    privacy: 'XML parsing and formatting happen locally in the browser. The document is not sent to KRIYANO.',
    faqs: [
      { question: 'What is the difference between well-formed and valid XML?', answer: 'Well-formed XML follows the basic XML syntax rules. Valid XML additionally conforms to a declared schema or DTD.' },
      { question: 'Can this tool fix broken XML automatically?', answer: 'It can report parsing problems, but automatically guessing the intended structure of malformed XML can be unsafe. Fix the source based on the reported issue.' },
      { question: 'Does formatting remove XML attributes or namespaces?', answer: 'A formatter should preserve document data while changing whitespace. Review output if your XML relies on unusual whitespace-sensitive content.' }
    ],
    related: [
      { name: 'JSON ↔ YAML Converter', href: '/tools/json-yaml-converter/', note: 'Transform common structured data formats.' },
      { name: 'YAML Validator', href: '/tools/yaml-validator/', note: 'Validate YAML configuration.' },
      { name: 'JSON Minifier', href: '/tools/json-minifier/', note: 'Compact JSON after validation.' }
    ]
  },
  '/tools/url-parser/': {
    pathname: '/tools/url-parser/',
    purpose: 'Break a full URL into protocol, hostname, port, path, query string, fragment and origin. Seeing the components separately makes it easier to debug routing, redirects, API requests and tracking links.',
    useCases: [
      'Check whether a copied URL uses HTTP or HTTPS and which host it targets.',
      'Separate the path from query parameters while debugging an endpoint.',
      'Inspect explicit ports and fragments in development URLs.',
      'Understand the origin used by browser security rules.'
    ],
    example: { title: 'Example: parse a URL', input: 'https://api.example.com:8443/v1/users?page=2#results', output: 'Protocol: https:\nHost: api.example.com\nPort: 8443\nPath: /v1/users\nQuery: ?page=2\nFragment: #results', explanation: 'Parsing separates syntax that otherwise appears in one string, making routing and request details easier to inspect.' },
    mistakes: [
      'A hostname is not the same as an origin; origin also includes scheme and, when relevant, port.',
      'Fragments are handled by the browser and are normally not sent to the server in HTTP requests.',
      'Relative URLs need a base URL before they can be resolved into all components.'
    ],
    privacy: 'The browser parses the URL locally. KRIYANO does not request or visit the URL you enter.',
    faqs: [
      { question: 'Does this tool open or fetch the URL?', answer: 'No. It only parses the string in your browser, so the destination is not contacted by the tool.' },
      { question: 'What is a URL origin?', answer: 'An origin is the combination of scheme, hostname and port. Browsers use origins for many security boundaries such as same-origin checks.' },
      { question: 'What is the difference between query and fragment?', answer: 'The query follows ? and is normally sent in the HTTP request. The fragment follows # and is generally interpreted client-side by the browser.' }
    ],
    related: [
      { name: 'Query String Parser', href: '/tools/query-string-parser/', note: 'Break the query portion into key-value pairs.' },
      { name: 'URL Encoder & Decoder', href: '/tools/url-encoder/', note: 'Encode reserved characters safely.' },
      { name: 'Cron Expression Generator', href: '/tools/cron-expression-generator/', note: 'Build schedules for jobs that call web endpoints.' }
    ]
  },
  '/tools/query-string-parser/': {
    pathname: '/tools/query-string-parser/',
    purpose: 'Parse the query portion of a URL into readable key-value rows while preserving repeated parameters. This helps with campaign links, API requests, filters and browser routing.',
    useCases: [
      'Inspect UTM campaign parameters in a marketing URL.',
      'Debug repeated parameters such as tag=dev&tag=web.',
      'Separate a long query string into values you can review individually.',
      'Copy parsed parameters as structured JSON for troubleshooting.'
    ],
    example: { title: 'Example: repeated query keys', input: '?tag=dev&tag=web&page=2', output: 'tag = dev\ntag = web\npage = 2', explanation: 'Repeated keys are preserved because many frameworks intentionally allow a parameter to appear more than once.' },
    mistakes: [
      'Do not assume every repeated parameter should be collapsed into a single value.',
      'Encoded characters should be decoded according to URL/query-string rules before interpreting the text.',
      'A fragment after # is not part of the query string even if it contains question marks or ampersands.'
    ],
    privacy: 'Parsing happens locally. KRIYANO does not visit the URL or store the parameters you paste.',
    faqs: [
      { question: 'Can I paste a full URL instead of only the query string?', answer: 'Yes. The tool can extract the query portion from a full URL and then display the parameters.' },
      { question: 'Why are repeated keys kept?', answer: 'Repeated query keys are valid and are commonly used for filters, tags and multi-select inputs. Preserving them avoids silently changing the request meaning.' },
      { question: 'Are UTM parameters special?', answer: 'They are ordinary query parameters with conventional names such as utm_source and utm_campaign. The parser treats them like any other key-value pair.' }
    ],
    related: [
      { name: 'URL Parser', href: '/tools/url-parser/', note: 'Inspect the full structure of a URL.' },
      { name: 'URL Encoder & Decoder', href: '/tools/url-encoder/', note: 'Encode or decode parameter text.' },
      { name: 'Spreadsheet List Cleaner', href: '/tools/list-cleaner/', note: 'Clean lists extracted from structured text.' }
    ]
  },
  '/tools/sha-256-generator/': {
    pathname: '/tools/sha-256-generator/',
    purpose: 'Generate the SHA-256 digest of a text value using the browser Web Crypto API. SHA-256 produces the same 256-bit hash for the same byte sequence and is useful for checks, reproducible identifiers and integrity workflows.',
    useCases: [
      'Create a SHA-256 digest for a test value or documentation example.',
      'Compare whether two exact text inputs produce the same hash.',
      'Generate a deterministic fingerprint for non-secret data.',
      'Learn how even a small input change produces a completely different digest.'
    ],
    example: { title: 'Example: hash a short string', input: 'hello', output: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', explanation: 'The 64 hexadecimal characters represent 32 bytes, or 256 bits. Changing letter case or adding a space produces a different digest.' },
    mistakes: [
      'Hashing is one-way; it is not encryption and there is no decryption key.',
      'Plain SHA-256 is not a suitable password-storage scheme because fast hashes are vulnerable to guessing attacks.',
      'Text encoding matters. The same visible characters must be converted to the same bytes to reproduce a hash.'
    ],
    privacy: 'The hash is calculated locally with Web Crypto. The source text and resulting digest are not sent to KRIYANO.',
    faqs: [
      { question: 'Can a SHA-256 hash be reversed?', answer: 'There is no general reverse operation. Attackers can still guess likely inputs and compare their hashes, which is why passwords need slow, salted password-hashing algorithms.' },
      { question: 'Why is a SHA-256 hash always 64 hex characters?', answer: 'SHA-256 outputs 256 bits. Each hexadecimal character represents four bits, so 256 bits are displayed as 64 hex characters.' },
      { question: 'Is SHA-256 still considered secure?', answer: 'SHA-256 remains widely used for integrity and cryptographic applications. Security depends on using it appropriately; password storage, for example, requires specialized password-hashing functions.' }
    ],
    related: [
      { name: 'UUID Generator', href: '/tools/uuid-generator/', note: 'Generate random identifiers instead of deterministic hashes.' },
      { name: 'Base64 Encoder & Decoder', href: '/tools/base64-encoder/', note: 'Use reversible text encoding rather than hashing.' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/', note: 'Inspect token data used in authentication systems.' }
    ]
  },
  '/tools/json-minifier/': {
    pathname: '/tools/json-minifier/',
    purpose: 'Validate JSON and remove unnecessary whitespace to produce a compact representation without changing the parsed data. Minification is useful for payloads, configuration values and logs where readability is less important than size or single-line output.',
    useCases: [
      'Compact formatted JSON before placing it into an environment variable or request body.',
      'Validate that JSON parses successfully before copying it into another application.',
      'Compare the size of pretty-printed and compact JSON.',
      'Turn a multi-line example into a single-line value for testing.'
    ],
    example: { title: 'Example: compact an object', input: '{\n  "name": "kriyano",\n  "active": true\n}', output: '{"name":"kriyano","active":true}', explanation: 'Whitespace outside strings is removed. Keys, values and the parsed data remain the same.' },
    mistakes: [
      'Minifying invalid JSON cannot fix structural mistakes such as trailing commas or unquoted keys.',
      'Whitespace inside JSON string values is data and must not be removed.',
      'Minification is not compression or encryption; it only reduces formatting whitespace.'
    ],
    privacy: 'JSON is parsed and serialized locally in your browser. KRIYANO does not receive the data you paste.',
    faqs: [
      { question: 'Does JSON minification change the data?', answer: 'A correct minifier parses the JSON and serializes the same values without optional formatting whitespace. The logical data should remain unchanged.' },
      { question: 'Will minifying JSON make an API much faster?', answer: 'It can reduce payload size slightly, but transport compression such as gzip or Brotli often provides a much larger network benefit.' },
      { question: 'Why does the tool reject my JavaScript object?', answer: 'JSON is stricter than JavaScript object syntax. Property names and strings require double quotes, and comments, undefined values and trailing commas are not part of standard JSON.' }
    ],
    related: [
      { name: 'JSON ↔ YAML Converter', href: '/tools/json-yaml-converter/', note: 'Convert JSON to and from YAML.' },
      { name: 'YAML Validator', href: '/tools/yaml-validator/', note: 'Validate YAML configuration.' },
      { name: 'XML Formatter', href: '/tools/xml-formatter/', note: 'Format another structured-data format.' }
    ]
  },
  '/tools/list-cleaner/': {
    pathname: '/tools/list-cleaner/',
    purpose: 'Clean pasted single-column text without converting identifiers into numbers. Remove blank rows and duplicates, sort values, or compare two lists while preserving codes, leading zeros and Unicode text.',
    useCases: [
      'Remove duplicate values from a copied spreadsheet column.',
      'Compare two lists and find values present in only one side.',
      'Sort a text list while preserving each line as a complete value.',
      'Clean IDs, email addresses, SKUs or labels before importing them elsewhere.'
    ],
    example: { title: 'Example: remove duplicates while preserving codes', input: '00125\n00126\n00125\nAB-20', output: '00125\n00126\nAB-20', explanation: 'Entries are handled as text, so a leading zero in 00125 is preserved instead of being converted to the number 125.' },
    mistakes: [
      'This tool treats each line as one value; it is not a full multi-column CSV parser.',
      'Case-insensitive comparison can merge values that are distinct in case-sensitive systems.',
      'A difference between two lists shows a text mismatch, not the business reason for that mismatch.'
    ],
    privacy: 'List processing happens in the browser. Pasted values are not uploaded to KRIYANO.',
    faqs: [
      { question: 'Will the cleaner preserve leading zeros?', answer: 'Yes. Values are treated as text, so identifiers such as 00125 stay exactly that way unless you edit them.' },
      { question: 'Can I compare two lists with duplicate values?', answer: 'Yes. Comparison modes use unique entries for set-style results, while the tool also reports duplicates found in the source input.' },
      { question: 'Can I paste CSV data?', answer: 'A single CSV column can often be pasted as lines, but this is not a multi-column CSV parser. Commas inside a line are treated as part of that value.' }
    ],
    related: [
      { name: 'Query String Parser', href: '/tools/query-string-parser/', note: 'Extract key-value parameters from URLs.' },
      { name: 'JSON Minifier', href: '/tools/json-minifier/', note: 'Validate and compact structured JSON.' },
      { name: 'URL Parser', href: '/tools/url-parser/', note: 'Break URLs into readable components.' }
    ]
  }
};

export function getToolGuide(pathname: string): ToolGuide | undefined {
  return toolGuides[pathname];
}
