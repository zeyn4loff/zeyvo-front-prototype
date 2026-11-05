# React frontend working rules

- Build user-facing screens mobile first. Start with a usable 320 px layout, then add `sm`, `md`, and larger breakpoint styles.
- Keep all page routes and dialogs usable at 320, 375, and 390 px. Do not allow page-wide horizontal overflow; deliberate horizontal rails may scroll inside their own container.
- Keep primary actions reachable on short mobile viewports. Dialogs with long content need an internal scroll area, and fixed bottom navigation must not cover content.
- After layout changes, check affected screens at mobile widths and run `npm run build` and `npm run lint`.
- Build the business area one complete module at a time, using `../prototip` as the behavior and visual reference.
- Keep business pages component based: separate reusable UI, domain state, and browser storage. Present the React prototype as a cohesive product without demo labels. Describe external delivery accurately wherever it matters, since browser actions do not yet reach a server.
