#!/bin/bash
set -e

echo "🧹 Nettoyage des dossiers node_modules et fichiers package-lock.json..."

# Nettoyage à la racine
rm -rf node_modules package-lock.json

# Nettoyage dans max-formation
rm -rf max-formation/node_modules max-formation/package-lock.json || true

echo "📦 Installation des dépendances à la racine..."
npm install

echo "📦 Installation des dépendances dans max-formation..."
npm install --prefix max-formation

echo "✅ Build du projet max-formation..."
npm run build --prefix max-formation

echo "🎉 Build terminée avec succès."