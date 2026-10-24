// Round state: which paintings are in the current round and which one the
// student is looking at.
//
// Used by: App.jsx keeps one round and hands it to the Sort screen (which
// moves through it) and the header (which shows progress).
// Why it exists as its own file: the rules for moving through a round
// (what "next" means, what happens after the last painting) are logic, not
// layout. Written as a reducer, a function that takes the current state and
// an action and returns the new state, every rule can be tested without
// drawing anything. M2 adds answers here.

import { useMemo, useReducer } from 'react'
import { dealRound } from './rounds.js'

export const ROUND_SIZE = 8

export function startRound(paintings, random = Math.random) {
  return { paintings: dealRound(paintings, ROUND_SIZE, random), index: 0 }
}

export function roundReducer(state, action) {
  switch (action.type) {
    case 'next':
      // Stay on the last painting rather than running past the end
      return { ...state, index: Math.min(state.index + 1, state.paintings.length - 1) }
    case 'deal':
      return startRound(action.paintings, action.random)
    default:
      throw new Error(`Unknown round action: ${action.type}`)
  }
}

export function useRound(paintings) {
  const [round, dispatch] = useReducer(roundReducer, paintings, startRound)
  // useMemo hands screens the same object until the round actually changes,
  // so they don't redo work (like re-attaching keyboard listeners) for nothing
  return useMemo(
    () => ({
      current: round.paintings[round.index],
      upNext: round.paintings[round.index + 1] ?? null,
      position: round.index + 1,
      total: round.paintings.length,
      isLast: round.index === round.paintings.length - 1,
      next: () => dispatch({ type: 'next' }),
      dealAgain: () => dispatch({ type: 'deal', paintings }),
    }),
    [round, paintings],
  )
}
