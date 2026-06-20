/* ============================================================================
   <fluid-bg> — фон ЖИЖА как веб-компонент. Работает где угодно:
   чистый HTML, React/Next, Vue, Svelte — это нативный Custom Element.

   Подключение:
     <script src="https://ВАШ-ДОМЕН/embed/fluid-bg.js" defer></script>
     <fluid-bg src="https://ВАШ-ДОМЕН/index.html#p=...&embed=1"
               fallback="https://ВАШ-ДОМЕН/assets/fluid-bg.jpg"></fluid-bg>

   Атрибуты:
     src       — URL вашей копии ЖИЖА со сценой в hash (+ embed=1, чтобы скрыть панель). Обязателен.
     fallback  — статичная картинка-фоллбэк (показывается, если iframe не загрузился). Необяз.
     z         — z-index слоя (по умолчанию -1, т.е. позади контента). Необяз.

   Слой фиксированный, полноэкранный и НЕ перехватывает клики (pointer-events:none).
   ============================================================================ */
(function () {
  if (customElements.get('fluid-bg')) return;

  class FluidBg extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src') || '';
      const fallback = this.getAttribute('fallback') || '';
      const z = this.getAttribute('z') || '-1';

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML =
        '<style>' +
          ':host{position:fixed;inset:0;z-index:' + z + ';overflow:hidden;pointer-events:none;display:block;background:#07080c}' +
          '.layer{position:absolute;inset:0;width:100%;height:100%;border:0;display:block}' +
          'img.layer{object-fit:cover}' +
          'iframe.layer{background:transparent}' +
        '</style>' +
        (fallback ? '<img class="layer" src="' + fallback + '" alt="" aria-hidden="true">' : '') +
        (src ? '<iframe class="layer" title="Фон" loading="lazy" tabindex="-1" aria-hidden="true" referrerpolicy="no-referrer"></iframe>' : '');

      const frame = root.querySelector('iframe');
      if (frame) {
        // если iframe не смог загрузиться (ЖИЖА офлайн) — убираем его, остаётся fallback-картинка
        frame.addEventListener('error', function () { frame.remove(); });
        frame.src = src;
      }
    }
  }

  customElements.define('fluid-bg', FluidBg);
})();
