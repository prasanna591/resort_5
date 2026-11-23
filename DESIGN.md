---
name: PSM Resort
description: A field-journal visual system for a fictional alpine mountain house.
colors:
  paper: "#ede7db"
  paper-deep: "#e2d9c9"
  paper-light: "#f3eee5"
  ink: "#1b211e"
  moss: "#4a5a4c"
  rust: "#a45436"
  night: "#26342a"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Karla, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Karla, Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    letterSpacing: "0.18em"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "120px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-light}"
    padding: "10px 16px"
    typography: "Karla, 11px uppercase, 0.14em tracking"
  button-primary-hover:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.paper-light}"
    padding: "10px 16px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "7px 0"
---

# Design System: PSM Resort

## Overview

**Creative North Star: "The Alpine Field Journal"**

An uncoated-paper world built around the rituals of a small mountain house. The page reads as a bound record of a place: folio labels, plate numbers, hairline rules, and photographs tipped in with printed margins. It is quiet but not timid — scale does the work where ornament would.

The palette is drawn from paper, ink, moss, and a single rust reserved for numbers, live state, and emphasis. Depth comes from paper layers and photography, never from floating cards. Motion is authored sparingly and settles into stillness.

**Key Characteristics:**
- Paper-first surfaces with hairline rules and generous margins
- Oversized display serif contrasted with tiny tracked labels
- Photographs presented as numbered plates with captions
- One rust accent used as a signal, never as decoration
- Flat surfaces; depth from layering and scale

## Colors

Paper neutrals carry the surface; moss and ink carry structure; rust marks things worth noticing.

### Primary
- **Ink Green-Black** (#1b211e): primary text, dark sections, primary buttons.

### Secondary
- **Moss Green** (#4a5a4c): captions, secondary text, quiet rules, the bathhouse field.
- **Rust Red** (#a45436): plate numbers, folio numbers, current nav state, focus rings, errors.

### Tertiary
- **Night Moss** (#26342a): the reservation page ground, tinted by a faint winter photograph.

### Neutral
- **Uncoated Paper** (#ede7db): default page ground.
- **Deep Paper** (#e2d9c9): recessed panels and field-notes section.
- **Light Paper** (#f3eee5): text on dark grounds.

**The Rust Is a Signal Rule.** Rust appears on numbers, current state, and action only. It never fills a large field.

## Typography

**Display Font:** Gloock (self-hosted TTF, Georgia fallback)
**Body Font:** Karla (self-hosted TTF, Arial fallback)

**Character:** Gloock is sharp and high-contrast at large sizes; Karla adds a slightly human, editorial cadence at small sizes. The pairing feels like a printed journal, not a hotel brochure.

### Hierarchy
- **Display** (400, clamp(2.5rem, 5.6vw, 5rem), 1.03, -0.035em): page statements and section openers.
- **Title** (400, clamp(1.75rem, 3.2vw, 3.25rem), 1.05): room and note names.
- **Body** (400, 1rem, 1.6, max 56ch): narrative copy.
- **Label** (400, 0.625rem, 0.18em, uppercase): folios, plate captions, nav, form labels.

**The Label Whisper Rule.** Labels stay below 12px and widely tracked; headings carry the volume.

## Layout

A 39/61 paper-to-photograph hero gives way to a single editorial measure of roughly 1500px. Section padding scales from 70px on small screens to 180px on desktop. Rooms use a 53/47 image-to-text grid that collapses to one column below 860px. The table and bath sections invert the rhythm with dark and light fields. Breakpoints: 1180px, 860px, 600px.

## Elevation & Depth

Flat by default. Hairlines and tonal paper shifts separate surfaces. The only shadows are a soft offset shadow on the circular bath seal and a subtle top-bar blur; no floating card shadows.

## Shapes

Almost entirely square. The exceptions are the notched tab-rail index, a circular stamped seal in the bath section, and the clipped reveal on room rows. Borders are 1px hairlines; no rounded cards.

## Components

### Buttons
- **Shape:** square corners, 1px border.
- **Primary:** ink ground, light paper text, uppercase 11px labels.
- **Hover / Focus:** rust ground; 2px rust focus ring with 4px offset.

### Fields
- **Style:** no box, no radius, 1px bottom hairline, transparent ground.
- **Focus:** border shifts to rust.
- **Invalid:** rust bottom border via `:user-invalid`.

### Plate
- **Style:** numbered photograph with a 4:3 or portrait frame and a hairline caption row.
- **State:** reveals with a slight scale-and-rise; room plates reveal through the parent row's clip.

### Tab Rail
- **Style:** notched paper tabs over the hero photograph.
- **State:** current tab turns rust with white text; mobile converts to a horizontal scroll strip.

### Reservation Form
- **Style:** two-column hairline fields on the dark night-moss ground, rust labels.
- **State:** success panel replaces the form after a clearly labelled illustrative submission.

## Do's and Don'ts

### Do:
- **Do** keep the rust accent to signals and numbers.
- **Do** present imagery with plate numbers and captions.
- **Do** keep all paper surfaces flat and separated by hairlines.
- **Do** use self-hosted Gloock and Karla only.

### Don't:
- **Don't** add rounded cards, gradients, or glass panels.
- **Don't** use a centred hero over a row of equal amenity cards.
- **Don't** label illustrative prices or availability as real.
- **Don't** copy imagery or branding from an existing hotel site.
