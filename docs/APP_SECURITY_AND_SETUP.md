# NewWebsite independent application security and staging setup

**Scope:** newly authored Cloudflare Pages showcase; the original/source-documented business system is separate. Code presence is not proof of a live production deployment.

## Implemented

- `GET /login` renders username, password and Cloudflare Turnstile form; `POST /api/login` requires same-origin submission and server-side Siteverify success (hostname, action).
- `GET /` assets and `GET/PUT /api/workspace` require an active scoped D1 session. Workspace persists synthetic per-user records; it is not a normalized domain database.
- D1 session tokens are generated from 32 cryptographically random bytes, stored only as SHA-256 digests, and expire after eight hours. Logout revokes sessions.
- Cloudflare `__Host-` cookie is Secure, HttpOnly, SameSite=None and Partitioned for the previously documented portfolio embedding behavior. Cross-browser frame compatibility requires testing.
- Login attempts are counted per hashed app/IP/username and rejected after five failures within fifteen minutes.
- Security headers: CSP, nosniff, no-referrer, HSTS and Permissions-Policy; HTML escaping, body caps, parameterized SQL, admin-only user management, origin checks on mutations.

## Provisioning and acceptance

1. Provision a dedicated staging Cloudflare Pages project; publish `index.html`, `app.js`, `theme.css` and advanced-mode `_worker.js` from this repository root.
2. Bind `ASSETS` (Pages) and a suitable D1 database as `AUTH_DB`; review [schema.sql](../schema.sql) before initializing. Do not run unreviewed migrations on an existing/shared production D1.
3. Configure hostname-restricted public `TURNSTILE_SITE_KEY`, encrypted `TURNSTILE_SECRET`, and per-app Cloudflare secrets `ADMIN_USERNAME` and a random 16+ character `ADMIN_PASSWORD`. No default admin credentials are included.
4. Test setup-failure 503, unauthenticated redirects/401, wrong password, Turnstile failures/replay, rate limit 429, role escalation attempts, cross-app isolation, user disable, logout, session expiry and responsive layouts on a running staging deployment.
5. Enable deployment CI, secret scanning, backups, observability, incident response and separate tenant controls before handling real data.

**Known missing controls:** independent penetration test, MFA/SSO and recovery, distributed abuse protection, formal CSRF review, structured domain-specific authorization, normalized product schema, business audit logging, accessibility acceptance and verified release rollback. Original portal/email workflows and actual publication approval, revision rollback and media integrations are not implemented in this adaptation.

**No secrets or operational user data should be entered into sample workspaces.**
