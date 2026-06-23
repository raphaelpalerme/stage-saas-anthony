/**
 * Fond animé Pickify pour les pages du dashboard.
 * Des halos lumineux orange/bleu qui dérivent lentement, en très basse
 * opacité (discret, pas enfantin). À placer en 1er enfant d'un conteneur
 * `relative overflow-hidden`, le contenu venant par-dessus (z-10).
 */
export function PageBackground() {
  return (
    <div
      aria-hidden
      className={'pointer-events-none absolute inset-0 z-0 overflow-hidden'}
    >
      <div
        className={
          'glow-a absolute -top-24 -left-24 size-[28rem] rounded-full bg-[#EA580C] opacity-[0.10] blur-[120px]'
        }
      />
      <div
        className={
          'glow-b absolute top-1/3 -right-24 size-[32rem] rounded-full bg-[#0284C7] opacity-[0.12] blur-[130px]'
        }
      />
      <div
        className={
          'glow-c absolute -bottom-32 left-1/4 size-[24rem] rounded-full bg-[#0284C7] opacity-[0.08] blur-[120px]'
        }
      />
    </div>
  );
}
