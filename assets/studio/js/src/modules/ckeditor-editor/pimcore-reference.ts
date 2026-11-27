/**
 * Pimcore element references on links.
 *
 * Pimcore resolves a link by its pimcore_id and pimcore_type attributes when it
 * renders the page (Text::wysiwygText), so a link keeps working after the
 * target moves. CKEditor's link command only takes a URL, so a link made on
 * selected text needs the two attributes added through General HTML Support,
 * which keeps extra <a> attributes on the text as the `htmlA` model attribute:
 * `{ attributes: { pimcore_id: '42', pimcore_type: 'document' } }`.
 */

export interface PimcoreReference {
  id: string
  type?: string
}

/** The value General HTML Support stores in `htmlA` (and other html* attributes). */
export interface GhsAttributeValue {
  attributes?: Record<string, string>
  classes?: string[]
  styles?: Record<string, string>
}

/** The part of a model item (text proxy) this module reads. */
export interface LinkItem {
  getAttribute: (key: string) => unknown
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * The `htmlA` value with the Pimcore reference added. Keeps what General HTML
 * Support already holds (other attributes, classes, styles). Without a type,
 * a stale pimcore_type is dropped, so the pair never points at two elements.
 */
export const withPimcoreReference = (existing: unknown, reference: PimcoreReference): GhsAttributeValue => {
  const base: GhsAttributeValue = isObject(existing) ? { ...existing } : {}
  const attributes: Record<string, string> = isObject(base.attributes) ? { ...base.attributes } : {}

  attributes.pimcore_id = reference.id
  if (reference.type !== undefined) {
    attributes.pimcore_type = reference.type
  } else {
    delete attributes.pimcore_type
  }

  return { ...base, attributes }
}

/**
 * For every item that the link command turned into a link to `href`, the new
 * `htmlA` value. Items without that link (text the command skipped) are left out.
 */
export const pimcoreReferenceUpdates = <T extends LinkItem>(
  items: Iterable<T>,
  href: string,
  reference: PimcoreReference
): Array<{ item: T, value: GhsAttributeValue }> => {
  const updates: Array<{ item: T, value: GhsAttributeValue }> = []
  for (const item of items) {
    if (item.getAttribute('linkHref') === href) {
      updates.push({ item, value: withPimcoreReference(item.getAttribute('htmlA'), reference) })
    }
  }
  return updates
}
