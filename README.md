# GSV ASCII Animator

Turn any ASCII art into a glowing, self-assembling animation — then export it as a GIF. Zero dependencies, no build step, works fully offline.

![demo](demo.gif)

The characters scatter in from a wind direction of your choice and assemble into the source art, over a faint drifting starfield. Built in the style of the [GSV](https://github.com/deathbyknowledge/gsv) project.

## Try it

- **The demo:** open [`index.html`](index.html) — a small, readable, zero-dependency page that drives the engine with plain DOM controls. Fully offline; just double-click it.
- **No setup, full UI:** open [`standalone.html`](standalone.html) — a single self-contained file with the richer UI. (It pulls React from a CDN on first load, so it needs a network connection once.)

> The font ([Departure Mono](https://departuremono.com)) is embedded in `gsv-ascii.js` as base64, so the engine and the `index.html` demo render with no external requests at all.

## Use the engine in your own page

`gsv-ascii.js` exposes a single global, `GSVAscii`. Drop the file in and go:

```html
<div id="stage"></div>
<script src="gsv-ascii.js"></script>
<script>
  const art = [
    "  .---.  ",
    " | o o | ",
    " |  ^  | ",
    "  \\ '-'/ ",
    "   '-'   ",
  ].join("\n");

  const anim = GSVAscii.mount(document.getElementById("stage"), art, {
    accentColor: "#8071dd",
    fontSize: 16,
    wind: "right",
  });

  // later: anim.replay(); anim.setOptions({ wind: "scatter" }); anim.destroy();
</script>
```

### `GSVAscii.mount(el, asciiText, opts)` → handle

Renders the assemble animation into `el` and loops it. Returns a handle:

| method | description |
| --- | --- |
| `replay()` | restart the assemble animation |
| `setOptions(patch)` | re-mount with merged options |
| `destroy()` | stop the animation and clear the timer |

### `GSVAscii.exportGIF(asciiText, opts, gifOpts)` → `Promise<Blob>`

Renders one full assemble-and-hold cycle to an animated GIF (GIF89a, encoded in-browser — no workers, no server). Resolves to an `image/gif` `Blob`.

```js
const blob = await GSVAscii.exportGIF(art, opts, {
  fps: 16,
  maxWidth: 520,
  onProgress: (p) => console.log(Math.round(p * 100) + "%"),
});
const url = URL.createObjectURL(blob);
```

### Options

| `opts` | default | notes |
| --- | --- | --- |
| `accentColor` | `'#8071dd'` | glyph color |
| `background` | `'#0a0713'` | used by the GIF exporter |
| `fontSize` | `8` | px |
| `wind` | `'right'` | `'right'`, `'left'`, `'up'`, `'down'`, or `'scatter'` |
| `assembleSeconds` | `1.7` | time to assemble |
| `holdSeconds` | `1.6` | time the formed art holds before looping |
| `loop` | `true` | — |
| `starfield` | `true` | drifting background stars |
| `glow` | `true` | text-shadow glow on glyphs |
| `seed` | `7` | deterministic particle layout |

| `gifOpts` | default | notes |
| --- | --- | --- |
| `fps` | `16` | — |
| `maxWidth` | `520` | scales the font down to fit |
| `frames` | auto | overrides the computed frame count |
| `onProgress` | — | `(0..1) => void` |

Also available: `GSVAscii.parse(text)` → `{ rows, cells, pw, ph }`, `GSVAscii.ensureFont()`, and `GSVAscii.WINDS`.

## Generating ASCII from an image

Paste ASCII from any source. To convert an image, try an [image-to-ASCII generator](https://ascii-art-generator.org) and paste the result into the **Source ASCII** box.

## License

[MIT](LICENSE) © jess-cat. The embedded [Departure Mono](https://departuremono.com) font is by Helena Zhang, distributed under its own free license.
