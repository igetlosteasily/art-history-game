// Screen routing: reads the part of the web address after "#" to decide
// which screen to show.
//
// Used by: App.jsx, to pick the screen; the header's mode tabs are plain
// links to these addresses (href="#/identify").
// Why it exists as its own file, instead of a routing library: the app has
// only a few screens. The part of an address after "#" never goes to the
// server, so this works on Vercel with no extra settings, and the back button
// and bookmarks work for free. The whole mechanism fits on one screen.

import { useSyncExternalStore } from 'react'

export const ROUTES = ['sort', 'identify', 'review']
export const DEFAULT_ROUTE = 'sort'

// "#/identify" becomes "identify". Anything unknown falls back to Sort, so a
// mistyped or outdated link still lands somewhere sensible.
export function parseRoute(hash) {
  const name = hash.replace(/^#\/?/, '').split(/[/?]/)[0]
  return ROUTES.includes(name) ? name : DEFAULT_ROUTE
}

// React's way of reading a value that lives outside React (here, the
// address bar) and redrawing whenever it changes
function subscribe(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export function useHashRoute() {
  return useSyncExternalStore(subscribe, () => parseRoute(window.location.hash))
}
