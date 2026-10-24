// Next button: the solid ink button that moves the student forward.
//
// Used by: the Sort screen (and later Identify and the review screens).
// Why it exists as its own component: it is the single strongest call to
// action on any screen, so it should look and behave identically everywhere,
// including its gold arrow.

import './NextButton.css'

export default function NextButton({ children, onClick }) {
  return (
    <button type="button" className="next-button" onClick={onClick}>
      {children}
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 9h11M10 4.5L14.5 9 10 13.5" />
      </svg>
    </button>
  )
}
