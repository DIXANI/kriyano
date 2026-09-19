# Preview your updated KRIYANO website

The ZIP contains a full source folder named `kriyano`. Your live website has not changed.

## 1. Keep a backup

Keep your current website folder. Extract this ZIP into a separate folder first, such as:

`Documents\KRIYANO-Preview\kriyano`

Do not copy the old `node_modules`, `dist`, `.astro` or `.wrangler` folders into the new folder.

## 2. Open a terminal in the new folder

Open the extracted `kriyano` folder, click File Explorer's address bar, type `cmd` and press Enter. This opens Command Prompt in the correct folder and avoids PowerShell's npm.ps1 execution-policy issue.

## 3. Install and validate

Run these commands one at a time:

```bat
node --version
npm ci
npm run validate
npm run preview
```

Use Node 22.12+ supported by Astro; Node 24 LTS is recommended. If Node is older, update Node before installing. Experimental VM/type-stripping warnings during tests are expected; the tests should pass.

Open the local address printed by the last command. It is usually `http://localhost:4321`.
If the port is occupied, use `npm run preview -- --port 4322`.

## 4. Review the changes

- Homepage: working task shortcuts and five available tools.
- Tools: search for “Excel”, filter Business, and reset a search with no results.
- List Cleaner: load the example, clean the list, compare with List B, copy and download.
- Margin Calculator: use the example. Cost 75, margin 25% and discount 10% should give price 100, discounted price 90 and gross profit 15.
- Quotation Builder: load the example. The total should be 285 with a 5% discount and no tax. Try Print / Save as PDF with A4 paper and browser headers/footers off. Check a longer quotation as well.
- CHECK: load the example and run it with online review off. It should identify that the stated stock difference is 10, not 20, without sending a request.
- Resize the browser to a narrow mobile width. Check navigation, inputs and output readability.

Online AI review uses the existing Cloudflare Worker. It does not work in the static local preview; the local checks still do. The new Worker request handling has automated tests with mocked AI responses, but needs a live integration test after staging.

## 5. Move into your existing project after review

Use a new branch in your existing repository. Copy the updated source and configuration files from this folder into that existing project, including `src`, `public`, `scripts`, `tests`, `package.json`, `package-lock.json`, `astro.config.mjs`, `wrangler.jsonc` and `tsconfig.json`.

Keep the existing repository's `.git` folder and your own secrets/local configuration. This ZIP does not include them. Re-run `npm ci` and `npm run validate` after copying.

Do not push to a production-connected branch until you intend to publish; a push can trigger your existing automatic deployment.
