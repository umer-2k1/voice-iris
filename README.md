# Iris

**An audio-reactive orb for voice interfaces, drawn in WebGL2.**

Iris is the presence indicator for a voice agent: it idles, opens when someone speaks, and ripples while it answers. No images, no avatar, no video — one shader surface that reacts to a real voice.

Built on *[Voice orb](https://github.com/imuvrays1/voice-orb)* by UV, MIT licensed. See [LICENSE](./LICENSE).

---

## What it does

- **It moves with a real voice.** Web Audio splits the signal into four calibrated bands; those bands stir a small GPU fluid, send rings through the colour, and light the rim.
- **Six states** for a voice agent — `dormant`, `ready`, `connecting`, `listening`, `talking`, `settled`.
- **Four looks** — `painted`, `glass`, `silk`, `halftone` — and five palettes, or four colours of your own.
- **Light to run.** Every orb on a page shares one WebGL2 context, draws only while on screen, and holds a still frame under reduced motion. No image assets, no dependencies beyond React.
- **Any audio.** The built-in sample, a file, a direct link, your microphone, or a voice SDK's `AnalyserNode` in a live call.

## Run it

```bash
git clone https://github.com/umer-2k1/voice-iris.git
cd voice-iris
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The page is the demo and the documentation in one place: change the audio source under the orb, tune the sliders, and copy the settings.

`pnpm build` makes a production build, `pnpm typecheck` runs TypeScript alone.

## Host your own copy

The live page is GitHub Pages, built by [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) on every push to `main`. In your copy, open **Settings → Pages**, set **Source** to **GitHub Actions**, and push. The page appears at `https://<you>.github.io/<repository>/` — the workflow derives `PAGES_BASE_PATH` from the repository name, so no edits are needed.

## Use it in your project

Copy these into your React app along with [`LICENSE`](./LICENSE), then point the orb at any audio.

| File | What it is |
| --- | --- |
| `src/components/VoiceOrb.tsx` | The component: states, easing, the drift and pulse clocks |
| `src/components/VoiceOrb.module.css` | Its box, and a still gradient where WebGL2 is missing |
| `src/lib/orb/renderer.ts` | One hidden WebGL2 context draws every orb and copies each frame into that orb's canvas. Browsers drop contexts past about sixteen, so one context per orb would break a page of them |
| `src/lib/orb/shaders.ts` | GLSL ES 3.00: a shared prelude (noise, the sphere lens, the voice ripple, lights, grain) and one fragment shader per look |
| `src/lib/orb/fluid.ts` | The voice's liquid: a 128 × 128 stable-fluids simulation per talking orb, plus an offset field that carries the colour. Add `?flow` or `?flow=grid` to the address to see it |
| `src/lib/orb/audio.ts` | Web Audio: four self-calibrating bands, the microphone, this tab's audio, and a simulated voice |
| `src/data/orb.ts` | Types, palettes and defaults |

```tsx
import VoiceOrb from "@/components/VoiceOrb";
import { AnalyserLevels, analyserForElement } from "@/lib/orb/audio";

// Inside the click that starts playback — browsers allow audio only after a gesture:
const voice = new AnalyserLevels(analyserForElement(audioElement));

<VoiceOrb palette="twilight" state="talking" voice={voice} label="Assistant, speaking" />;
```

| Prop | Type | What it does |
| --- | --- | --- |
| `palette` | id or `[deep, mid, light, glint]` | `twilight`, `sunset`, `lagoon`, `forest`, `midnight`, or four colours |
| `variant` | string | `painted`, `glass`, `silk` or `halftone` |
| `state` | string | `dormant`, `ready`, `connecting`, `listening`, `talking` or `settled` |
| `voice` | `LevelSource` | The speaker, read while talking |
| `caller` | `LevelSource` | The person listening, usually the microphone, read while listening |
| `params` | `Partial<OrbParams>` | The look — what the page's **Copy settings** button gives you |
| `size` | CSS length | The orb is square. Defaults to `240px` |
| `label` | string | Names it for screen readers; without one it is decorative |

A live call works the same way: pass the agent's audio analyser as `voice` and the microphone's as `caller`, then set `state` from the call's events.

## Audio sources

| Source | How it is heard |
| --- | --- |
| Sample | A minute on how the orb works, read by a voice over a quiet pad |
| Your file | Choose or drop any file the browser plays. It stays on your device |
| Link | A direct audio link plays here if its host allows other pages to read it (CORS). A YouTube link plays in YouTube's own player, and the orb hears it by asking to share this tab's audio — Chrome and Edge on a computer; elsewhere the orb simulates a voice and says so |
| Microphone | The orb listens: it draws in, and your voice swirls its inside |

## Structure

```
src/
  app/            the demo page, panels and controls
  components/     VoiceOrb and the small UI pieces around it
  lib/orb/        renderer, shaders, fluid simulation, Web Audio
  data/orb.ts     types, palettes, defaults
  public/audio/   the sample clip
docs/journey.md   the build journal
```

## Credits

- The sample clip's voice was made with [ElevenLabs](https://elevenlabs.io); the pad under it was synthesised for this project. The clip is **not** MIT licensed — it is free-plan audio, non-commercial with credit. Replace it before any commercial use.
- The fonts are Inter, Inter Tight and Geist Mono, under the SIL Open Font License, loaded by `next/font`.
- The fluid follows Jos Stam's *Stable Fluids* (1999), as in GPU Gems, chapter 38.

## Licence

MIT — see [LICENSE](./LICENSE).
