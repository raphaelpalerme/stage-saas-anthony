#!/usr/bin/env bash
# Vérifie que tout l'outillage du stage est installé et à la bonne version.
# Marche à l'identique sur Mac et sur Windows.
#   Mac    : ouvre Terminal, tape   bash check-setup.sh
#   Windows: ouvre "Git Bash", tape  bash check-setup.sh

NODE_MIN_MAJOR=20
NODE_MIN_MINOR=10

ok=0; warn=0; err=0
green="\033[32m"; yellow="\033[33m"; red="\033[31m"; dim="\033[2m"; reset="\033[0m"

case "$(uname -s)" in
  Darwin) OS="mac" ;;
  MINGW*|MSYS*|CYGWIN*) OS="windows" ;;
  *) OS="autre" ;;
esac

line() { printf "%b\n" "$1"; }
have() { command -v "$1" >/dev/null 2>&1; }

# $1 nom affiché, $2 commande, $3 arg de version, $4 indispensable(1)/optionnel(0)
check() {
  if have "$2"; then
    v="$("$2" $3 2>&1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -n1)"
    line "${green}OK${reset}  $1  ${dim}v$v${reset}"; ok=$((ok+1))
  elif [ "$4" = "1" ]; then
    line "${red}!!  $1 — MANQUANT${reset}"; err=$((err+1))
  else
    line "${yellow}~~  $1 — absent (optionnel)${reset}"; warn=$((warn+1))
  fi
}

line ""
line "-- Environnement du stage ($OS) --"
line ""

check "git" git --version 1

if have node; then
  nv="$(node --version | sed 's/v//')"; maj="${nv%%.*}"; rest="${nv#*.}"; min="${rest%%.*}"
  if [ "$maj" -gt "$NODE_MIN_MAJOR" ] || { [ "$maj" -eq "$NODE_MIN_MAJOR" ] && [ "$min" -ge "$NODE_MIN_MINOR" ]; }; then
    line "${green}OK${reset}  node  ${dim}v$nv${reset}"; ok=$((ok+1))
  else
    line "${red}!!  node v$nv — TROP ANCIEN (il faut >= $NODE_MIN_MAJOR.$NODE_MIN_MINOR)${reset}"; err=$((err+1))
  fi
else
  line "${red}!!  node — MANQUANT${reset}"; err=$((err+1))
fi

check "corepack (fournit pnpm)" corepack --version 1
check "pnpm" pnpm --version 0

if have docker; then
  dv="$(docker --version 2>&1 | head -n1)"
  if docker ps >/dev/null 2>&1; then
    line "${green}OK${reset}  docker  ${dim}$dv (demon actif)${reset}"; ok=$((ok+1))
  else
    line "${yellow}~~  docker installe mais le demon ne repond pas — lance Docker Desktop${reset}"; warn=$((warn+1))
  fi
else
  line "${red}!!  docker — MANQUANT${reset}"; err=$((err+1))
fi

if have gh; then
  gv="$(gh --version 2>&1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' | head -n1)"
  if gh auth status >/dev/null 2>&1; then
    line "${green}OK${reset}  gh (GitHub CLI)  ${dim}v$gv (connecte)${reset}"; ok=$((ok+1))
  else
    line "${yellow}~~  gh installe (v$gv) mais pas connecte — lance: gh auth login${reset}"; warn=$((warn+1))
  fi
else
  line "${yellow}~~  gh (GitHub CLI) — absent (optionnel mais utile)${reset}"; warn=$((warn+1))
fi

line ""
line "-- Resume : ${green}$ok OK${reset} / ${yellow}$warn a surveiller${reset} / ${red}$err bloquant(s)${reset} --"

if [ "$err" -gt 0 ]; then
  line ""
  line "Installer ce qui manque :"
  if [ "$OS" = "mac" ]; then
    line "  ${dim}# Homebrew — brew.sh${reset}"
    line "  brew install node gh"
    line "  brew install --cask docker      ${dim}# puis ouvre Docker Desktop une fois${reset}"
  elif [ "$OS" = "windows" ]; then
    line "  ${dim}# winget (dans PowerShell)${reset}"
    line "  winget install OpenJS.NodeJS.LTS"
    line "  winget install GitHub.cli"
    line "  winget install Docker.DockerDesktop   ${dim}# puis ouvre Docker Desktop une fois${reset}"
  fi
  line ""
  line "Apres avoir installe Node, active pnpm a la bonne version :  corepack enable"
fi

line ""
line "A matcher entre les 2 machines : la MEME version majeure de Node (LTS)."
line "pnpm est gere automatiquement par corepack (version epinglee dans package.json)."
line ""

[ "$err" -gt 0 ] && exit 1 || exit 0
