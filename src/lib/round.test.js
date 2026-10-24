// Automatic checks for moving through a round.
//
// Used by: `npm run test`.

import { describe, expect, it } from 'vitest'
import paintings from '../data/paintings.js'
import { ROUND_SIZE, roundReducer, startRound } from './round.js'

describe('roundReducer', () => {
  it('starts a round of 8 at the first painting', () => {
    const round = startRound(paintings)
    expect(round.paintings).toHaveLength(ROUND_SIZE)
    expect(round.index).toBe(0)
  })

  it('moves to the next painting and stops at the last one', () => {
    let round = startRound(paintings)
    for (let i = 0; i < 20; i++) round = roundReducer(round, { type: 'next' })
    expect(round.index).toBe(ROUND_SIZE - 1)
  })

  it('deals a fresh round from the first painting', () => {
    let round = roundReducer(startRound(paintings), { type: 'next' })
    round = roundReducer(round, { type: 'deal', paintings })
    expect(round.index).toBe(0)
    expect(round.paintings).toHaveLength(ROUND_SIZE)
  })

  it('rejects an unknown action, so typos fail loudly', () => {
    expect(() => roundReducer(startRound(paintings), { type: 'nxet' })).toThrow('Unknown round action')
  })
})
