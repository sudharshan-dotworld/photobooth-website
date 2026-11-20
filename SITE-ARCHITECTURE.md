# FunPhoto site structure

The app uses the existing Next.js App Router. The supplied setup document is adapted to this stack: route folders replace React Router configuration; shared site components and typed content stay separate from pages. No unrelated role routes or alternate color themes are included.

- `app/page.tsx`: landing page, preserving the particle hero.
- `app/products/[slug]`: shared product detail route with static params and per-product metadata.
- `app/software`, `app/features`, `app/pricing`, `app/contact`: product information and enquiry routes.
- `app/booth`: original interactive CAD assembly viewer.
- `components/site`: reusable sections, navigation/footer, image-led feature grid, and enquiry form.
- `lib/site-content.ts`: product, plan, and audience content from the supplied reference.
- `types/site.ts`: shared content interfaces.
- `public/landing`: artwork extracted from the supplied PDF.
- `app/site.css`: scoped marketing styles and black/pink design tokens; existing viewer styles remain in globals.css.

## Integration boundaries

The enquiry form validates required fields and creates a mailto draft for review; it does not submit to a server. No payment provider, mailing list, or downloadable installer is configured. Plan and software buttons therefore route to relevant enquiries. Prices and contact email follow the reference and must be confirmed before production launch. Sample photography comes from the supplied design.

## Checks

Run `npm run typecheck` and `npm run build`. Verify navigation, product URLs, feature image loading, contact preselection/validation, email draft generation, unknown routes, and mobile overflow in a browser.
