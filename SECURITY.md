# Public showcase security policy — NewWebsite

This is a **documentation-only** public portfolio repository, not the source code of an operational application. Do not report vulnerabilities in a client or company system here; use its authorized security disclosure channel.

## Do not commit

- Real credentials, cookies, API tokens, signing keys, environment files or session secrets.
- Customer, student, staff, patient, employee or email data; real screenshots showing personal details.
- Private hostnames, privileged API routes, provider account IDs or infrastructure diagrams that could aid unauthorized access.
- Code copied from client engagements without explicit permission.
- Live-demo URLs linked to sensitive authenticated production systems.

## Report an accidental leak

If sensitive content is ever published, immediately restrict or remove access, rotate affected secrets via the authorized owner, follow applicable notification processes and clean Git history using an approved incident response procedure. Treat public GitHub history as potentially permanently copied.

## Embedding and viewer isolation

`frame-ancestors` restricts which web origins may embed content; it is not access control. Hiding frame links is presentation-only. Public demo services must use sample data, least privilege, appropriate authentication when needed, restrictive CORS and separate environments from production.
