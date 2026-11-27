/**
 * Drops from Studio's trees (assets, documents, data objects).
 *
 * Studio's Draggable uses native drag and drop: it sets effectAllowed 'move'
 * and puts the element as JSON on the dataTransfer. CKEditor's clipboard
 * plugin answers every drag that started outside the editor with dropEffect
 * 'copy' on dragover. A dropEffect that effectAllowed does not permit makes
 * the browser cancel the drop, so no drop event fires and Studio's Droppable
 * never calls the editor's onDrop. Studio drags get the effect they allow.
 */

/** The dataTransfer type Studio's Draggable writes. */
export const STUDIO_DRAG_TYPE = 'application/json'

export const isStudioDrag = (types: readonly string[] | null | undefined): boolean =>
  Array.isArray(types) ? types.includes(STUDIO_DRAG_TYPE) : false

/**
 * The dropEffect for a drag over the editor, or null to keep CKEditor's own
 * choice (drags of editor content, files, text from other apps).
 */
export const studioDropEffect = (
  types: readonly string[] | null | undefined,
  effectAllowed: string | null | undefined
): 'move' | 'copy' | 'link' | null => {
  if (!isStudioDrag(types)) {
    return null
  }
  switch (effectAllowed) {
    case 'copy':
    case 'copyLink':
      return 'copy'
    case 'link':
      return 'link'
    default:
      // 'move', 'copyMove', 'linkMove', 'all', 'uninitialized'
      return 'move'
  }
}

/** The parts of a model range that dropOnSelection reads. */
export interface SelectedRange<P> {
  readonly start: P
  readonly end: P
  readonly isCollapsed: boolean
  containsPosition: (position: P) => boolean
}

/**
 * Whether a drop lands on the selected text (inside it or at its edge).
 * Then the drop acts on the selection, such as turning it into a link,
 * instead of moving the caret to the drop point.
 */
export const dropOnSelection = <P extends { isEqual: (other: P) => boolean }>(
  selection: Iterable<SelectedRange<P>>,
  drop: P
): boolean => {
  for (const range of selection) {
    if (range.isCollapsed) {
      continue
    }
    if (range.containsPosition(drop) || range.start.isEqual(drop) || range.end.isEqual(drop)) {
      return true
    }
  }
  return false
}
