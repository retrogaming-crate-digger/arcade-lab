#!/bin/bash

# 🎛️ MAME SAMPLE BRAIN LAUNCHER
# Script standalone - à lancer depuis n'importe où
# Usage: bash launch-sample-brain.sh

set -e  # Exit on error

# ═══════════════════════════════════════════════════════════════
# Configuration
# ═══════════════════════════════════════════════════════════════

MAME_DIR="/d/Retrogaming/MAME"
SAMPLE_BRAIN_DIR="$MAME_DIR/sample-brain"
PORT=8000

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════
# Fonctions
# ═══════════════════════════════════════════════════════════════

log_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
  echo -e "${RED}❌ $1${NC}"
}

check_directory() {
  local dir="$1"
  local name="$2"
  if [ ! -d "$dir" ]; then
    log_error "Répertoire $name introuvable: $dir"
    return 1
  fi
  return 0
}

check_file() {
  local file="$1"
  local name="$2"
  if [ ! -f "$file" ]; then
    log_error "Fichier $name introuvable: $file"
    return 1
  fi
  return 0
}

generate_metadata() {
  log_info "Génération de games.json..."
  cd "$SAMPLE_BRAIN_DIR"
  
  if ! node scan.js; then
    log_error "Erreur lors de la génération des métadonnées"
    return 1
  fi
  
  log_success "games.json créé"
  return 0
}

check_port() {
  local port="$1"
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    log_warning "Le port $port est déjà utilisé"
    return 1
  fi
  return 0
}

# ═══════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════

main() {
  clear
  echo -e "${BLUE}"
  echo "╔═══════════════════════════════════════════════════════════╗"
  echo "║       🎛️  MAME SAMPLE BRAIN LAUNCHER 🎛️                ║"
  echo "╚═══════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
  echo ""
  
  # Vérifications préalables
  log_info "Vérification des répertoires..."
  check_directory "$MAME_DIR" "MAME" || return 1
  check_directory "$SAMPLE_BRAIN_DIR" "sample-brain" || return 1
  check_file "$SAMPLE_BRAIN_DIR/index.html" "index.html" || return 1
  log_success "Tous les répertoires sont présents"
  echo ""
  
  # Générer les métadonnées si nécessaire
  if [ ! -f "$SAMPLE_BRAIN_DIR/games.json" ]; then
    log_warning "games.json non trouvé"
    generate_metadata || return 1
  else
    log_success "games.json trouvé"
  fi
  echo ""
  
  # Vérifier le port
  if ! check_port "$PORT"; then
    log_warning "Essai d'un port différent..."
    PORT=8001
    if ! check_port "$PORT"; then
      log_error "Impossible de trouver un port disponible"
      return 1
    fi
  fi
  echo ""
  
  # Afficher les infos de lancement
  echo -e "${BLUE}"
  echo "╔═══════════════════════════════════════════════════════════╗"
  echo "║                    CONFIGURATION                          ║"
  echo "╚═══════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
  echo -e "📂 Racine du serveur : ${YELLOW}$MAME_DIR${NC}"
  echo -e "🎛️  App directory    : ${YELLOW}$SAMPLE_BRAIN_DIR${NC}"
  echo -e "🌐 Serveur HTTP     : ${YELLOW}http://localhost:$PORT${NC}"
  echo -e "📍 URL application  : ${YELLOW}http://localhost:$PORT/sample-brain/index.html${NC}"
  echo ""
  
  # Lancer le serveur
  echo -e "${GREEN}"
  echo "╔═══════════════════════════════════════════════════════════╗"
  echo "║              SERVEUR EN COURS DE LANCEMENT                ║"
  echo "╚═══════════════════════════════════════════════════════════╝"
  echo -e "${NC}"
  echo ""
  echo -e "${YELLOW}💡 Tip: Appuie sur Ctrl+C pour arrêter le serveur${NC}"
  echo ""
  
  cd "$MAME_DIR"
  python -m http.server "$PORT"
}

# ═══════════════════════════════════════════════════════════════
# Lancer
# ═══════════════════════════════════════════════════════════════

main "$@"