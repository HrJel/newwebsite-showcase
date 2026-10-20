# QA and acceptance checklist — NewWebsite

## Application-specific validation

- [ ] Check nav links, semantic headings, keyboard navigation and responsive typography.
- [ ] Validate representative static routes and 404 behavior.
- [ ] In a separately authorized test environment only, verify portal challenge and session isolation.

## Generic public-release validation

- [ ] README disclaimer includes independent Jelvan R. presentation, NDA/confidentiality limitations and no company endorsement.
- [ ] Status explicitly identifies what is source-documented, tested, unverified or proposed.
- [ ] No real environment values or operational endpoints in Markdown or JSON.
- [ ] GitHub secret scanning / code scanning enabled when available.
- [ ] Device selector does not infer native client availability from a mobile viewport.
- [ ] Public screenshots and media have consent and contain synthetic data.
- [ ] Accessibility checks for focus, color contrast and text resizing.
- [ ] Portfolio integration uses safe fallback if iframe refuses embedding.
- [ ] Browser response CSP and Fetch Metadata behavior tested if using Cloudflare frames.

## Acceptance result

**Not executed for real applications.** This checklist is an implementation plan, not a pass certificate.
