import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dropOnSelection, isStudioDrag, studioDropEffect } from './studio-drop.ts'

test('a Studio tree drag (effectAllowed move) gets dropEffect move, not CKEditor\'s copy', () => {
  // Reproduces the bug: CKEditor sets 'copy', Studio only allows 'move', the browser cancels the drop.
  assert.equal(studioDropEffect(['application/json'], 'move'), 'move')
})

test('drags that are not from Studio keep CKEditor\'s own dropEffect', () => {
  assert.equal(studioDropEffect(['text/html', 'text/plain'], 'copyMove'), null)
  assert.equal(studioDropEffect(['Files'], 'all'), null)
  assert.equal(studioDropEffect([], 'move'), null)
  assert.equal(studioDropEffect(undefined, 'move'), null)
})

test('the dropEffect always fits what the drag allows', () => {
  assert.equal(studioDropEffect(['application/json'], 'copy'), 'copy')
  assert.equal(studioDropEffect(['application/json'], 'link'), 'link')
  assert.equal(studioDropEffect(['application/json'], 'all'), 'move')
})

test('isStudioDrag looks for the JSON payload Studio writes', () => {
  assert.equal(isStudioDrag(['application/json']), true)
  assert.equal(isStudioDrag(['text/plain']), false)
  assert.equal(isStudioDrag(null), false)
})

class Pos {
  readonly offset: number
  constructor (offset: number) { this.offset = offset }
  isEqual (other: Pos): boolean { return other.offset === this.offset }
}
const range = (start: number, end: number): { start: Pos, end: Pos, isCollapsed: boolean, containsPosition: (p: Pos) => boolean } => ({
  start: new Pos(start),
  end: new Pos(end),
  isCollapsed: start === end,
  containsPosition: (p: Pos) => p.offset > start && p.offset < end
})

test('a drop on selected text keeps the selection', () => {
  // Reproduces the bug: the drop moved the caret to the drop point, so the link went in between instead of onto the selection.
  assert.equal(dropOnSelection([range(10, 20)], new Pos(15)), true)
})

test('a drop at the edge of the selection keeps it', () => {
  assert.equal(dropOnSelection([range(10, 20)], new Pos(10)), true)
  assert.equal(dropOnSelection([range(10, 20)], new Pos(20)), true)
})

test('a drop elsewhere moves the caret to the drop point', () => {
  assert.equal(dropOnSelection([range(10, 20)], new Pos(5)), false)
  assert.equal(dropOnSelection([range(10, 20)], new Pos(25)), false)
})

test('with only a caret, the drop point wins', () => {
  assert.equal(dropOnSelection([range(10, 10)], new Pos(10)), false)
  assert.equal(dropOnSelection([], new Pos(10)), false)
})
