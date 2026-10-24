// Header: the wordmark, the mode tabs, and progress through the round.
//
// Used by: App.jsx, above every screen.
// Why it exists as its own component: every screen shares it, so it lives in
// one place. It receives the current route and progress from App rather than
// working them out itself, which keeps it a pure piece of display.

import ProgressTicks from '../ProgressTicks/ProgressTicks.jsx'
import './Header.css'

const TABS = [
  { route: 'sort', label: 'Sort by movement' },
  { route: 'identify', label: 'Identify' },
]

export default function Header({ route, progress }) {
  return (
    <header className="site-header glass">
      <a className="site-header__wordmark" href="#/sort">
        Art History Study
      </a>

      <nav className="site-header__tabs" aria-label="Study modes">
        {TABS.map((tab) => (
          <a
            key={tab.route}
            href={`#/${tab.route}`}
            className="site-header__tab"
            aria-current={route === tab.route ? 'page' : undefined}
          >
            {tab.label}
          </a>
        ))}
      </nav>

      {progress && (
        <div className="site-header__progress">
          {/* Announced politely to screen readers each time it changes */}
          <span aria-live="polite">
            Painting {progress.position} of {progress.total}
          </span>
          <ProgressTicks position={progress.position} total={progress.total} />
        </div>
      )}
    </header>
  )
}
