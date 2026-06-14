#!/usr/bin/env node
// Garde-fou du stage : empêche Claude de modifier les zones sensibles du boilerplate.
// Protocole hook Claude Code : exit 2 + message sur stderr = action bloquée,
// le message est renvoyé à Claude qui l'explique au stagiaire.

let raw = '';
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let filePath = '';
  try {
    filePath = JSON.parse(raw).tool_input?.file_path || '';
  } catch {
    process.exit(0);
  }
  const p = filePath.replace(/\\/g, '/');

  const zones = [
    {
      test: (f) => f.includes('[locale]/home/[account]'),
      why: "les comptes d'équipe sont désactivés pour le stage — tout le code du stagiaire vit dans le compte personnel : apps/web/app/[locale]/home/(user)/",
    },
    {
      test: (f) => f.includes('[locale]/admin'),
      why: 'le back-office super-admin est hors sujet pour le stage',
    },
    {
      test: (f) => /(^|\/)packages\//.test(f) && !/(^|\/)packages\/ui\//.test(f),
      why: "les packages du boilerplate ne se modifient pas (exception : packages/ui pour un composant réutilisable créé par le stagiaire)",
    },
    {
      test: (f) => /(^|\/)(middleware\.ts|next\.config\.[a-z]+|tailwind\.config\.[a-z]+|eslint\.config\.[a-z]+)$/.test(f),
      why: 'les configs du framework (middleware, Next.js, Tailwind, ESLint) restent telles quelles pendant le stage',
    },
  ];

  for (const zone of zones) {
    if (zone.test(p)) {
      process.stderr.write(
        `Zone protégée du stage : ${filePath} ne doit pas être modifié — ${zone.why}. ` +
          `N'insiste pas et ne contourne pas : propose une solution qui reste dans les zones autorisées, ` +
          `et si la modification semble vraiment nécessaire, dis au stagiaire d'en parler à son tuteur.`,
      );
      process.exit(2);
    }
  }
  process.exit(0);
});
