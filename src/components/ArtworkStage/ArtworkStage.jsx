// Artwork stage: the painting hung on the wall, with the gallery light above.
//
// Used by: the Sort screen (and later Identify and Challenge).
// Why it exists as its own component: everything around the painting (light,
// shadow, and in M2 the corner marks, ambient glow, and zoom) belongs together
// and must follow one rule from DESIGN.md: nothing is ever drawn on the
// painting itself. Keeping it all here makes that rule easy to see and keep.

import { paintingImage } from '../../lib/images.js'
import './ArtworkStage.css'

export default function ArtworkStage({ painting }) {
  const image = paintingImage(painting)
  return (
    <div className="artwork-stage">
      {/* Gallery spotlight: light from above tells the eye "this is the object
          on display" before any text is read (DESIGN.md section 5.2) */}
      <div className="artwork-stage__spot" aria-hidden="true" />
      {/* key: a new painting is a new element, so its arrival animation plays */}
      <img
        key={painting.id}
        className="artwork-stage__painting"
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  )
}
