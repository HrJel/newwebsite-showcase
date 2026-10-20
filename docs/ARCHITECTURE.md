# Architecture — NewWebsite

> **Repository update — 20 October 2026:** New, independently authored `index.html`, `app.js`, `theme.css`, `theme.json` and `_worker.js` files now exist in this public repository. They are **not** the original private web application, are **not** proven production deployed, and do **not** establish functional parity with the reviewed source. Historical claims of a documentation-only repository in older passages below describe the initial publication, not the current file inventory. See [current technical reference](TECHNICAL_REFERENCE.md), [feature evidence matrix](FEATURE_AND_RELEASE_MATRIX.md), and [security runbook](SECURITY_AND_OPERATIONS.md).


## Architecture status

**Reference code examined; public presentation adapted. Live deployment and end-to-end behavior not independently verified.**

## Public high-level flow

```text
Visitor / Browser → Static pages and assets → Edge Worker (routing, selected gated endpoints) → approved external services
```

## Verified high-level design

Static website assets and page routes are served through Cloudflare Pages advanced Worker mode. Protected routes are handled at the edge with server-side validation and secret bindings. The public repository now includes a **new independently authored** Cloudflare Pages Worker and its authentication routes; these are not the original private Worker and have not completed live acceptance.

## Technology references

- Static HTML, CSS and JavaScript
- Cloudflare Pages advanced-mode Worker
- Edge-managed portal workflows (in the source implementation)
- Turnstile challenge integration and transactional email (in source design)

## Trust boundaries

1. The public showcase is a separate documentation/presentation boundary. It is not authorized to access production accounts or protected datasets.
2. Authentication, authorization, storage operations and confidential business rules, if applicable, belong to private reviewed services—not public mock UI.
3. An iframe is a nested browser context, not a substitute for server authentication or entitlement checks.
4. Device frames alter dimensions and appearance, not actual native runtime behavior.

## Unverified or intentionally omitted

- No verified production release or cross-device acceptance result is claimed.
- Real portal, email, and authentication flows are not part of this public repository.

## Security/design review before going live

- [ ] Confirm any referenced architecture is approved for public disclosure.
- [ ] Use invented demo identifiers, content and accounts.
- [ ] Verify no private URL or client organization names appear in HTML, CSS, JS, screenshots or history.
- [ ] Test browser permissions and iframe CSP on the actual demo host.
- [ ] Confirm accessibility and responsive behavior separately on representative devices.
