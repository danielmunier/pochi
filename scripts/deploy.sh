#!/bin/bash

# 🚀 Script de Deploy Manual (backup)
# Use este script se quiser fazer deploy manual

echo "🚀 Iniciando deploy manual do Pochi Bot..."

cd ~/pochi-bot

echo "⏹️ Parando bot..."
pm2 stop pochi-bot || true

echo "💾 Fazendo backup..."
cp -r . ../backup-$(date +%Y%m%d-%H%M%S) || true

echo "📥 Atualizando código..."
git fetch origin
git reset --hard origin/main

echo "📦 Instalando dependências..."
bun install --frozen-lockfile

echo "🏗️ Fazendo build..."
bun run build

echo "🔄 Iniciando bot..."
pm2 start ecosystem.config.js --env production

echo "✅ Verificando status..."
pm2 status

echo "🎉 Deploy manual concluído!"
