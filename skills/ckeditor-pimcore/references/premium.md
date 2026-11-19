# CKEditor AI and real-time collaboration in Studio

Prerequisites: a license key valid for self-hosted (npm) use and a Cloud
Services environment. A free trial at https://portal.ckeditor.com/ gives both.

## Turn it on

`.env.local` (gitignored, never committed):

```bash
CKEDITOR_LICENSE_KEY=<license key>
CKEDITOR_CS_ENVIRONMENT_ID=<environment id>
CKEDITOR_CS_ACCESS_KEY=<access key>         # server side only, signs tokens
CKEDITOR_CS_WEBSOCKET_URL=<wss://...cke-cs.com/ws>
CKEDITOR_PREMIUM_AI=1
CKEDITOR_PREMIUM_RTC=1
```

The gates in yaml (defaults off):

```yaml
parameters:
  env(CKEDITOR_PREMIUM_AI): '0'
  env(CKEDITOR_PREMIUM_RTC): '0'

ckeditor_studio:
  premium:
    ai:
      enabled: '%env(bool:CKEDITOR_PREMIUM_AI)%'
      # container: sidebar      # sidebar (docked panel per element) | overlay
      # config: {}              # raw CKEditor "ai" config, e.g. serviceUrl
    realtime_collaboration:
      enabled: '%env(bool:CKEDITOR_PREMIUM_RTC)%'
      # token_url: ~            # null: the bundle's own endpoint
      # web_socket_url: ~       # null: CKEDITOR_CS_WEBSOCKET_URL
```

Then `bin/console cache:clear`. No rebuild.

EU environment: set `premium.ai.config.serviceUrl: https://ai.cke-cs-eu.com/v1`
(the default is the US region).

## What happens

- No key or gates off: `licenseKey: 'GPL'`, no premium chunk fetched, Studio's
  CSP untouched. A gate with missing prerequisites logs a warning and keeps
  the free editor.
- Premium code (`ckeditor5-premium-features`, exact same version as `ckeditor5`)
  loads through a dynamic import only with a key and a gate on.
- AI: one chat per Pimcore element, shared by all wysiwyg fields of that
  element (one CKEditor `Context`, key `pimcore-<elementType>-<elementId>`),
  each field described by its title so the AI edits the field you name.
  Toolbar gets `toggleAi` and `aiQuickActions` automatically.
- AI always gets a `collaboration.channelId`, even with RTC off (CKEditor AI
  requires one): the per-field id below, or a per-mount random
  `pimcore-ai-<uuid>` when none is derivable.
- RTC: channel per field, `pimcore-<elementType>-<elementId>-<fieldName>`
  (for example `pimcore-data-object-3-content`, `pimcore-document-1-intro`); a
  per-field `editorConfig.collaboration.channelId` wins. The document state
  lives in Cloud Services while collaborating; changes still mark the Pimcore
  object modified and save normally. A presence list shows above the editor.
- `sourceEditing.allowCollaborationFeatures: true` is set for you (source
  editing otherwise refuses to start next to RTC).

## Token endpoint

`GET /pimcore-studio/api/ckeditor-studio/cs-token` (route `ckeditor_studio_cs_token`):

- Behind the Studio firewall (`ROLE_PIMCORE_USER`): anonymous 401, Studio
  session cookie works. 503 when the Cloud Services variables are missing.
- HS256 JWT: `aud` environment id, `sub` Pimcore user id, `user.name` /
  `user.email`, 1 hour. Demo scope: writer on every channel and the AI "end
  user" permissions. **Narrow both for production** (map Pimcore permissions
  to channel roles).

## CSP

Studio's `connect-src` blocks Cloud Services. While a key and a gate are on,
the bundle's `CspEvent` subscriber adds `https://*.cke-cs.com`,
`wss://*.cke-cs.com`, the `cke-cs-eu.com` equivalents and
`https://proxy-event.ckeditor.com`. If AI fails with `ai-request-failed` and
an empty original error, or Cloud Services reports "initial connection
attempts exceeded", check the CSP header first.

## Verify

- Console: trial license notice, no license error.
- `curl -s -o /dev/null -w '%{http_code}' http://localhost/pimcore-studio/api/ckeditor-studio/cs-token` is 401 anonymous.
- In Studio: the AI panel docks next to the content; a second Pimcore user on
  the same object sees live edits (two tabs of one user show one avatar).
- Gates back to `0`, `cache:clear`: no premium chunk loads.

A failed AI start can print the editor config, license key included, to the
console: do not paste such logs publicly.
