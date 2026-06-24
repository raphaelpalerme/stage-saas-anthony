#!/usr/bin/env node
// Stage : quand une migration change, on remet la base locale à jour et on régénère les types.
const fs = require('fs');
let p = '';
try { p = ((JSON.parse(fs.readFileSync(0, 'utf8') || '{}').tool_input) || {}).file_path || ''; } catch (_e) {}
if (!/supabase\/migrations\/.*\.sql$/.test(p)) process.exit(0);
try {
  console.error('🔄 Migration modifiée → reset base locale + régénération des types…');
  require('child_process').execSync('pnpm supabase:web:reset && pnpm supabase:web:typegen', { stdio: 'inherit' });
  console.error('✅ Types régénérés (apps/web/lib + packages/supabase). Pense à les committer.');
} catch (_e) {
  console.error('⚠️ Régénération impossible (Docker/Supabase éteint ?). À la main : pnpm supabase:web:reset && pnpm supabase:web:typegen');
}
process.exit(0);
