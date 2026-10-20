# Publication and deployment — NewWebsite

## Publishing these docs

This repository is built to be published as a **separate public GitHub repository** with no relationship to private GitHub history. See the parent bundle's `PUBLISHING_GUIDE.md` for the `gh` command workflow.

## Deployment policy

Do not deploy this documentation as the full original site. To publish a separate demo, use sanitized content and a dedicated Cloudflare Pages project, without production secrets.

### Release gates

- [ ] Rights and NDA review: public content is permitted.
- [ ] Separate new Git history created; not a public fork of a private project.
- [ ] No `.env`, secrets, private repository references or real customer data.
- [ ] Public documentation accurately separates shipped vs illustrative features.
- [ ] Approved screenshot(s) or clearly labeled placeholder(s) supplied.
- [ ] Public GitHub README and `portfolio.json` preview metadata checked.
- [ ] Dedicated demo (if any) isolated from production systems.
- [ ] No unauthenticated production dashboard, mailbox, payments or employee services published.

## Rollback

If a disclosure issue is discovered, remove the file, disable demo endpoints, coordinate with the owner of affected material, rotate any exposed credentials and follow the owner's incident response process. Assume already-public clones may persist.
