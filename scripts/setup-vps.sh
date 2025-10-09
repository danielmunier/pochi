#!/bin/bash

# 🚀 Script de Setup da VPS para Pochi Bot
# Execute este script na sua VPS para configurar o ambiente

echo "🚀 Configurando VPS para Pochi Bot..."

# Atualiza sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instala dependências básicas
echo "🔧 Instalando dependências..."
sudo apt install -y git curl wget unzip

# Instala Bun
echo "⚡ Instalando Bun..."
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Instala PM2 para gerenciar o bot
echo "🔄 Instalando PM2..."
bun install -g pm2

# Instala Docker (opcional, para microserviços futuros)
echo "🐳 Instalando Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instala Docker Compose
echo "🐳 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Cria diretório do bot
echo "📁 Criando diretório do bot..."
mkdir -p ~/pochi-bot
cd ~/pochi-bot

# Clona o repositório (substitua pela sua URL)
echo "📥 Clonando repositório..."
# git clone https://github.com/seu-usuario/pochi-bot.git .

# Configura PM2 para iniciar com o sistema
echo "⚙️ Configurando PM2..."
pm2 startup
pm2 save

echo "✅ Setup da VPS concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure os secrets no GitHub:"
echo "   - VPS_HOST: IP da sua VPS"
echo "   - VPS_USERNAME: usuário da VPS"
echo "   - VPS_SSH_KEY: chave SSH privada"
echo "   - BOT_PATH: /home/usuario/pochi-bot"
echo "   - DISCORD_WEBHOOK: webhook do Discord (opcional)"
echo ""
echo "2. Clone seu repositório:"
echo "   git clone https://github.com/seu-usuario/pochi-bot.git ."
echo ""
echo "3. Configure o .env com suas credenciais"
echo ""
echo "4. Faça push para o repositório para testar o deploy!"
