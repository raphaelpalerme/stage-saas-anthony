import Image from 'next/image';
import Link from 'next/link';

import { MouseEffects } from './_components/mouse-effects';

const features = [
  {
    num: '01',
    numColor: '#EA580C',
    image: '/images/image1.webp',
    title: 'Joueurs dans ton quartier',
    text: "Plus jamais de terrain vide, d'autres joueurs t'attendent déjà.",
  },
  {
    num: '02',
    numColor: '#0284C7',
    image: '/images/image2.webp',
    title: 'Joue quand tu veux',
    text: 'Poste ton créneau et rejoins une partie qui te correspond.',
  },
  {
    num: '03',
    numColor: '#EA580C',
    image: '/images/image3.webp',
    title: 'Niveau & réputation',
    text: 'Chaque joueur affiche son niveau et son rating. Tu sais avec qui tu joues avant de confirmer.',
  },
];

const faqs = [
  {
    q: "C'est quoi la différence avec un groupe WhatsApp ?",
    a: "WhatsApp, c'est pour tes potes. Pickify te connecte à des joueurs que tu ne connais pas encore — ceux qui sont au même terrain, au même créneau que toi. Fini les messages sans réponse dans 47 groupes.",
  },
  {
    q: "C'est vraiment gratuit ?",
    a: 'Oui, la bêta est 100% gratuite. On travaille avec les premiers joueurs pour définir ce que vaudra le plan Pro — les membres bêta auront un avantage sur le tarif final.',
  },
  {
    q: 'Y a-t-il des terrains près de chez moi ?',
    a: "On démarre avec Paris et l'Île-de-France. Si ton terrain manque, propose-le directement dans l'app — on l'ajoute sous 48h.",
  },
  {
    q: 'Faut-il un niveau minimum pour s’inscrire ?',
    a: 'Aucun. Débutant, intermédiaire, semi-pro — tout le monde est bienvenu. Tu indiques ton niveau dans ton profil et le matchmaking te propose des parties adaptées.',
  },
];

function Home() {
  return (
    <div className="relative overflow-x-clip">
      <MouseEffects />
      {/* ===== Terrain de basket en fond ===== */}
      <CourtBackground />

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-5 py-16 text-center sm:px-8 lg:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2,132,199,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#0284C7]/40 bg-[#0284C7]/15 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0284C7]" />
            <span className="text-xs font-bold tracking-widest text-[#7dd3fc] uppercase">
              Partie trouvée en 30 secondes
            </span>
          </div>

          <h1
            className="grad-title font-heading mb-5 max-w-5xl text-[3.25rem] leading-[0.86] font-normal tracking-wide sm:text-7xl md:text-8xl lg:text-[8rem]"
          >
            TROUVE TA PROCHAINE PARTIE ET TES JOUEURS EN 30S
          </h1>

          <p className="mb-9 max-w-xl text-base leading-relaxed text-[#b8b8bd] sm:text-lg md:text-xl">
            Plus besoin d&apos;appeler 15 personnes — Pickify te connecte avec
            les joueurs de ton quartier.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <OrangeButton href="/auth/sign-up">
              Je rejoins Pickify <span className="text-lg">→</span>
            </OrangeButton>
            <span className="text-sm text-[#7c7c82]">
              Gratuit · iOS &amp; Android
            </span>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
            <Stat value="12K+" label="Joueurs actifs" />
            <Stat value="800+" label="Terrains référencés" />
            <Stat value="30s" label="Pour rejoindre" valueColor="#EA580C" />
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24 lg:px-14"
      >
        <SectionLabel>Pourquoi Pickify</SectionLabel>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.num}
              className="bg-card border-border flex flex-col rounded-2xl border p-6 shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:p-7"
            >
              <div className="relative mb-5 h-32 w-full overflow-hidden rounded-[10px]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <div
                className="font-heading mb-1.5 text-sm tracking-widest"
                style={{ color: f.numColor }}
              >
                {f.num}
              </div>
              <h3 className="font-heading mb-2.5 text-2xl leading-none font-normal tracking-wide sm:text-3xl">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section
        id="pricing"
        className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-16 text-center sm:px-8 sm:py-24 lg:px-14"
      >
        <SectionLabel centered>Tarifs</SectionLabel>

        <h2
          className="grad-title font-heading mb-4 text-4xl leading-[0.9] font-normal sm:text-6xl lg:text-7xl"
        >
          COMMENCE GRATUIT,
          <br />
          <span className="grad-blue">ÉVOLUE QUAND TU VEUX</span>
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-base text-[#7c7c82]">
          On finalise le prix Pro avec les premiers utilisateurs — rejoins la
          bêta pour influencer le tarif final.
        </p>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-left md:grid-cols-2">
          {/* Plan Gratuit */}
          <div className="bg-card border-border rounded-2xl border p-6 shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:p-9">
            <div className="font-heading mb-2 text-xl tracking-wide">
              Gratuit
            </div>
            <div className="font-heading mb-1 text-5xl leading-none">
              0€<span className="text-lg text-[#7c7c82]">/mois</span>
            </div>
            <p className="mb-7 text-sm text-[#7c7c82]">
              Pour découvrir Pickify et jouer avec ta ville.
            </p>
            <ul className="mb-8 flex flex-col gap-2.5 text-sm">
              <PlanItem>Profil joueur public</PlanItem>
              <PlanItem>5 créneaux par mois</PlanItem>
              <PlanItem>Accès aux terrains locaux</PlanItem>
              <PlanItem off>Matchmaking prioritaire</PlanItem>
              <PlanItem off>Historique illimité</PlanItem>
            </ul>
            <Link
              href="/auth/sign-up"
              className="block rounded-lg border border-white/20 px-6 py-3 text-center text-sm font-bold transition hover:bg-white/5"
            >
              Commencer gratuitement
            </Link>
          </div>

          {/* Plan Pro */}
          <div className="bg-card relative rounded-2xl border border-[#0284C7] p-6 shadow-[0_0_0_1px_#0284C7,0_4px_32px_rgba(2,132,199,0.25)] sm:p-9">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0284C7] px-4 py-1 text-[11px] font-extrabold tracking-wider text-white">
              À VENIR
            </div>
            <div className="font-heading mb-2 text-xl tracking-wide">Pro</div>
            <div className="font-heading mb-1 text-5xl leading-none text-[#0284C7]">
              10€<span className="text-lg text-[#7c7c82]">/mois</span>
            </div>
            <p className="mb-7 text-sm text-[#7c7c82]">
              Pour les joueurs réguliers qui veulent jouer plus souvent.
            </p>
            <ul className="mb-8 flex flex-col gap-2.5 text-sm">
              <PlanItem>Tout du plan Gratuit</PlanItem>
              <PlanItem>Créneaux illimités</PlanItem>
              <PlanItem>Matchmaking prioritaire</PlanItem>
              <PlanItem>Historique complet + stats</PlanItem>
              <PlanItem>Badge joueur actif</PlanItem>
            </ul>
            <Link
              href="/auth/sign-up"
              className="block rounded-lg bg-[#0284C7] px-6 py-3 text-center text-sm font-bold text-white transition hover:brightness-110"
            >
              Rejoindre la bêta
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section
        id="faq"
        className="relative z-10 mx-auto grid max-w-6xl scroll-mt-24 grid-cols-1 items-start gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2 lg:px-14"
      >
        <div className="md:sticky md:top-24">
          <SectionLabel>FAQ</SectionLabel>
          <h2
            className="grad-title font-heading text-4xl leading-[0.9] font-normal sm:text-5xl lg:text-6xl"
          >
            TES QUESTIONS,
            <br />
            <span className="grad-orange">NOS RÉPONSES</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group bg-card border-border rounded-2xl border transition-colors open:border-[#0284C7]/60 hover:border-[#0284C7]/45"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-base font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg transition-all duration-300 group-open:rotate-45 group-open:border-[#0284C7] group-open:bg-[#0284C7]">
                  +
                </span>
              </summary>
              <div className="text-muted-foreground px-6 pb-6 text-[15px] leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative z-10 px-5 py-20 text-center sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <h2
            className="grad-title font-heading mb-8 text-5xl leading-[0.88] font-normal tracking-wide text-balance sm:text-7xl lg:text-8xl"
          >
            TA PROCHAINE PARTIE{' '}
            <span className="grad-orange">T&apos;ATTEND</span>
          </h2>
          <OrangeButton href="/auth/sign-up">
            Je rejoins Pickify <span className="text-base">→</span>
          </OrangeButton>
        </div>
      </section>
    </div>
  );
}

export default Home;

/* ---------- petits composants réutilisés ---------- */

function OrangeButton({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 rounded-lg bg-[#EA580C] px-7 py-4 text-base font-extrabold text-black shadow-[0_10px_30px_-8px_#EA580C] transition hover:-translate-y-0.5 hover:brightness-110"
    >
      {children}
    </Link>
  );
}

function SectionLabel({
  children,
  centered,
}: React.PropsWithChildren<{ centered?: boolean }>) {
  return (
    <div
      className={`mb-8 flex items-center gap-3 sm:mb-11 ${
        centered ? 'justify-center' : ''
      }`}
    >
      <span className="h-0.5 w-7 bg-[#EA580C]" />
      <span className="text-xs font-bold tracking-[0.2em] text-[#7c7c82] uppercase">
        {children}
      </span>
      {centered ? <span className="h-0.5 w-7 bg-[#EA580C]" /> : null}
    </div>
  );
}

function Stat({
  value,
  label,
  valueColor,
}: {
  value: string;
  label: string;
  valueColor?: string;
}) {
  return (
    <div>
      <div
        className="font-heading text-4xl leading-none sm:text-5xl"
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </div>
      <div className="mt-1 text-xs tracking-wider text-[#7c7c82] uppercase">
        {label}
      </div>
    </div>
  );
}

function PlanItem({
  children,
  off,
}: React.PropsWithChildren<{ off?: boolean }>) {
  return (
    <li className={`flex items-center gap-2.5 ${off ? 'text-[#5c5c61]' : ''}`}>
      <span className={off ? 'font-bold' : 'font-bold text-[#22C55E]'}>
        {off ? '–' : '✓'}
      </span>
      {children}
    </li>
  );
}

function CourtBackground() {
  return (
    <svg
      aria-hidden
      className="court-bg pointer-events-none fixed inset-0 z-0 h-full w-full opacity-25"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#EA580C"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <line x1="720" y1="0" x2="720" y2="900" />
      <circle cx="720" cy="450" r="100" />
      <circle cx="720" cy="450" r="20" />
      <path d="M 200 130 A 380 380 0 0 0 200 770" />
      <rect x="0" y="300" width="220" height="300" />
      <circle cx="220" cy="450" r="100" />
      <path d="M 1240 130 A 380 380 0 0 1 1240 770" />
      <rect x="1220" y="300" width="220" height="300" />
      <circle cx="1220" cy="450" r="100" />
      <rect x="10" y="10" width="1420" height="880" />
    </svg>
  );
}
