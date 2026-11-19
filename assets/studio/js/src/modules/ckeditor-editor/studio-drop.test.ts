import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isStudioDrag, studioDropEffect } from './studio-drop.ts'

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
