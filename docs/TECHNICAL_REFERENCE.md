# NewWebsite — Technical reference and system architecture

> **Reviewed: 20 October 2026.** This is an engineering inventory and production implementation plan, not proof of release readiness. `Implemented here`, `provisioned infrastructure`, `source-documented` and `planned` are separate evidence levels. Public source intentionally excludes any non-public/client repository location.

## 1. Scope, authorship and live status

- **Project:** NewWebsite, independent public adaptation curated by Jelvan R.
- **Public repository:** https://github.com/HrJel/newwebsite-showcase
- **Cloudflare Pages project:** `newwebsite-showcase` in account `Portfolio Apps - Jelvan`; documentation deployment exists. No new authenticated application release has been verified.
- **Public GitHub implementation today:** `index.html`, `app.js`, `theme.css`, `theme.json` and `_worker.js` exist as newly authored application foundation; no release-parity or production end-to-end acceptance is evidenced.
- **Reference/original work:** Reviewed non-public web source: static multipage HTML/CSS/JavaScript, Cloudflare Pages advanced-mode Worker, portal routing, edge assets and challenge/email integration references. Some rebranding and full live acceptance remained unresolved.
- **Ownership:** public presentations are independent. Historical client/employer/company IP is not republished; see `../DISCLAIMER.md`.

## 2. Language and framework ledger

| Layer | Current public repository | Reference implementation or intended design |
| --- | --- | --- |
| Documentation | Markdown, JSON metadata | Same |
| Browser UI | HTML5, CSS3, JavaScript ES2022 | Separate independent UI package: HTML/CSS/JavaScript |
| Edge authentication/API | Cloudflare Pages Worker JavaScript source included, unverified live | Cloudflare Workers JS, Turnstile, D1 |
| Original product stack | Not copied into public repository | HTML, CSS, JavaScript; Cloudflare Pages Worker; portal session/Turnstile and transactional-email design in the reviewed source. |
| Databases | No public SQL migration committed in this repository | Cloudflare D1 auth database is provisioned; domain-specific tables are **not** production implemented |
| Native clients | No native builds in the public showcase | Only where specifically indicated by reviewed source; do not infer mobile parity |

A responsive browser viewport is not an iOS/Android/macOS native application. Do not infer original runtime compatibility from a UI demonstration.

## 3. Current repository folder architecture

```text
newwebsite-showcase/
├── README.md, DISCLAIMER.md, SECURITY.md, CONTRIBUTING.md, portfolio.json
├── APP_IMPLEMENTATION_STATUS.md
├── index.html                         Authenticated app shell (source present, not live verified)
├── app.js                             Independent record/cart/workspace UI (source present)
├── theme.css, theme.json              Per-app design tokens and styling (source present)
├── _worker.js                         Pages advanced-mode auth Worker (source present)
├── assets/                            Approved public media/doc assets
├── docs/{ARCHITECTURE,IMPLEMENTATION,SOURCE_VERIFICATION,DEVICE_PREVIEW,DEPLOYMENT,TESTING,CHANGELOG}.md
└── docs/TECHNICAL_REFERENCE.md       This guide
```

**Prepared application package** (staged separately, not automatically proof of published files):

```text
newwebsite-showcase/
├── index.html       shell and app asset references
├── app.js           project-scoped sample UI; calls /api/workspace
├── theme.css        unique design system
├── theme.json       theme tokens
└── _worker.js       Pages advanced-mode auth and API, relies on bindings/secrets
```

**Recommended production decomposition — planned, not files present:**

```text
src/
├── ui/              accessible components, routes and feature-specific design
├── domain/          pages-and, navigation-and, content-publishing
├── api/             input validation, authentication, RBAC and rate limiting
├── data/            migrations, repositories, schemas and retention policy
├── integrations/    guarded third-party adapters; server-only credentials
└── tests/           unit, integration, e2e, security and contract suites
```

The model above represents a target structure, **not** the current source tree.

## 4. System boundaries and request flow

```text
Browser -> site routes/content editor -> Pages static assets / protected Worker -> D1 (proposed content records), R2 (proposed media), authorized email service
```

For the independent Pages foundation:

```text
Browser -> Cloudflare Pages custom domain -> _worker.js
  | anonymous /health
  | GET /login -> Turnstile widget
  | POST /api/login -> server-side Siteverify + credential check -> session cookie
  | authenticated / -> static ASSETS and project UI
  | GET/PUT /api/workspace -> app+user-scoped AUTH_DB row
  | /admin -> administrator-only account management
  +--> AUTH_DB (Cloudflare D1)
```

This diagram describes the **prepared auth foundation**, not the live documentation deployments. No original product backend has been connected to the new public UI.

## 5. Feature areas and module ownership

1. **pages and page revisions** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
2. **navigation and templates** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
3. **content publishing and scheduling** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
4. **image/media library** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
5. **contact forms and anti-abuse** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
6. **portal login and protected workflows** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.
7. **SEO, redirects, accessibility and analytics** — product module requiring its own schema, validated API, authorization tests, error states and acceptance criteria.

**Source-to-showcase mismatch:** The prepared independent UI is a generic content studio; it is not the full multipage original website, client portal, or operational publishing system.

For feature-by-feature release labels and acceptance tests see [Feature and release matrix](FEATURE_AND_RELEASE_MATRIX.md).

## 6. Backend services and external connections

1. **D1 or approved CMS for pages, revisions, drafts and roles** — required/design-stage integration, not guaranteed available on a live Pages app.
2. **R2/Images for uploads plus validation** — required/design-stage integration, not guaranteed available on a live Pages app.
3. **Transactional email sender with approved sending domain** — required/design-stage integration, not guaranteed available on a live Pages app.
4. **Turnstile at login and externally accessible forms** — required/design-stage integration, not guaranteed available on a live Pages app.
5. **Page cache, sitemap, SEO, redirects and observability** — required/design-stage integration, not guaranteed available on a live Pages app.

Provisioned **in Cloudflare for the eight independent showcase projects**: Turnstile widget (unique site key per hostname), encrypted Turnstile secret, Pages binding named `AUTH_DB` to a shared D1 auth database. Provisioning is **not** proof of configured admin credentials or a running login deployment.

### Authentication foundation runtime configuration

| Binding/secret | Type | Purpose | Source control? |
| --- | --- | --- | --- |
| `AUTH_DB` | D1 database binding | App users, sessions, attempts, workspace | Binding ID may be config; not credentials |
| `TURNSTILE_SITE_KEY` | Public Pages environment variable | Render captcha challenge per site | May be public |
| `TURNSTILE_SECRET` | Encrypted Pages secret | POST to Turnstile Siteverify server-side | **Never commit** |
| `ADMIN_USERNAME` | Encrypted Pages secret | Initial admin login | **Never commit** |
| `ADMIN_PASSWORD` | Encrypted Pages secret | Admin credential, strong unique value | **Never commit** |

The independent worker fails closed if settings are missing or the admin password is shorter than 12 characters. Use at least 16 random characters in real operation. Never deploy `123456` or reuse a sample account credential.

### Prepared HTTP contract (not evidence of live availability)

| Method/path | Intended operation | Access |
| --- | --- | --- |
| `GET /health` | Config-independent health JSON | Public, no private internals |
| `GET /login` | Sign-in page, Turnstile widget | Anonymous |
| `POST /api/login` | Siteverify + rate-limited credential check + session | Anonymous + token |
| `GET /api/me` | User and role | Authenticated |
| `POST /api/logout` | Revoke server session + expire cookie | Authenticated |
| `GET/PUT /api/workspace` | JSON workspace data, scoped by app and username | Authenticated |
| `GET /admin`, `POST /admin/users`, `POST /admin/toggle` | Manage users | Admin only |

Database tables provisioned: `app_users`, `auth_sessions`, `auth_attempts`, `app_workspace`. A single workspace JSON column is **not** a normalized production schema for the business product; create domain models and granular endpoint checks before handling real records.

## 7. Authentication, authorization and threats

- Turnstile must be validated by the **server** with `https://challenges.cloudflare.com/turnstile/v0/siteverify`; check `success`, expected `hostname`, and `action=login`. A client-side checkbox is not sufficient.
- Verify sessions in D1 on **every** restricted request. Independent worker uses hashed opaque tokens and `Secure; HttpOnly; SameSite=None; Partitioned` 8-hour session cookies. Cross-site embedded login must be tested across browsers; iframe cookies can be blocked.
- Admin role is separate from user role. Business-specific RBAC/ABAC is **not implemented** just because `/admin` exists; add record ownership, organization scope, least-privilege permissions and server-side checks per product action.
- Prepared worker limits login failures by a hashed combination of app, IP and username (five failures within fifteen minutes). Add distributed rate limiting, abuse telemetry and recovery gates before a public production release.
- Prepared user accounts use PBKDF2-SHA256 with individual salts; add passkey/MFA, credential reset, forced temporary-password rotation, secret rotation and independent authentication security review.
- Protect privileged mutations against CSRF, validate form origins and JSON schemas, use output encoding, strict CSP, no store on authenticated assets, security response headers and log redaction.
- D1 rows are logically scoped by app and username in a **shared database**. If legal/tenant isolation requires hard separation, use dedicated databases and keys.
- Never include customer records, internal URLs, original client keys, unapproved screenshots, source access tokens or private connection strings in public GitHub.

For operational release gates and incident handling see [Security and operations](SECURITY_AND_OPERATIONS.md) and the existing [Security Policy](../SECURITY.md).

## 8. Verification and release acceptance

1. **Source integrity:** review licenses/rights, scan Git history and current assets for secrets, inspect third-party packages and generate SBOM.
2. **Build:** lint, type-check where applicable, test real app routes, test Worker `ASSETS` binding and browser compatibility.
3. **Auth:** invalid/missing/expired Turnstile challenge denied; wrong password denied; rate limit works; missing secrets fail closed; admin/user permissions differ; session invalidation persists.
4. **Isolation:** prove user A cannot fetch/modify user B's data; prove app A cannot reach app B; test pagination, size bounds and concurrent writes.
5. **Feature acceptance:** complete every unshipped module in the feature matrix with business-specific backend and integration tests.
6. **Operations:** CI tests, staging database and data fixtures, backups, RTO/RPO, monitoring, alerting, audit log retention, rollback rehearsal.
7. **Privacy:** data minimization, deletion/retention, encryption, incident response, email/payment/employee-data rules for the actual product.
8. **Launch:** confirm permitted domains, CSP `frame-ancestors` for portfolio embed, TLS, caching and runtime errors; use controlled staged rollout.

**Release classification:** Code present; build/release acceptance not confirmed. No claim of fully functional original parity or production release is made.

## 9. Additional public documentation

- [Original high-level architecture](ARCHITECTURE.md)
- [Previous source verification](SOURCE_VERIFICATION.md)
- [Implementation evidence](IMPLEMENTATION.md)
- [Deployment/disclosure constraints](DEPLOYMENT.md)
- [Previous testing requirements](TESTING.md)
- [Device-preview truth in labeling](DEVICE_PREVIEW.md)
- [Feature acceptance matrix](FEATURE_AND_RELEASE_MATRIX.md)
- [Security and operations runbook](SECURITY_AND_OPERATIONS.md)

**Brand credit:** [Developed and Designed by Jelvan®](https://portfolio.jelvan.pro). This branding identifies the independently authored public adaptation, not legal ownership of any third-party deliverable.
