# Prompt: Redesign ZHIZHA Into A Creator-First Background Generator

Use this prompt as the implementation brief for an AI coding agent. The product and UI are Russian-first, but the technical brief is written in English so implementation agents follow it reliably. Preserve Russian labels, Russian product language, and the creator-first positioning throughout the app.

You are implementing the next version of **ZHIZHA**.

ZHIZHA is currently a single-file WebGL procedural background generator in `index.html`, with an optional embed helper in `embed/`. The product is intentionally built through vibe coding: keep the implementation direct, expressive, fast to iterate, and self-contained. Do not over-engineer it.

## Product Direction

Reposition ZHIZHA from a technical procedural background tool into a **fast background generator for creators**.

The primary users are:

- TikTok, Reels, Shorts, and Stories creators.
- Video editors and montage makers.
- Bloggers and social media managers.
- People making covers, intros, outros, quote backgrounds, graphic overlays, and visual backdrops.

Their core pain:

> "I need a beautiful moving or static background for a video, story, cover, or graphic. I do not want to search stock libraries for ages or build it manually in a complex editor."

The new first-run experience should feel familiar to people who use tools like CapCut, Lightroom, mobile photo editors, and simple video editors:

1. Choose what the background is for.
2. Pick a good-looking template.
3. Quickly adjust color, speed, movement, and style.
4. Download it as PNG or video.

Developer/export-for-site features are still valuable, but they are secondary. Keep iframe, embed code, FLUID import, tileable patterns, and advanced procedural controls, but move them away from the main first screen.

## Current Project Constraints

- Keep the project dependency-light and static.
- Preserve the existing WebGL/Three.js shader engine unless there is a clear reason to change it.
- Preserve existing capabilities:
  - PNG export.
  - Video recording.
  - Scene URL sharing.
  - FLUID link import.
  - Embed mode.
  - `embed/fluid-bg.js`.
  - Advanced field/surface/palette controls.
- Do not introduce a backend, accounts, auth, database, build step, or npm app shell for this iteration.
- This should still work as a static page from GitHub Pages or a simple local server.

## New UX Model

The app should be reorganized around a creator workflow.

### First Screen

The first screen should show:

- A large live preview of the background.
- A clear creator-oriented format/category picker.
- Fast template selection.
- Fast adjustment controls.
- Obvious download/export actions.

The user should not first encounter technical labels like field, warp, GLSL, embed, iframe, or surface. Those can exist in an advanced/pro mode.

### Layout

Desktop:

- Center or right: large preview canvas.
- Left or right side panel: workflow controls.
- Bottom or side strip: template cards/thumbnails if practical.

Mobile:

- Preview on top.
- Controls below, similar to CapCut/Lightroom style.
- Category/template/settings sections should be easy to tap.
- Avoid making users scroll through a long technical settings panel before they can export.

### Main Workflow

Design the main flow as:

```text
Use case/category -> template -> quick tune -> export
```

Example:

```text
TikTok -> Neon Pulse -> adjust colors/speed -> download 9:16 video
```

## Creator Categories

Add a creator-oriented category layer. Suggested categories:

- `TikTok / Reels`
- `Stories`
- `YouTube`
- `Фон под текст`
- `Обложка`
- `Презентация`
- `Паттерн`
- `Абстрактный луп`

Each category should imply sensible defaults:

- TikTok / Reels: `9:16`, motion-first, video export prominent.
- Stories: `9:16`, clean background, good contrast for text/stickers.
- YouTube: `16:9`, intro/outro and backdrop use cases.
- Фон под текст: lower contrast, readable center area, slower motion.
- Обложка: static PNG export prominent, strong composition.
- Презентация: `16:9`, calmer palettes.
- Паттерн: seamless/tileable mode prominent.
- Абстрактный луп: motion and experimental styles prominent.

Keep names and copy in Russian, matching the current product language.

## Template System

The existing presets are useful but too abstract for creators. Keep the procedural values, but present them through creator-friendly template cards.

Template cards should have names like:

- `Неоновый импульс`
- `Мягкий градиент`
- `Кислотный клип`
- `Спокойный фон под текст`
- `Тёмный техно`
- `Жидкий океан`
- `Хромированный свет`
- `Пульсирующая сетка`
- `Постерный шум`
- `Цифровая мандала`

Each template should apply a complete scene:

- ratio
- field
- palette
- surface
- speed
- scale
- warp
- grain
- pixel/halftone settings where relevant
- seamless mode where relevant

If possible in this iteration, show template previews. If real live previews are too heavy, use visually distinctive cards with gradient swatches and template metadata as a first pass. Do not let preview generation block the core workflow.

## Quick Controls

The primary controls should be creator-friendly:

- `Формат`
- `Шаблон`
- `Цвет`
- `Скорость`
- `Движение`
- `Детализация`
- `Эффект`
- `Экспорт`

Map these to existing technical state:

- `Скорость` -> `speed`
- `Движение` -> mostly `warp`, possibly field/preset intensity
- `Детализация` -> `scale`, `pixel`, or template-specific tuning
- `Цвет` -> palette and custom color stops
- `Эффект` -> surface mode, halftone, pixelate, ASCII, seamless/pattern mode

Keep advanced exact controls available under something like:

- `Профи`
- `Точная настройка`
- `Для сайта`

Advanced controls can include:

- field
- scale
- warp
- grain
- surface
- pixel
- halftone
- tile count
- share URL
- embed code
- FLUID import

## Export UX

Export should be one of the most visible areas.

Prioritize:

- `Скачать видео`
- `Скачать PNG`
- Platform preset exports:
  - TikTok/Reels `9:16`
  - Stories `9:16`
  - YouTube `16:9`
  - Post `4:5`
  - Square `1:1`

The current video recording behavior can remain manual start/stop if needed, but the UI should explain it in creator language. Avoid leading with browser/codec details unless recording is unavailable.

Developer export actions should move into a secondary section:

- `Для сайта`
- `Embed`
- `Скопировать iframe`
- `Скопировать <fluid-bg>`
- `Скопировать ссылку сцены`

## Future Library Direction

Do not build accounts or a real public catalog yet, but design the UI so it can grow toward:

- `Мои фоны`
- saved backgrounds
- public catalog
- popular backgrounds
- remixing other users' backgrounds

For now, it is acceptable to add a lightweight local-only save concept if it fits the implementation:

- Save scene to `localStorage`.
- Show saved scenes in a small `Мои фоны` section.
- Allow apply/delete/copy link.

This is optional for the first implementation pass. The creator-first workflow is more important.

## Future Creative Features To Leave Space For

Do not implement all of these now, but avoid UI decisions that would make them hard later:

- Text overlays.
- Simple shapes.
- Stickers/emoji.
- Grain/dust/light leaks.
- Safe zones for text.
- Animated overlays.
- Public template catalog.
- Remix from shared scenes.

The current iteration should remain a background generator, not a full CapCut clone.

## Content And Tone

Use Russian UI copy.

The product should feel:

- fast
- creative
- playful
- immediately useful
- not technical on first contact

Avoid verbose explanations inside the app. Use short labels and helpful microcopy only where it improves confidence.

Good examples:

- `Для чего нужен фон?`
- `Выбери стиль`
- `Быстрая настройка`
- `Скачать видео`
- `Скачать PNG`
- `Профи`
- `Для сайта`
- `Фон под текст`

Avoid first-screen labels like:

- `GLSL`
- `fragment shader`
- `field`
- `warp`
- `iframe`
- `domain distortion`

Those can appear in advanced sections or docs.

## Visual Direction

Keep the dark, glossy, liquid visual identity, but make the interface more like a familiar creator editor.

Important:

- Preview must be the hero of the app.
- Controls should feel like an editor, not a settings dump.
- Cards/buttons should be easy to scan.
- Mobile must feel natural, not like a desktop panel squeezed into a phone.
- Text must not overflow in buttons or cards.
- Avoid turning everything into nested cards.

## Implementation Guidance

The current code is mostly contained in `index.html`. It is acceptable to keep that architecture for this iteration.

Prefer:

- clear state objects for categories/templates
- small helper functions
- direct DOM rendering
- minimal abstractions
- no build tooling

Suggested data model:

```js
const CREATOR_CATEGORIES = [
  {
    id: 'tiktok',
    name: 'TikTok / Reels',
    ratio: '9:16',
    exportHint: 'Вертикальное видео',
    templates: [...]
  }
];
```

Templates can reuse existing preset values. Add metadata:

```js
{
  id: 'neon-pulse',
  name: 'Неоновый импульс',
  category: 'tiktok',
  mood: 'быстро / ярко',
  values: [...]
}
```

When a user selects a category:

- update ratio
- show relevant templates
- apply a good default template
- make the export action match the category

When a user selects a template:

- apply its full scene
- update quick controls
- keep the preview immediately responsive

## Keep / Move / Add

### Keep

- Current shader engine.
- Current presets as technical source material.
- Current export pipeline.
- Current URL state encoding.
- Current FLUID import.
- Current embed mode.
- Current performance optimizations.

### Move Lower

- Embed code.
- iframe.
- `<fluid-bg>`.
- FLUID import.
- Detailed field controls.
- Surface implementation details.

### Add Or Reframe

- Use-case categories.
- Creator-friendly template cards.
- Quick controls.
- Prominent video/PNG export.
- Advanced/pro section.
- Optional local saved scenes.

## Acceptance Criteria

The implementation is successful if:

1. A new user can understand within 5 seconds that ZHIZHA makes backgrounds for social/video content.
2. The first visible workflow is creator-oriented, not developer-oriented.
3. A user can create a TikTok/Reels background in under 30 seconds.
4. A user can quickly change colors and motion without touching technical controls.
5. PNG and video export remain functional.
6. Scene links still work.
7. FLUID import still works, even if moved into advanced/pro.
8. Embed mode still works.
9. The interface works on desktop and mobile.
10. Developer/site features are preserved but no longer dominate the first screen.

## Manual QA Checklist

After implementation, test:

- Open app fresh on desktop.
- Select `TikTok / Reels`; verify ratio changes to `9:16`.
- Select several templates; verify preview changes.
- Adjust color/speed/movement; verify preview updates.
- Download PNG.
- Record and download video if browser supports it.
- Copy scene link; open it in a new tab; verify the scene loads.
- Import an old FLUID `#p=` link; verify it still parses.
- Open with `embed=1`; verify controls are hidden and canvas fills the frame.
- Check mobile width around `390px`; verify preview and controls are usable.
- Check that advanced/dev features are discoverable but not first-screen dominant.

## Non-Goals For This Pass

Do not build:

- user accounts
- backend
- public database
- payment
- AI generation
- full text editor
- full sticker/emoji editor
- complex timeline
- multi-layer video editor

The goal is to make the current generator feel like a fast creator tool.

## Final Product Principle

ZHIZHA should feel like this:

> "I need a cool background for my video. I open ZHIZHA, pick TikTok, choose a vibe, tweak color and movement, and download. Done."
