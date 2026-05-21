# Plan: Fix click-to-edit focus & outline gaps in the Optimizely visual editor

## Context

Live preview is working — page reloads on autosave, content updates flow through `/preview`. But in the visual editor, **clicking a rendered element does not focus the corresponding property in the side panel, and hovering does not expand the outline** over the element being edited.

This focus + outline behavior is driven by `getPreviewUtils(content)` → `pa(property)`, which emits `data-epi-property-name` / `data-epi-block-id` attributes that the CMS edit chrome reads. Without those attributes on the right elements, the editor can't map DOM → property.

**Reference**: `docs/7-live-preview.md` (live preview), `docs/8-experience.md` (composition / `pa(node)`).
**SDK signature** (`node_modules/@optimizely/cms-sdk/dist/esm/react/server.d.ts:97-110`):
```ts
pa(property?: string | { key: string }): { 'data-epi-property-name': string } | { 'data-epi-block-id': string } | {}
```

## Root cause

`components/HeroSlideItem.tsx` accepts `content: ContentProps<typeof HeroSlideItem>` (line 13) but **never calls `getPreviewUtils()` and never spreads `pa()` on any element**. The schema (`cms/content-types/HeroSlideItem.ts`) defines four editable properties — `overrideTitle`, `overrideTeaser`, `overrideCtaLabel`, `overlayOpacity` — none of which are wired for focus/outline. When an editor opens a Hero Slide in preview, no element on screen tells the CMS which DOM region corresponds to which property.

## Verified non-issues (do not change)

To save time on red herrings the earlier sweep raised:

- `components/OmniLandingPage.tsx:15` — `<div {...pa(node)}>` is the **documented** composition wrapper pattern (`docs/8-experience.md:53-55, 110-112, 334-336`). The SDK accepts `{ key }` objects. **Leave as-is.**
- `components/OfferCardFeatured.tsx:117` and `OfferCardStandard.tsx:101` — `{...pa('overrideCtaLabel')}` on `<a>` is fine; same pattern as the headline/teaser wrappers in the same file. **Leave as-is.**
- `components/RestaurantDetail.tsx:26` — the wrapper has `inset-0` filling a `h-[70vh]` parent, so the outline draws on the correct region. **Leave as-is.**
- All other `pa('X')` strings audited match their schema property keys exactly (case-correct).

## The fix

### `components/HeroSlideItem.tsx`

Add the SDK preview import, derive `pa` from the optional `content`, and spread on the three string-override elements.

Pattern to follow (from `components/OfferCardFeatured.tsx:3,15,62,72,87,90,117`):

1. Add import:
   ```ts
   import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
   ```

2. Inside the component body, after `derived = content ? deriveFromContent(content) : null;`, derive a `pa` that no-ops when `content` is absent:
   ```ts
   const { pa } = content
     ? getPreviewUtils(content)
     : { pa: (() => ({})) as ReturnType<typeof getPreviewUtils>['pa'] };
   ```

3. Spread `pa()` on the three editable text elements:
   - `<h1 {...pa('overrideTitle')} …>{resolvedHeading}</h1>` (line 77)
   - `<p {...pa('overrideTeaser')} …>{resolvedDescription}</p>` (line 80)
   - `<Link {...pa('overrideCtaLabel')} href={resolvedButtonLink} …>{resolvedButtonText}</Link>` (line 85)

   `overlayOpacity` is a number (no visual surface of its own — it modulates the overlay div); skipping `pa()` for it is acceptable since the editor will still focus it from the side panel.

   `targetOffer` is a content reference, not a directly-editable field on this slide — no `pa()` needed; child rendering handles the offer's own properties.

### No other component changes

The other components either correctly use `pa()` already or fall under the verified-non-issues list above. If, after this fix, specific other elements still fail to focus in the editor, treat them as separate follow-ups with concrete repro.

## Files modified

- `components/HeroSlideItem.tsx` — single file edit (one import, one helper line, three `{...pa(...)}` spreads).

## Verification

1. Run the dev server: `npm run dev` (or whichever script `package.json` defines).
2. In the CMS, open a page that contains a `HeroCarousel` whose slides are `HeroSlideItem` instances with `Override Title` / `Override Teaser` / `Override CTA Label` set.
3. Hover the slide's heading in the preview frame → outline should draw around the `<h1>`; the editor side panel should highlight `Override Title`.
4. Click the heading → editor focuses the `Override Title` field.
5. Repeat for teaser and CTA label.
6. Confirm `<OfferCardFeatured>` / `<OfferCardStandard>` / `<RestaurantDetail>` still focus correctly (regression check on the non-issue list above).
