import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pimcoreReferenceUpdates, withPimcoreReference } from './pimcore-reference.ts'

const item = (attrs: Record<string, unknown>): { getAttribute: (key: string) => unknown } => ({
  getAttribute: (key: string) => attrs[key]
})

test('a link made on selected text gets pimcore_id and pimcore_type', () => {
  // Reproduces the bug: dropping a document on selected text gave a plain href without the reference.
  const text = item({ linkHref: '/en/pricing' })
  const updates = pimcoreReferenceUpdates([text], '/en/pricing', { id: '42', type: 'document' })
  assert.equal(updates.length, 1)
  assert.deepEqual(updates[0].value, { attributes: { pimcore_id: '42', pimcore_type: 'document' } })
})

test('attributes, classes and styles General HTML Support already holds are kept', () => {
  const value = withPimcoreReference(
    { attributes: { target: '_blank' }, classes: ['cta'], styles: { color: 'red' } },
    { id: '7', type: 'object' }
  )
  assert.deepEqual(value, {
    attributes: { target: '_blank', pimcore_id: '7', pimcore_type: 'object' },
    classes: ['cta'],
    styles: { color: 'red' }
  })
})

test('a new reference replaces the old one', () => {
  const value = withPimcoreReference({ attributes: { pimcore_id: '1', pimcore_type: 'asset' } }, { id: '2', type: 'document' })
  assert.deepEqual(value.attributes, { pimcore_id: '2', pimcore_type: 'document' })
})

test('without a type, a stale pimcore_type is dropped', () => {
  const value = withPimcoreReference({ attributes: { pimcore_id: '1', pimcore_type: 'asset' } }, { id: '2' })
  assert.deepEqual(value.attributes, { pimcore_id: '2' })
})

test('text the link command skipped is left alone', () => {
  const linked = item({ linkHref: '/en/pricing' })
  const other = item({ linkHref: '/somewhere-else' })
  const plain = item({})
  const updates = pimcoreReferenceUpdates([linked, other, plain], '/en/pricing', { id: '42', type: 'document' })
  assert.deepEqual(updates.map((u) => u.item), [linked])
})

test('values that are not GHS objects are treated as empty', () => {
  assert.deepEqual(withPimcoreReference(undefined, { id: '3', type: 'asset' }), { attributes: { pimcore_id: '3', pimcore_type: 'asset' } })
  assert.deepEqual(withPimcoreReference('junk', { id: '3', type: 'asset' }), { attributes: { pimcore_id: '3', pimcore_type: 'asset' } })
  assert.deepEqual(withPimcoreReference({ attributes: 'junk' }, { id: '3' }), { attributes: { pimcore_id: '3' } })
})
