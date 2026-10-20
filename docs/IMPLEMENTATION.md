# Implementation notes — NewWebsite

> **Repository update — 20 October 2026:** New, independently authored `index.html`, `app.js`, `theme.css`, `theme.json` and `_worker.js` files now exist in this public repository. They are **not** the original private web application, are **not** proven production deployed, and do **not** establish functional parity with the reviewed source. Historical claims of a documentation-only repository in older passages below describe the initial publication, not the current file inventory. See [current technical reference](TECHNICAL_REFERENCE.md), [feature evidence matrix](FEATURE_AND_RELEASE_MATRIX.md), and [security runbook](SECURITY_AND_OPERATIONS.md).


## Evidence ledger

- Source tree has index.html, app.js, styles.css, multiple page folders, and _worker.js.
- Source Worker references an ASSETS binding, portal sessions, anti-abuse challenges, and email delivery configuration.
- Source README explicitly says a documentation/rebranding phase was in progress; do not state all public pages are rebranded.

## Functional narrative

A multipage web experience with content routes, responsive front-end assets, and an edge entry point that can serve the site and mediate protected portal workflows.

### Functional areas

- Multipage navigation and responsive content presentation
- Static assets served at the edge
- Selected authenticated portal routes in the source implementation
- Server-side verification for protected workflows

## Implementation constraints

- No verified production release or cross-device acceptance result is claimed.
- Real portal, email, and authentication flows are not part of this public repository.

## What this repository implements

- Markdown documentation, project-level metadata, safe viewer mode classification and release checklists.
- **A new independent frontend and Worker source are now present**, but not original private client code, domain-specific production schemas, email transport, credentials or verified live deployment wiring.
- **No real live preview** is wired without an approved separate demo endpoint.

## Mapping from source to public presentation

The source references have been read for high-level technical accuracy, but private repositories and URLs are intentionally **not** disclosed in this publication. Documentation is paraphrased and stripped of confidential configuration. Technical assumptions requiring full source review remain marked as unverified.

## Upgrade path

1. Verify exact product and canonical source/version with the rights holder.
2. Inventory features that may safely be demonstrated.
3. Capture anonymized screenshots and create fake-data demo fixtures.
4. Independently test each indicated platform.
5. Update `portfolio.json` only after a reviewer approves the published claim.
