# Reference photo booth — React Three Fiber

## Updated DNP V2 anatomy experience

The page now opens with a staged wireframe-to-solid formation. Eleven independently inspectable assemblies cover the exterior, camera, upper photo display, lower advertising/instructional display, printer, tray, mini PC, power distribution, cooling fans and base. `Build from wireframe` replays formation; `Inside the booth` removes the cabinet skins and vent covers. `Explode` separates all assemblies, and `Assemble` restores the cabinet.

The upper display shows the same bundled portrait used by the simulated print and a real QR code linking to `/sample-portrait.jpg` on the current origin. The lower display retains its advertising/instruction content during capture. The demo link beneath the viewer opens the same asset. This does not implement live capture, photo uploads, unique sessions, real printer drivers or production QR delivery. A phone cannot reach a server bound to localhost; deploy to a reachable host for cross-device QR testing.

The printer selector supports illustrative DS-RX1HS and DS620 configurations. Both use the conceptual roll/ribbon/thermal-head mechanism; the compact option changes its envelope, not a manufacturer CAD model. Printer type references: [DNP DS-RX1HS](https://www.dnpphoto.com/products/printers/rx1hs) and [DNP comparison](https://www.dnpphoto.com/dnp-ds620a-vs-ds-rx1hs). Exact internal dimensions, circuit protection, connector types and mounting positions need hardware drawings before fabrication.

Keyboard: B builds, I opens the cutaway, E explodes, Escape clears inspection, and +/- zooms while the viewer is focused. Reduced motion immediately resolves formation and printing without flash, moving data pulses or fan rotation. Rendering pauses offscreen.

The anatomy skill's physical-detail, staged-motion and inspection principles are adapted to the existing Three.js renderer. Native depth testing replaces SVG painter sorting. Browser captures are in `output/playwright/`; the model tests include formation ordering and completion.

The earlier implementation notes below describe the original eight-assembly version; this section supersedes their assembly count, screen roles and startup behavior.

A self-contained Next.js project and reusable client component. The scene starts assembled on white, with 360° orbit, zoom, eight component groups, inspection highlights, reversible explosion, and a camera / screen / roller / paper sequence.

## Run

Requires Node.js 20.19+ and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Production: `npm run build`, then `npm start`.

## Add to an existing Next.js App Router project

1. Install the dependencies listed in `package.json`: `three`, `@react-three/fiber`, `@react-three/drei`, and matching React/type dependencies.
2. Copy `components/PhotoBooth.tsx`, `components/geometry.ts`, and `components/model.ts` into your project.
3. Copy `public/sample-portrait.jpg` to your public directory. For a base-path deployment, adjust its URL in `geometry.ts`.
4. Copy the `.booth*`, `.component-label`, `.fallback`, and `.sr-only` styles from `app/globals.css`. The global `main`, `html`, and `body` styles are only for this demo page.
5. Import the client component:

```tsx
import PhotoBooth from '@/components/PhotoBooth';

export default function Page() {
  return <PhotoBooth style={{ width: '100%' }} />;
}
```

The component accepts optional `className` and `style`. It needs a WebGL2-capable browser. No CDN, API key, webcam access, uploads, or external requests are used at runtime.

## Controls

- **Explore:** stop the automatic sequence and freely drag around the model.
- **Explode / Assemble:** separate or return all eight assemblies.
- **Print Photo:** assemble first, activate the camera, flash, show the preview and feed a four-frame strip onto the tray.
- **Replay:** assembled → exploded → hold → assembled → capture → print.
- **Inspect component:** smoothly focus a group and highlight it. Selecting the internal printer also opens the model. Meshes can be clicked directly; click empty space to clear selection.
- Drag to rotate; pinch / wheel / ± buttons to zoom. Keyboard Tab reaches every control, +/− zoom the focused stage, and Escape returns to Explore.

Reduced motion skips the animated demonstration and flash. Rendering pauses offscreen and becomes demand-driven while idle. A WebGL fallback message is included.

## Reference and scope

The exterior was reconstructed from the user-supplied single reference image. Its proportions and major features are reproduced, including the camera's LOOK HERE fascia, lower head display, inclined touchscreen, offset tray, twin vent panels and projecting toe plate. Height is normalized to about 2.05 units. Actual dimensions were not supplied. Hidden mechanisms, rear/left details and mounting hardware are inferred; this is a product visualization, not manufacturing CAD or a collision-certified assembly simulation.

The internal printer is an illustrative roll-fed mechanism. The demo prints a bundled sample portrait with four crop variants; it does not access a real camera or printer. Replace the local photo to customize it. Contact shadow uses a baked soft studio footprint for predictable performance; metal surfaces use environment reflections and direct lighting.

## Asset attribution

Sample portrait: [Unsplash sample portrait](https://images.unsplash.com/photo-1500648767791-00dcc994a43e), distributed under the [Unsplash License](https://unsplash.com/license). Local source: `public/sample-portrait.jpg`. It illustrates a simulated capture and is not the user's photograph.

## Validation

```sh
npm run typecheck
npm test
npm run build
```

`tests/model.test.ts` checks assembly IDs, continuous bounded feed, flash/preview ordering, and tour sequencing. Geometry and detailed design decisions are documented in `DESIGN.md`.
