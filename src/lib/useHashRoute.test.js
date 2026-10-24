// Automatic checks for reading screen names from the web address.
//
// Used by: `npm run test`.

import { describe, expect, it } from 'vitest'
import { parseRoute } from './useHashRoute.js'

describe('parseRoute', () => {
  it.each([
    ['#/sort', 'sort'],
    ['#/identify', 'identify'],
    ['#/review', 'review'],
    ['#identify', 'identify'],
    ['#/review?round=2', 'review'],
  ])('reads %s as %s', (hash, route) => {
    expect(parseRoute(hash)).toBe(route)
  })

  it.each(['', '#', '#/', '#/nowhere', '#/Sort'])('falls back to Sort for "%s"', (hash) => {
    expect(parseRoute(hash)).toBe('sort')
  })
})
