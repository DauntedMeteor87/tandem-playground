# Figma → code workflow (mobile)

How a screen goes from **Figma** to a working **React Native** component under
`apps/mobile/`, and stays linked both ways with **Code Connect**. Written so a
non-coder can drive it: you design in Figma, Claude Code does the translation.

The proof this works is [apps/mobile/components/SmileyFace.tsx](../../apps/mobile/components/SmileyFace.tsx) —
a direct translation of the "Smiley Test" frame in the **Tandemclub1.0** Figma file.

---

## The short version

1. **Design or edit** the screen/component in Figma (Tandemclub1.0 file).
2. **Copy its link:** right-click the frame → *Copy link to selection*.
3. **Paste it to Claude Code** with the prompt below. Claude reads the design
   (layout, colors, text) and writes a React Native component into `apps/mobile/`.
4. **Map it** so Figma and code know they're the same thing (Code Connect).
5. **Changed the design later?** Paste the same link again — Claude updates the
   component instead of rebuilding it.

You never edit code by hand. Figma is where you make changes; Claude keeps
`apps/mobile/` in sync.

---

## Copy-paste prompts

### Bring a new Figma screen/component into code

> Translate this Figma frame into a React Native component under `apps/mobile/`:
> **<paste Figma link>**
>
> - Use the Figma MCP (`get_design_context`, `get_screenshot`, `get_variable_defs`)
>   to read the real layout, text, and design tokens — don't guess.
> - Follow [design-language.md](brand/design-language.md): warm, painterly, Impressionist.
> - Put it in `apps/mobile/components/<Name>/<Name>.tsx`, strongly typed, with a
>   short comment saying which Figma frame it came from.
> - Then create the Code Connect map so Figma and this component are linked.

### Update a component after a Figma edit

> The Figma design changed. Re-read **<paste Figma link>** with the Figma MCP and
> update the existing component in `apps/mobile/` to match. Change only what the
> design changed — don't rewrite working code. Keep the Code Connect map current.

---

## Conventions (so Code Connect stays reliable)

- **One Figma frame = one component.** Screens are built by composing components.
- **Where things live:** `apps/mobile/components/<Name>/<Name>.tsx`. A mapped
  component gets a sibling `<Name>.figma.ts` once we're on full Code Connect (below).
- **Use design tokens, not hardcoded colors.** Pull values with `get_variable_defs`.
  (SmileyFace hardcodes `#FFD133` because tokens didn't exist yet — replace those
  with variables as the Figma design system fills in.)
- **Plain-English names** that match the Figma layer name, so it's obvious which
  frame a file came from.

---

## The two-way link: Code Connect, in two stages

We're on **Stage 1** now because `apps/mobile` isn't an npm project yet.

### Stage 1 — MCP map (works today, no setup)

Claude uses the Figma MCP tools `add_code_connect_map` / `get_code_connect_map`
to record "this Figma node ↔ this code component." That makes every future
`get_design_context` call return *our* component instead of generic code — so
translations stay consistent and edits land in the right file. Nothing to install.

Ask for it with: *"Add the Code Connect map for this frame and component."*

### Stage 2 — Full Code Connect (once the app is scaffolded)

When `apps/mobile` becomes a real Expo project (has `package.json`), we add the
`@figma/code-connect` package and a `<Name>.figma.ts` file per component, then
publish with `figma connect publish`. That pushes the real code snippet into
**Figma Dev Mode**, so anyone opening the design sees the actual `<SmileyFace />`
usage. This is the full two-way loop. See the `/figma-code-connect` skill.

A `<Name>.figma.ts` looks like:

```ts
import figma from '@figma/code-connect'
import { SmileyFace } from './SmileyFace'

figma.connect(
  SmileyFace,
  'https://www.figma.com/design/<fileKey>/Tandemclub1.0?node-id=<node-id>',
  {
    props: { size: figma.number('Size') },
    example: ({ size }) => <SmileyFace size={size} />,
  },
)
```

---

## What Claude uses under the hood (reference)

- **Read a design → code:** `get_design_context`, `get_screenshot`, `get_metadata`.
- **Design tokens/variables:** `get_variable_defs`.
- **Two-way mapping:** `get_code_connect_map`, `add_code_connect_map`,
  `get_code_connect_suggestions`.
- **Skills:** `/figma-code-connect` (mapping files), `/figma-generate-design`
  (whole pages), `/figma-use` (required before any write back into Figma).

Prerequisite: the Figma desktop app / MCP must be connected (it is), and you need
edit access to the Tandemclub1.0 file.
