# Device-viewer implementation — NewWebsite

## Viewer contract

The public device selector can show **macOS, Web, iOS and Android** presentation modes, but a mode is not evidence of a native app. A frame changes display size and appearance, not the operating system or browser engine. Every live iframe URL is inspectable in browser network tools. No private application or confidential user data may be embedded.

For Maildesk, **disable the visible URL/address field and external-open/copy controls**. Use a dedicated fake-data demo service, with `Content-Security-Policy: frame-ancestors https://portfolio.jelvan.pro` returned from the demo server. Frame restrictions prevent embedding at other origins in compliant browsers; they are **not authentication**. A Fetch Metadata check can discourage top-level navigation but can be bypassed outside ordinary browsers.

For projects without approved demo URLs, render **screenshots or local simulation** and label them as such.


## Mode configuration

| Mode | Verified state |
| --- | --- |
| macos | browser-viewport |
| web | browser-viewport |
| ios | responsive-viewport-unverified |
| android | responsive-viewport-unverified |

## Integration

Consume `portfolio.json` in the portfolio's Projects/App viewer as a **data source**, not as an authentication control. Present labels and static screenshots for unsupported/unverified platforms. A frame-only project must not expose a button to open a live production app.

### Browser-side embed rules

Only set an iframe `src` when the URL is a deliberately authorized, public or otherwise appropriately authenticated **demo**. A separate demo server may set:

```http
Content-Security-Policy: frame-ancestors https://portfolio.jelvan.pro
X-Robots-Tag: noindex, nofollow
```

When merging CSP, preserve other directives (e.g. scripts, connects, fonts); remove conflicting legacy `X-Frame-Options` where appropriate. The parent portal may need to allow the demo in its own `frame-src`. **Never assume this hides the address from developer tools.**

### QA

- Select each device mode and inspect viewport behavior.
- Navigate and scroll within the viewer if and only if a safe demo is enabled.
- Verify production links are not exposed through buttons, tooltips, titles or markup copied from the demo.
- Confirm screenshots have no personal data, account identifiers or recognizable confidential client branding without permission.
