import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const onEnter = () => {
      cursor.style.width = '42px';
      cursor.style.height = '42px';
      cursor.style.background = '#8C2A54';
    };

    const onLeave = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = '#C79A3B';
    };

    document.addEventListener('mousemove', onMove);

    // Attach hover listeners to all current and future .clickable elements via delegation
    document.addEventListener('mouseover', (e) => {
      const target = e.target as Element;
      if (target.closest('.clickable')) onEnter();
    });
    document.addEventListener('mouseout', (e) => {
      const related = (e as MouseEvent).relatedTarget as Element | null;
      if (!related || !related.closest?.('.clickable')) onLeave();
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'var(--gold)',
        opacity: 0.9,
        pointerEvents: 'none',
        zIndex: 1000,
        transform: 'translate3d(-50%,-50%,0)',
        transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease',
      }}
    />
  );
}
