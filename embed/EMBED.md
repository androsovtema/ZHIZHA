# Фон ЖИЖА на вашем сайте

Живой фон рендерится на GPU посетителя — хостить нечего, бесплатно. Слой фиксированный,
во весь экран, позади контента и **не перехватывает клики**.

> Базовый адрес в примерах — `https://androsovtema.github.io/ZHIZHA/` (этот деплой на GitHub Pages).
> Если развернёте свою копию в другом месте — замените его на свой адрес.

Сцена в примерах — ваша «Гидрополе» (Гироид · Океан · pixelate+halftone · 16:9), закодирована
прямо в hash ссылки. Любую другую сцену соберите в редакторе → **«🔗 Ссылка на эту сцену»** или
**«&lt;/&gt; Код для встраивания»** и подставьте полученный URL вместо `src`.

`embed=1` в ссылке скрывает панель управления — остаётся только фон.

---

## Способ A — живой анимированный фон (рекомендуется)

### Вариант 1. Универсальный веб-компонент `<fluid-bg>` (работает где угодно)

Это нативный Custom Element — одинаково работает в чистом HTML, React, Vue, Svelte.
Добавляет статичный фоллбэк: если ЖИЖА вдруг офлайн, покажется картинка.

```html
<script src="https://androsovtema.github.io/ZHIZHA/embed/fluid-bg.js" defer></script>

<fluid-bg
  src="https://androsovtema.github.io/ZHIZHA/index.html#p=0.3,1.35,4.8,0.02,4,9,1,2,28,0,0,1.7778,0,1,3"
  fallback="https://androsovtema.github.io/ZHIZHA/assets/fluid-bg.jpg">
</fluid-bg>
```

`fallback` необязателен. `z` (z-index, по умолчанию `-1`) — если фон перекрывает контент,
поставьте контенту `position:relative; z-index:0`.

### Вариант 2. Чистый HTML/CSS (без скрипта)

```html
<div style="position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none">
  <iframe
    src="https://androsovtema.github.io/ZHIZHA/index.html#p=0.3,1.35,4.8,0.02,4,9,1,2,28,0,0,1.7778,0,1,3"
    title="Фон" loading="lazy" aria-hidden="true"
    style="width:100%;height:100%;border:0;display:block"></iframe>
</div>
```

### Вариант 3. React / Next.js

```jsx
// FluidBackground.jsx — компонент-обёртка над веб-компонентом
import { useEffect } from 'react';

const SCENE = '#p=0.3,1.35,4.8,0.02,4,9,1,2,28,0,0,1.7778,0,1,3';
const BASE  = 'https://androsovtema.github.io/ZHIZHA';

export default function FluidBackground({ fallback }) {
  useEffect(() => {
    // подгружаем определение веб-компонента один раз на клиенте
    if (!customElements.get('fluid-bg')) {
      const s = document.createElement('script');
      s.src = `${BASE}/embed/fluid-bg.js`; s.defer = true;
      document.head.appendChild(s);
    }
  }, []);
  return (
    <fluid-bg
      src={`${BASE}/index.html${SCENE}&embed=1`}
      fallback={fallback}
    />
  );
}
```

```jsx
// в layout/странице
<FluidBackground fallback="/assets/fluid-bg.jpg" />
```

> Next.js: для веб-компонента рендер на клиенте — `dynamic(() => import('./FluidBackground'), { ssr:false })`,
> либо просто оставьте `useEffect`-подгрузку как выше (она и так клиентская).
> JSX-предупреждение про неизвестный тег `fluid-bg` безвредно; при желании добавьте в `global.d.ts`:
> `declare namespace JSX { interface IntrinsicElements { 'fluid-bg': any } }`.

### Вариант 4. Vue (SFC)

```vue
<!-- FluidBackground.vue -->
<script setup>
import { onMounted } from 'vue';
const BASE  = 'https://androsovtema.github.io/ZHIZHA';
const SCENE = '#p=0.3,1.35,4.8,0.02,4,9,1,2,28,0,0,1.7778,0,1,3';
defineProps({ fallback: String });
onMounted(() => {
  if (!customElements.get('fluid-bg')) {
    const s = document.createElement('script');
    s.src = `${BASE}/embed/fluid-bg.js`; s.defer = true;
    document.head.appendChild(s);
  }
});
</script>

<template>
  <fluid-bg :src="`${BASE}/index.html${SCENE}&embed=1`" :fallback="fallback" />
</template>
```

> Vue: чтобы Vue не пытался резолвить `fluid-bg` как компонент, отметьте его как custom element.
> Vite: `vue({ template:{ compilerOptions:{ isCustomElement: t => t === 'fluid-bg' } } })`.

---

## Способ B — статичная картинка (без зависимости от ЖИЖА, не анимированная)

```css
body {
  background: url("/assets/fluid-bg.jpg") center / cover fixed no-repeat;
}
```

Как получить файл: откройте сцену в редакторе ЖИЖА → панель **06 Экспорт** → выберите
разрешение → **«⬇ Скачать PNG»**. Положите файл в `assets/`.

---

## Самый надёжный — A + B вместе

Веб-компонент (Способ A, Вариант 1) уже делает это: задайте `fallback`, и статичная картинка
будет позади живого фона — если ЖИЖА когда-нибудь офлайн, фон всё равно покажется.
