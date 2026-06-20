# Фон ЖИЖА на вашем сайте

Живой фон рендерится на GPU посетителя — хостить нечего, бесплатно. Слой фиксированный,
во весь экран, позади контента и **не перехватывает клики**.

> Базовый адрес в примерах — `https://androsovtema.github.io/ZHIZHA/` (этот деплой на GitHub Pages).
> Если развернёте свою копию в другом месте — замените его на свой адрес.

Сцена в примерах — «Гидрополе» (Гироид · Океан · pixelate+halftone · 16:9), закодирована
прямо в hash ссылки. Любую другую сцену соберите в редакторе → **«🔗 Ссылка на эту сцену»** или
**«&lt;/&gt; Код для встраивания»** и подставьте полученный URL вместо `src`.

`embed=1` в ссылке скрывает панель управления — остаётся только фон.

---

## Способ A — живой анимированный фон (рекомендуется)

### Вариант 1. Универсальный веб-компонент `<zhizha-bg>` (работает где угодно)

Это нативный Custom Element — одинаково работает в чистом HTML, React, Vue, Svelte.
Добавляет статичный фоллбэк: если ЖИЖА вдруг офлайн, покажется картинка.

```html
<script src="https://androsovtema.github.io/ZHIZHA/embed/zhizha-bg.js" defer></script>

<zhizha-bg
  src="https://androsovtema.github.io/ZHIZHA/index.html#s=eyJzcCI6MC4zLCJzYyI6MS4zNSwid2EiOjQuOCwiZ3IiOjAuMDIsImZsIjozLCJwYSI6Miwic20iOjAsInRpIjo1LCJzY3IiOjAsInB4Ijo0LCJkdCI6MSwiZHoiOjksInNkIjoyOCwiYXIiOiIxNjo5IiwiY28iOltbNSwxMywzNl0sWzEwLDc0LDEyOF0sWzQ2LDE2OCwxOTRdLFsxOTksMjQ1LDIzMl1dfQ"
  fallback="https://androsovtema.github.io/ZHIZHA/assets/zhizha-bg.jpg">
</zhizha-bg>
```

`fallback` необязателен. `z` (z-index, по умолчанию `-1`) — если фон перекрывает контент,
поставьте контенту `position:relative; z-index:0`.

### Вариант 2. Чистый HTML/CSS (без скрипта)

```html
<div style="position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none">
  <iframe
    src="https://androsovtema.github.io/ZHIZHA/index.html#s=eyJzcCI6MC4zLCJzYyI6MS4zNSwid2EiOjQuOCwiZ3IiOjAuMDIsImZsIjozLCJwYSI6Miwic20iOjAsInRpIjo1LCJzY3IiOjAsInB4Ijo0LCJkdCI6MSwiZHoiOjksInNkIjoyOCwiYXIiOiIxNjo5IiwiY28iOltbNSwxMywzNl0sWzEwLDc0LDEyOF0sWzQ2LDE2OCwxOTRdLFsxOTksMjQ1LDIzMl1dfQ"
    title="Фон" loading="lazy" aria-hidden="true"
    style="width:100%;height:100%;border:0;display:block"></iframe>
</div>
```

### Вариант 3. React / Next.js

```jsx
// ZhizhaBackground.jsx — компонент-обёртка над веб-компонентом
import { useEffect } from 'react';

const SCENE = '#s=eyJzcCI6MC4zLCJzYyI6MS4zNSwid2EiOjQuOCwiZ3IiOjAuMDIsImZsIjozLCJwYSI6Miwic20iOjAsInRpIjo1LCJzY3IiOjAsInB4Ijo0LCJkdCI6MSwiZHoiOjksInNkIjoyOCwiYXIiOiIxNjo5IiwiY28iOltbNSwxMywzNl0sWzEwLDc0LDEyOF0sWzQ2LDE2OCwxOTRdLFsxOTksMjQ1LDIzMl1dfQ';
const BASE  = 'https://androsovtema.github.io/ZHIZHA';

export default function ZhizhaBackground({ fallback }) {
  useEffect(() => {
    // подгружаем определение веб-компонента один раз на клиенте
    if (!customElements.get('zhizha-bg')) {
      const s = document.createElement('script');
      s.src = `${BASE}/embed/zhizha-bg.js`; s.defer = true;
      document.head.appendChild(s);
    }
  }, []);
  return (
    <zhizha-bg
      src={`${BASE}/index.html${SCENE}&embed=1`}
      fallback={fallback}
    />
  );
}
```

```jsx
// в layout/странице
<ZhizhaBackground fallback="/assets/zhizha-bg.jpg" />
```

> Next.js: для веб-компонента рендер на клиенте — `dynamic(() => import('./ZhizhaBackground'), { ssr:false })`,
> либо просто оставьте `useEffect`-подгрузку как выше (она и так клиентская).
> JSX-предупреждение про неизвестный тег `zhizha-bg` безвредно; при желании добавьте в `global.d.ts`:
> `declare namespace JSX { interface IntrinsicElements { 'zhizha-bg': any } }`.

### Вариант 4. Vue (SFC)

```vue
<!-- ZhizhaBackground.vue -->
<script setup>
import { onMounted } from 'vue';
const BASE  = 'https://androsovtema.github.io/ZHIZHA';
const SCENE = '#s=eyJzcCI6MC4zLCJzYyI6MS4zNSwid2EiOjQuOCwiZ3IiOjAuMDIsImZsIjozLCJwYSI6Miwic20iOjAsInRpIjo1LCJzY3IiOjAsInB4Ijo0LCJkdCI6MSwiZHoiOjksInNkIjoyOCwiYXIiOiIxNjo5IiwiY28iOltbNSwxMywzNl0sWzEwLDc0LDEyOF0sWzQ2LDE2OCwxOTRdLFsxOTksMjQ1LDIzMl1dfQ';
defineProps({ fallback: String });
onMounted(() => {
  if (!customElements.get('zhizha-bg')) {
    const s = document.createElement('script');
    s.src = `${BASE}/embed/zhizha-bg.js`; s.defer = true;
    document.head.appendChild(s);
  }
});
</script>

<template>
  <zhizha-bg :src="`${BASE}/index.html${SCENE}&embed=1`" :fallback="fallback" />
</template>
```

> Vue: чтобы Vue не пытался резолвить `zhizha-bg` как компонент, отметьте его как custom element.
> Vite: `vue({ template:{ compilerOptions:{ isCustomElement: t => t === 'zhizha-bg' } } })`.

---

## Способ B — статичная картинка (без зависимости от ЖИЖА, не анимированная)

```css
body {
  background: url("/assets/zhizha-bg.jpg") center / cover fixed no-repeat;
}
```

Как получить файл: откройте сцену в редакторе ЖИЖА → панель **06 Экспорт** → выберите
разрешение → **«⬇ Скачать PNG»**. Положите файл в `assets/`.

---

## Самый надёжный — A + B вместе

Веб-компонент (Способ A, Вариант 1) уже делает это: задайте `fallback`, и статичная картинка
будет позади живого фона — если ЖИЖА когда-нибудь офлайн, фон всё равно покажется.
