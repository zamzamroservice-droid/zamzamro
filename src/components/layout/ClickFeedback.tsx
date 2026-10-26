import { useEffect } from 'react';

/** Subtle water ripple at the pointer on clicks of buttons and links. Disabled under reduced motion. */
export default function ClickFeedback() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;
      const dot = document.createElement('span');
      dot.setAttribute('aria-hidden', 'true');
      Object.assign(dot.style, {
        position: 'fixed',
        left: `${e.clientX - 14}px`,
        top: `${e.clientY - 14}px`,
        width: '28px',
        height: '28px',
        borderRadius: '999px',
        border: '1.5px solid rgb(61 143 184 / 0.55)',
        pointerEvents: 'none',
        zIndex: '120',
      });
      document.body.appendChild(dot);
      dot.animate([{ transform: 'scale(0.4)', opacity: 0.9 }, { transform: 'scale(1.8)', opacity: 0 }], { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }).onfinish = () => dot.remove();
    };
    document.addEventListener('pointerdown', onDown, { passive: true });
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);
  return null;
}
