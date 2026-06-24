#!/usr/bin/env node
// Stage : pas de formatage automatique. On bloque format / format:fix / oxfmt / prettier --write.
const fs = require('fs');
let cmd = '';
try { cmd = ((JSON.parse(fs.readFileSync(0, 'utf8') || '{}').tool_input) || {}).command || ''; } catch (e) {}
if (/\bpnpm\s+(run\s+)?format\b|prettier\s+--write|\boxfmt\b/.test(cmd)) {
  console.error('🚫 Formatage désactivé pour le stage : ne lance pas cette commande (format / format:fix / oxfmt / prettier --write).');
  process.exit(2); // exit 2 = bloque l'appel et renvoie le message à Claude
}
process.exit(0);
