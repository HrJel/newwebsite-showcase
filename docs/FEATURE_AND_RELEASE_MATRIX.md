# NewWebsite — Feature inventory, acceptance criteria and release gates

> Updated 2026-10-20. **Do not confuse a Cloudflare Pages deployment marked successful with a successful application feature test.** Current Pages websites are earlier documentation builds; verified production deployment of the new application is **not** recorded.

## Evidence legend

- Public status = what exists in this GitHub repo
- Source-documented = described in a separate reviewed implementation, not copied
- Staged foundation = authored outside repository and not deployed
- Planned / NOT IMPLEMENTED = must not be marketed as shipped

**Public repository audit:** Independent browser UI and auth Worker files exist, but server secret readiness, original feature parity, and end-to-end production validation are unverified.

## Project-specific feature matrix

| Feature / module | Honest implementation status | Completion/production acceptance criteria |
| --- | --- | --- |
| Standalone content dashboard | Public app source present; unverified live | Create/edit page entries; refresh persists only after authenticated D1 API deployed; no privileged action without permission. |
| Multipage public routing and templates | Source-documented, not replicated | Serve accessible index/about/services and route-aware 404, canonical and sitemap. |
| Page draft/publish lifecycle | UI sample only; production workflow missing | Separate drafts/revisions, approvals, scheduled publish, rollback and audit. |
| Media/file publishing | Planned | Scan/type/size-validate uploads into R2 and serve approved variants. |
| Contact form and email | Source-documented; not connected in public version | Turnstile and rate-limit, transactional queue, verified recipient route and bounce monitoring. |
| Protected portal | Source-documented; not ported | Server-side access policy, tenant isolation, session lifecycle and least-privilege audit. |
| Search and SEO | Planned | Index content, friendly URLs, metadata, sitemap and robots policy tests. |
| Analytics and monitoring | Planned | Consent-aware metrics, logs, retention and alert thresholds. |

## Platform and integration truth table

| Deliverable | Status |
| --- | --- |
| Public GitHub docs | Published |
| New independently authored frontend files | Present in GitHub, not live-accepted |
| Authenticated Pages Worker runtime | Code present, no verified production deployment |
| Pages project / documentation site | Exists; documentation deployment successful |
| Turnstile widget per hostname | Configured at Cloudflare account level; challenge not live-verified in app |
| D1 AUTH_DB shared binding | Provisioned; isolated domain/business schema absent |
| Administrator secret and session login end-to-end | Not verified; no claim user can currently sign in |
| Fully featured product backend | Not built/verified in this public repo |
| Native iOS/Android/macOS signed releases | Not published or verified by this public repo |

## Definition of done for any module

- Domain entity/model, migration, API schema, error states and data ownership are documented.
- Server performs authentication, authorization, validation and idempotency where required.
- Unit, integration and browser end-to-end tests demonstrate success and failure behaviors.
- Observability records meaningful non-sensitive telemetry, with alerts, rollback and retention defined.
- Owner approves any client IP and third-party assets before public release.
- Claims in this matrix are updated based on reproducible test artifacts, not screenshots or roadmap promises.

## Prioritized milestones for NewWebsite

1. Publish only approved independent application source and verify actual git contents.
2. Configure per-project `ADMIN_USERNAME` and strong `ADMIN_PASSWORD` secrets, then deploy the prepared Worker to **staging**. Verify Siteverify response, session and D1 isolation.
3. Build the first two missing business modules behind an audited, least-privilege API, with synthetic fixture data.
4. Complete every critical feature above, API integration and negative/security test.
5. Perform deployment rehearsal and publish real release metadata; only then change a feature status to **production-ready**.

For architecture and language inventory see [Technical reference](TECHNICAL_REFERENCE.md). For security and on-call readiness see [Security and operations](SECURITY_AND_OPERATIONS.md).

**Jelvan® credit:** [Developed and Designed by Jelvan®](https://portfolio.jelvan.pro) — independent public portfolio work, not a claim of ownership of private client code.
