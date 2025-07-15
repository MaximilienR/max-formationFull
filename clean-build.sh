#!/bin/bash
set -e  # Quitte si une commande échoue

echo "🧹 Nettoyage du backend..."
rm -rf maxformationBack/node_modules maxformationBack/package-lock.json

echo "🧹 Nettoyage du frontend..."
rm -rf max-formation/node_modules max-formation/package-lock.json

echo "📦 Installation des dépendances backend..."
cd maxformationBack
npm install
cd ..

echo "📦 Installation des dépendances frontend..."
cd max-formation
npm install
cd ..

echo "🔨 Build du frontend avec Vite..."
cd max-formation
npm run build
cd ..

echo "✅ Build frontend terminée."

echo "🛠 Lancement de la validation backend (optionnel)..."
# Ici tu peux faire un test, ex: npm test dans backend si tu veux

echo "🚀 Préparation déploiement..."

# Ajout des changements package-lock.json
git add max-formation/package-lock.json maxformationBack/package-lock.json

# Commit avec message par défaut (à personnaliser)
git commit -m "Clean build: dependencies reinstall and frontend build"

# Push vers la branche principale
git push origin master

echo "🎉 Build & deploy terminés avec succès."
