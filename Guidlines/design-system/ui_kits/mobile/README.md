# tandemclub — Mobile App UI kit

The member-facing phone app: **where students find their people.** An
interactive, warm-Impressionist recreation of the core discovery flow, composed
entirely from the design-system primitives.

## What's here
- `index.html` — a clickable phone: **Home** (streak bar + "Sign ups for you"
  shelf + this-week grid) → tap a trip → **Trip detail** (painterly hero, lead
  card, who's-going, RSVP). Bottom tab bar (Home / My Trips / Plan / Crews).

## Source of truth
Recreated from `tandemclub/apps/mobile/Prototypes/Wireframe 0.4/` (greyscale flow
wireframe), re-skinned into the Golden Hour palette. Layout, spacing, and copy
mirror the wireframe; only color/type/imagery are new.

## Components used
Button, Chip, Tag, Card, ListRow, Avatar, AvatarStack, Segment, TripCard,
StreakBar, PhotoFrame, Mascot (via StreakBar).

## To extend
Onboarding (name → experience → photos → bio), Archives (masonry board),
Activity screen, and the Plan → publish → crew-chat flow are all specced in the
wireframe README and are the natural next screens.
