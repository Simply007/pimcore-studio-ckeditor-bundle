# Studio internals: building or extending a wysiwyg editor bundle

Verified on Pimcore 2026.3 / `@pimcore/studio-ui-bundle` 2026.3.4. The official
`pimcore/skills` Studio skills do not cover these points (as of 2026-11);
where they disagree, these were checked against vendor source. Re-check against
`vendor/pimcore/studio-ui-bundle` after a Studio upgrade.

Blueprints: `pimcore/quill-bundle` (the reference editor bundle) and this
bundle's `assets/studio/js/src/modules/ckeditor-editor/`.

## 1. The slot

Studio renders every wysiwyg surface (data object fields and document
editables) through one component registry entry:

```ts
import { container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type ComponentRegistry, componentConfig } from '@pimcore/studio-ui-bundle/modules/app'

const registry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
registry.override({ component: MyEditor, name: componentConfig.wysiwyg.editor.name })
```

- `override` takes ONE object `{ component, name }` (some docs show two
  arguments: wrong for 2026.3).
- Service id is `serviceIds['App/ComponentRegistry/ComponentRegistry']`.
- No arbitration: the last `override()` wins. Order is deterministic: Studio
  registers its built-in editor first, then plugin modules initialize in
  ascending plugin `priority`. This bundle uses a probe plugin at -1000
  (records the built-in editor) and the selector at 1000 (applies
  `ckeditor_studio.editor`). See `assets/studio/js/src/plugins.ts` and
  `modules/ckeditor-editor/index.tsx`.
- Document editables render in the editmode iframe; tag the entry point
  provider for it too. The provider is the same class as for the main UI
  (see `config/studio_ui.yaml`):

```yaml
Simply007\CKEditorStudioBundle\Webpack\WebpackEntryPointProvider:
  tags:
    - { name: 'pimcore_studio_ui.webpack_entry_point_provider' }
    - { name: 'pimcore_studio_ui.webpack_entry_point_provider.document_editor_iframe' }
```

  Plugins bootstrap in the iframe the same way and `appConfig` is readable there.
- A third editor bundle that also selects at runtime must coordinate
  priorities with this one (-1000 and 1000), or set `ckeditor_studio.editor`
  so this bundle steps aside.

## The props contract

`WysiwygProps` / `WysiwygEditorRef` from `@pimcore/studio-ui-bundle/modules/wysiwyg`:
value, `onChange`, `maxCharacters`, `editorConfig`, placeholder, read only,
size, and a ref with `onDrop(info: DragAndDropInfo)`.

Not in the typed props, verified at runtime:

- Data object fields: Studio spreads the field definition into the component.
  `name` is a form path ARRAY (`['content']`); use `combinedFieldName`
  (`'content'`, dotted for nested and localized fields). Title comes from the
  definition.
- Element identity for data objects: `useOptionalElementContext()` from
  `@pimcore/studio-ui-bundle/modules/element` (type + id).
- Document editables: neither is passed. Element id from the iframe's
  `window.pimcore_document_id`, field name from the surrounding
  `#pimcore_editable_<name>` container. A Pimcore markup change breaks this.

Never echo the incoming value: keep the last emitted HTML and only `setData()`
on external changes; skip external resets entirely while RTC is active.

## 2 and 3. Data

- Editables are rows in `documents_editables` keyed by document, name and
  type; the template's editable names are the page schema.
- `Wysiwyg::save()` sanitizes through `html_sanitizer.sanitizer.pimcore.wysiwyg_sanitizer`
  (symfony/html-sanitizer). Allowed: tables, lists, links, spans with
  class/style. Dropped silently: `code`, `pre`.
- GHS rule this bundle uses to keep Pimcore markup:

```js
htmlSupport: { allow: [{ name: /^.*$/, attributes: ['pimcore_id', 'pimcore_type', 'pimcore_disable_thumbnail', 'id'], classes: true, styles: true }] }
```

## 4. Host features: drag and drop

Payload `info.type` (`asset`, ...) and `info.data` (`id`, `fullPath`,
`type`, `elementType`, `width`). Produce the markup quill-bundle produces:

- Image asset, collapsed selection: `<img src alt="asset_image" style="width:..." pimcore_id pimcore_type="asset">`.
  Wider than 600px, or not jpg/jpeg/gif/png: src from `createImageThumbnailUrl(id, { width: 600, mimeType: 'JPEG' })`
  (`@pimcore/studio-ui-bundle/components`, also exports `DragAndDropInfo`);
  otherwise the original path plus `pimcore_disable_thumbnail="true"`.
- Other assets, documents (page, hardlink, link), objects: `<a href pimcore_id pimcore_type="asset|document|object">`.
- Insert through `editor.data.toModel(editor.data.processor.toView(html))` so
  GHS applies; escape every attribute.

## 5. Runtime config

PHP to browser: implement `Pimcore\Bundle\StudioUiBundle\AppConfig\AppConfigProviderInterface`
and tag it `pimcore_studio_ui.app_config_provider`. Studio merges the returned
array into `data-app-config` on the shell page; the frontend reads it with
`appConfig` from `@pimcore/studio-ui-bundle/app`. Studio also merges
`appConfig.wysiwyg.defaultEditorConfig.dataObject|document` into the
`editorConfig` prop: two config layers, document the precedence.

Backend route riding on the Studio session: put it in
`<bundle>/config/pimcore/routing.yaml` (auto-loaded) under
`/pimcore-studio/api/...` and the Studio firewall applies. CSP: subscribe to
`Pimcore\Bundle\StudioUiBundle\Event\Csp\CspEvent` and call
`$event->getCspHandler()->addAllowedUrls(ContentSecurityPolicyHandlerInterface::CONNECT_OPT, [...])`.

## 6. Packaging

- Bundle class extends `AbstractPimcoreBundle`; `composer.json` type
  `pimcore-bundle` with `extra.pimcore.bundles`.
- Extension implements `PrependExtensionInterface` and loads the Studio
  services only when `$container->hasExtension('pimcore_studio_ui')`.
- Frontend: rsbuild + module federation under `assets/studio/` (not
  `assets/`), build into `public/studio/build/<build-id>/`, `assetPrefix`
  `/bundles/<name>/studio/build/<build-id>`. Build id from `getBuildGroupId(__dirname)`
  (`@pimcore/studio-ui-bundle/bundler/build-id`) written with `pluginWriteBuildId`
  (`@pimcore/studio-ui-bundle/rsbuild/plugins`), not a random uuid. Remote:
  a promise reading `window.StudioUIBundleRemoteUrl` (see `rsbuild.config.ts`). `inversify` 6.1.x in `shared` with `eager: true`.
- rsbuild does not empty its output dir: delete it before a production build.
- Composer runs no Node build, so the build is committed (alternative:
  `BuildArchiveProviderInterface` + a zip, the quill-bundle route).
- Pin `pimcore/studio-ui-bundle` (composer) and `@pimcore/studio-ui-bundle`
  (npm) to the same line; Studio versions are `2026.x`, not `1.0` or canary.

## 7. Open upstream asks

Documented slot and props, editor selection as config, slot priorities or a
conflict warning, typed field identity, a sanitizer allowlist the editor can
read. Tracked in https://github.com/Simply007/pcdd26-pimcore-ai-guidepost/issues/2.
