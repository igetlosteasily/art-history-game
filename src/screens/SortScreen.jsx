// Sort screen: one painting at a time on the wall, its label beside it.
//
// Used by: App.jsx when the address is #/sort (the default).
// Why it exists as its own file: a screen arranges components for one mode of
// study and owns that mode's flow. This first version walks through a dealt
// round. M2 adds the five movement buttons, the reveal, and the round review.

import { useEffect } from 'react'
import ArtworkStage from '../components/ArtworkStage/ArtworkStage.jsx'
import NextButton from '../components/NextButton/NextButton.jsx'
import WallLabel from '../components/WallLabel/WallLabel.jsx'
import { preloadPainting } from '../lib/images.js'
import './screens.css'

// Keyboard shortcuts must never fire while the student is typing
function isTyping(target) {
  return target.closest('input, textarea, select, [contenteditable="true"]') !== null
}

export default function SortScreen({ round }) {
  const { current, upNext, isLast, next, dealAgain } = round
  const advance = isLast ? dealAgain : next

  // Start downloading the next painting while the student looks at this one,
  // so it appears without a wait (PRD section 9)
  useEffect(() => {
    if (upNext) preloadPainting(upNext)
  }, [upNext])

  // Right Arrow moves on, as a desktop shortcut (PRD section 5.2). Enter
  // already works on the focused button, as it does for every button.
  useEffect(() => {
    function onKeyDown(event) {
      // event.repeat: holding the key down shouldn't race through the round
      if (event.key !== 'ArrowRight' || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      if (isTyping(event.target)) return
      advance()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [advance])

  return (
    <main className="screen screen--split">
      <div className="screen__art">
        <ArtworkStage painting={current} />
      </div>
      <div className="screen__side">
        <WallLabel painting={current} />
        <NextButton onClick={advance}>{isLast ? 'Deal a new round' : 'Next painting'}</NextButton>
      </div>
    </main>
  )
}
