# Reference reconstruction

## DNP V2 revision

The supplied `PHOTO BOOTH - DNP OUTER.PDF` is used as the exterior reference: separate upper camera/display head, inclined lower screen, service door, offset output tray, twin side vents and projecting base. It supplies no usable internal layout. Internal hardware and cabinet height remain inferred. The user's explicit wireframe formation and reference-matching requirements take precedence over the anatomy skill's general avoidance of wireframes and copied objects.

The scene preserves the existing Three.js geometry approach and expands the assembly model from eight to eleven groups. The new assemblies are a finned mini PC with display/USB ports and an interface board; power supply with terminal blocks, distribution rail and branch protection; and two fans with seven blades, hubs, housings and four fasteners apiece. Existing rails and a shelf remain visible when the outer cabinet skins are hidden. Data and power harnesses connect the PC, screens, camera, printer and fans; their endpoints interpolate with the separated assemblies. These cables show system relationships rather than an installation wiring schematic.

Formation starts with all assembly edge geometry visible. Base, power, print engine, PC, fans, tray, camera, photo display, advertising display, vents and outer enclosure resolve to solid materials in that order. The pure `formationAt` model drives opacity and removes the edge overlay as each assembly finishes. Reduced motion skips directly to the settled pose. Fan and signal animation pauses offscreen and under reduced motion. Selection/formation/printing use one shared motion object; React updates only phase readouts and formation percentage, while Three.js refs drive animation.

Screen content is independent: the upper screen displays the photo and sample-photo QR; the lower screen displays branding and instructions. The DS-RX1HS/DS620 selector changes the illustrative mechanism envelope. It does not assert model-specific internal engineering or real print timing.

The kiosk retains the supplied image's tall curved side walls, round-corner upper rim, inset lower display, camera above the display, inclined control face, inset front door, left auxiliary slot, offset right photo tray, double right-side vent grilles and low projecting toe plate. Front is +Z, right is +X, up is +Y. Assumed height is 2.05 world units; proportions are inferred, not measured. Back, left side and internal printer are plausible mechanical reconstructions because the source provides one exterior view. No manufacturing or dimensional accuracy is claimed.

Eight assemblies move on reversible translation paths. The printer is carried on its own cradle; screens, fasteners and trim move with their parent assembly. The user controls explosion, assembly, camera orbit, selection, zoom and a one-shot sequence. Printing uses one shared timeline for flash, screen preview, feed and roller motion. The paper enters through a real aperture, follows a curved path and stays supported by the tray.

## Parts plan, before geometry

- Base: folded toe plate, undertray, rear flange, four rubber feet, four foot stems, four mounting screws, two longitudinal channels (17).
- Enclosure: two curved side shells, rear lower sheet, rear upper sheet, two vertical rails, two crossbars, front door frame, four aperture-surround door pieces, auxiliary-slot bezel, auxiliary slot, lock escutcheon, keyway, two hinges, two latches, eight panel screws (29).
- Head: outer rounded metal frame, inner gasket, rear shell, inset fascia, top dark header, display bezel, glass, lower support brackets, eight rim screws, top vent louvres, camera mounting cutout (24+).
- Camera: carrier, sensor board, four board standoffs, four screws, lens barrel, focus ring, front lens, optical highlight, activity LED, flash diffuser (15).
- Touchscreen: inclined aluminium deck, dark perimeter gasket, glass, four corner screws, rear cover, two mounting brackets (10).
- Printer: folded cradle, two slide rails, four mounts, four mounting screws, paper spool, spool spindle, two spool hubs, drive motor, motor shaft, three feed rollers, six bearing caps, print head, head carriage, output guide, controller board, four board mounts, ribbon supply and return spindles, two ribbon drums (35).
- Tray: support plate, two side returns, upturned lip, two attachment bolts (6).
- Vents: two perforated grilles, two frames, eight screws, diagonal bracing and fan hubs behind both grilles (18+).

The implementation retains the existing Three.js renderer with native depth testing and physical materials, adapting Anatomy's craft and motion principles. SVG-specific painter-order and line-end audits do not apply. Validation covers the model timeline, TypeScript, production compilation and browser renders/interactions.
