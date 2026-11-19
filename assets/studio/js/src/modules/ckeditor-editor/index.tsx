import { type AbstractModule, container } from '@pimcore/studio-ui-bundle'
import { serviceIds } from '@pimcore/studio-ui-bundle/app'
import { type ComponentRegistry, componentConfig } from '@pimcore/studio-ui-bundle/modules/app'
import CKEditorEditor from './ckeditor-editor'

/**
 * Puts CKEditor into Studio's `wysiwyg.editor` slot, the same way the editor
 * bundles Pimcore ships do (Quill, TinyMCE, Pimcore WYSIWYG Editor).
 *
 * Studio has one slot and no arbitration between editor bundles: the last
 * `override()` wins. Like Pimcore's own editor bundles, enable only one of
 * them; see the README ("Editor bundles").
 */
export const CKEditorEditorModule: AbstractModule = {
  onInit: (): void => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.override({
      component: CKEditorEditor,
      name: componentConfig.wysiwyg.editor.name
    })
  }
}
