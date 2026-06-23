/**
 * Fond animé Pickify pour les pages du dashboard.
 * Trois couches superposées :
 *  1. un dégradé sombre coloré (plus vivant qu'un noir plat) ;
 *  2. des halos lumineux orange/bleu qui dérivent lentement ;
 *  3. un motif de terrain de basket en filigrane (très discret).
 * À placer en 1er enfant d'un conteneur `relative overflow-hidden`,
 * le contenu venant par-dessus (z-10).
 */
export function PageBackground() {
  return (
    <div
      aria-hidden
      className={'pointer-events-none absolute inset-0 z-0 overflow-hidden'}
    >
      {/* 1. Dégradé de fond : sombre mais coloré, pas du noir plat */}
      <div
        className={
          'absolute inset-0 bg-[radial-gradient(125%_125%_at_15%_0%,#1c1410_0%,#0b1220_45%,#05070d_100%)]'
        }
      />

      {/* 2. Halos lumineux (remontés en intensité pour être bien visibles) */}
      <div
        className={
          'glow-a absolute -top-24 -left-24 size-[28rem] rounded-full bg-[#EA580C] opacity-[0.22] blur-[110px]'
        }
      />
      <div
        className={
          'glow-b absolute top-1/3 -right-24 size-[32rem] rounded-full bg-[#0284C7] opacity-[0.22] blur-[120px]'
        }
      />
      <div
        className={
          'glow-c absolute -bottom-32 left-1/4 size-[26rem] rounded-full bg-[#0284C7] opacity-[0.16] blur-[120px]'
        }
      />
      {/* un 4e halo orange en bas à droite pour équilibrer */}
      <div
        className={
          'glow-a absolute -right-16 -bottom-24 size-[22rem] rounded-full bg-[#EA580C] opacity-[0.14] blur-[110px]'
        }
      />

      {/* 3. Motif terrain de basket en filigrane (dessin SVG, très léger) */}
      <svg
        className={
          'absolute -top-10 left-1/2 h-[120%] w-[140%] -translate-x-1/2 text-white opacity-[0.05]'
        }
        viewBox={'0 0 400 600'}
        fill={'none'}
        stroke={'currentColor'}
        strokeWidth={'1.5'}
        preserveAspectRatio={'xMidYMid slice'}
      >
        {/* contour du terrain */}
        <rect x={'30'} y={'30'} width={'340'} height={'540'} rx={'6'} />
        {/* ligne médiane */}
        <line x1={'30'} y1={'300'} x2={'370'} y2={'300'} />
        {/* cercle central */}
        <circle cx={'200'} cy={'300'} r={'55'} />
        {/* raquette + arc du haut */}
        <rect x={'150'} y={'30'} width={'100'} height={'130'} />
        <circle cx={'200'} cy={'160'} r={'42'} />
        <path d={'M70 30 V70 A130 130 0 0 0 330 70 V30'} />
        {/* raquette + arc du bas */}
        <rect x={'150'} y={'440'} width={'100'} height={'130'} />
        <circle cx={'200'} cy={'440'} r={'42'} />
        <path d={'M70 570 V530 A130 130 0 0 1 330 530 V570'} />
      </svg>
    </div>
  );
}
