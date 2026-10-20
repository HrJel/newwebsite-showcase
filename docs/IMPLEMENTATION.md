# Implementation notes — NewWebsite

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
- **No actual application runtime**, private source tree, database schema, email transport, credentials or deployment wiring.
- **No real live preview** is wired without an approved separate demo endpoint.

## Mapping from source to public presentation

The source references have been read for high-level technical accuracy, but private repositories and URLs are intentionally **not** disclosed in this publication. Documentation is paraphrased and stripped of confidential configuration. Technical assumptions requiring full source review remain marked as unverified.

## Upgrade path

1. Verify exact product and canonical source/version with the rights holder.
2. Inventory features that may safely be demonstrated.
3. Capture anonymized screenshots and create fake-data demo fixtures.
4. Independently test each indicated platform.
5. Update `portfolio.json` only after a reviewer approves the published claim.
