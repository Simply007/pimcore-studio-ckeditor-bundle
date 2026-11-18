---
name: ckeditor-pimcore
description: >-
  Use when adding, configuring or debugging CKEditor as the rich text /
  WYSIWYG editor in Pimcore Studio (Pimcore 2026.x): data object wysiwyg
  fields, document editables (pimcore_wysiwyg), the
  simply007/ckeditor-studio-bundle package, switching from Quill or the
  built-in editor, CKEditor AI or real-time collaboration in Studio, or when
  building or extending a Studio wysiwyg editor bundle (componentConfig
  wysiwyg.editor slot, WysiwygProps, AppConfigProviderInterface). NOT for the
  classic ExtJS admin, CKEditor 4, or the Cloud Services editor bundle.
license: GPL-2.0-or-later
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
metadata:
  author: Ondřej Chrastina
  version: 0.1.0
  package: simply007/ckeditor-studio-bundle
  verified-on: "Pimcore 2026.3, Studio UI 2026.3.4, CKEditor 49.1"
---

# CKEditor in Pimcore Studio

The Pimcore answer to each point of the `ckeditor-integration` skill (read
that one for the concepts; it lives in
https://github.com/Simply007/pcdd26-pimcore-ai-guidepost under `skills/`). Editor-side setup (plugins, toolbar items, license
semantics): the `ckeditor` skill. Status: community package and proof of
concept, not reviewed by Pimcore. Names: Composer package
`simply007/ckeditor-studio-bundle`, GitHub repository
`Simply007/pimcore-studio-ckeditor-bundle`, PHP namespace
`Simply007\CKEditorStudioBundle`.

**Run every PHP command in the container** (`docker compose exec php ...`);
host PHP usually lacks Pimcore's extensions.

## Pick the path

| Goal | Read |
|---|---|
| Use CKEditor in a Pimcore project | "Install and configure" below |
| Turn on CKEditor AI or real-time collaboration | `references/premium.md` |
| Change the bundle, write another editor bundle, or debug the integration | `references/studio-internals.md` |

## Install and configure

```bash
composer require simply007/ckeditor-studio-bundle
bin/console pimcore:bundle:enable CKEditorStudioBundle
bin/console assets:install public --symlink --relative
bin/console cache:clear
```

Configuration lives under `ckeditor_studio` (for example
`config/packages/ckeditor_studio.yaml`); every key is optional. **Every change
needs only `cache:clear`, never a frontend rebuild** (settings reach the
browser at runtime).

```yaml
ckeditor_studio:
  editor: ckeditor          # ckeditor (default) | quill | default
  license_key: '%env(CKEDITOR_LICENSE_KEY)%'   # empty: licenseKey 'GPL'
  toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', 'insertTable', '|', 'sourceEditing']
```

- `editor`: `ckeditor` is this bundle; `quill` keeps the editor that
  `pimcore/quill-bundle` registered (falls back to CKEditor with a console
  warning when that bundle is not enabled); `default` is the editor Studio
  itself registers when no editor bundle is installed. Editor bundles can stay
  enabled side by side; this one value decides, for data object fields and
  document editables alike (the editmode iframe reads the same app config).
- `toolbar`: replaces the whole default list. Items need a plugin in the
  committed build: Essentials, Paragraph, Heading, Bold, Italic, Underline,
  Alignment, Link, List, Indent, BlockQuote, Table, Image, ImageResize,
  SourceEditing, GeneralHtmlSupport, Fullscreen. Anything else means a code
  change and a rebuild.
- Config precedence (later wins): bundle defaults, `ckeditor_studio.toolbar`,
  then per-field `editorConfig` / `pimcore_studio_ui.wysiwyg.default_editor_config`
  (Pimcore writes that Quill-shaped; CKEditor ignores unknown keys). The
  per-field config is spread over everything, so a top-level `toolbar` key
  there replaces the bundle toolbar entirely.
- Keys in `.env.local` only, never in committed files. The license key still
  reaches every Studio user's browser in `data-app-config`: CKEditor license
  keys are designed for that. Real secrets (Cloud Services access key, AI
  provider keys) never go there.

Inline editor for one document editable, a bundle option passed through the
editable's options (data object fields are always classic):

```twig
{{ pimcore_wysiwyg('heroSubline', { editorType: 'inline', placeholder: 'One or two sentences' }) }}
```

Document editables grow with their content; a template `height` is ignored.
Data object fields without `height` cap at 70% of the viewport.

## Traps

| Symptom | Cause | Fix |
|---|---|---|
| `<code>` / `<pre>` gone after save, no error | `Wysiwyg::save()` runs Pimcore's html sanitizer, which does not allow them | Keep code features off the toolbar, or extend `framework.html_sanitizer` for `pimcore.wysiwyg_sanitizer` (check with `debug:config framework html_sanitizer`) |
| Editor not CKEditor after install | Build not published, or `editor` config | `assets:install`, `cache:clear`, check `ckeditorStudio.editor` in `data-app-config` on `/pimcore-studio/` |
| Link dropped on selected text has no `pimcore_id` | Known limitation: the link command sets only `href` | Drop with a collapsed selection |
| Layout breaks next to the AI panel in documents | The docked panel narrows the iframe content, not the viewport | Layouts that adapt to width (auto-fit grids, flex wrap, container queries) |
| "bundle" means two things | Symfony bundle (this) vs CKEditor Cloud Services editor bundle (`ckeditor-bundle` skill) | Do not load `ckeditor-bundle` for this |

## Verify

On `/pimcore-studio/`, the `data-app-config` attribute holds `ckeditorStudio`
with the expected `editor`, toolbar and gates (never print key values). Then
in Studio: a data object wysiwyg field and a document editable both show
CKEditor; open and close a record without edits and it stays unmodified;
drag an asset in and the image carries `pimcore_id` and `pimcore_type="asset"`;
save and reload, the content is unchanged.
