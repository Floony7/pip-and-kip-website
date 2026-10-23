# Image delivery

Keep original artwork and photos in `src/img`. Pages and components should import
local images as metadata and render them with `Image` from `astro:assets`, rather
than using `<img src={image.src}>`. Astro produces compressed WebP files during
`npm run build`; the original full-resolution file is not used as the image URL.

`ProductCard.astro` handles responsive product images automatically. When adding
an entry to `featuredTeasers`, pass the imported image as `imgPath` (not its `.src`).
Images that are not referenced by the site are not downloaded by visitors.

Keep `sizes` aligned with the grid breakpoints in `src/styles/global.css` when
changing the layout. The `widths` arrays include larger variants for high-density
screens. The hero loads eagerly with high priority; lower-page photos load lazily.
The logo uses higher quality to retain sharp edges and transparency.

Validate changes with `npm run build` and inspect the generated HTML for WebP
`src` URLs, `srcset`, `sizes`, and intrinsic dimensions. Check both mobile and
desktop layouts after changing image proportions or CSS.
