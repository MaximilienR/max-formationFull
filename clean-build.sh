#!/bin/bash

echo "🧹 Nettoyage de l'environnement..."

rm -rf node_modules
rm -f package-lock.json

echo "📦 Réinstallation des dépendances..."

npm install

echo "🔍 Vérification de la version d'esbuild installée..."

npm ls esbuild

echo "🛠️ Forçage de la dernière version d'esbuild si besoin..."

npm uninstall esbuild
npm install esbuild@latest --save-dev

echo "✅ Build local pour vérifier avant déploiement..."

npm run build

echo "🚀 Prêt pour git commit et push sur Render."
echo "👉 Commandes suivantes :"
echo "   git add package-lock.json"
echo "   git commit -m 'Clean build, esbuild updated'"
echo "   git push"

echo "🎉 Script terminé."