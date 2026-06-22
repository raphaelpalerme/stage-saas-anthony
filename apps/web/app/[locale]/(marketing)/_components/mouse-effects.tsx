'use client';

import { useEffect } from 'react';

export function MouseEffects() {
  useEffect(() => {
    // Traînée de points qui suivent la souris
    const onMove = (e: MouseEvent) => {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:fixed; width:8px; height:8px; border-radius:50%;
        background:#fff; pointer-events:none; z-index:9999;
        left:${e.clientX}px; top:${e.clientY}px;
        transform:translate(-50%,-50%);
        animation: dot-fade 0.6s ease forwards;
      `;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    };

    // Burst de points au clic
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 10; i++) {
        const dot = document.createElement('span');
        const angle = (i / 10) * 360;
        const dist = 30 + Math.random() * 50;
        const tx = Math.cos((angle * Math.PI) / 180) * dist;
        const ty = Math.sin((angle * Math.PI) / 180) * dist;
        dot.style.cssText = `
          position:fixed; width:6px; height:6px; border-radius:50%;
          background:#fff; pointer-events:none; z-index:9999;
          left:${e.clientX}px; top:${e.clientY}px;
          transform:translate(-50%,-50%);
          animation: click-burst 0.7s ease-out ${i * 0.02}s forwards;
          --tx:${tx}px; --ty:${ty}px;
        `;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 750);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
