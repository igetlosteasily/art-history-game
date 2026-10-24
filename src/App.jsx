// The frame of the app: the header, then whichever screen the address asks for.
//
// Used by: main.jsx, which puts it on the page.
// Why it exists as its own file: it is the one place that decides which
// screen is showing and holds the state screens share (the current round,
// which the header's progress also reads). The screens themselves stay
// focused on their own layout.

import { useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import paintings from './data/paintings.js'
import { useRound } from './lib/round.js'
import { useHashRoute } from './lib/useHashRoute.js'
import PlaceholderScreen from './screens/PlaceholderScreen.jsx'
import SortScreen from './screens/SortScreen.jsx'
import './App.css'

const PAGE_TITLES = {
  sort: 'Sort by movement',
  identify: 'Identify',
  review: 'Your round',
}

export default function App() {
  const route = useHashRoute()
  const round = useRound(paintings)

  // Name the browser tab after the screen, which also tells screen reader
  // users where they have landed
  useEffect(() => {
    document.title = `${PAGE_TITLES[route]} · Art History Study`
  }, [route])

  return (
    <div className="app">
      <Header
        route={route}
        progress={route === 'sort' ? { position: round.position, total: round.total } : null}
      />
      {route === 'sort' && <SortScreen round={round} />}
      {route === 'identify' && (
        <PlaceholderScreen title="Identify">
          Identify opens soon. You will name each work's title, artist, and movement from memory.
        </PlaceholderScreen>
      )}
      {route === 'review' && (
        <PlaceholderScreen title="Your round">Finish a round in Sort by movement to review it here.</PlaceholderScreen>
      )}
    </div>
  )
}
