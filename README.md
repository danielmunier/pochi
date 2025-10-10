<a name="top"></a>

<div align="center">
  <a href="README.md">🇧🇷 </a> 
  <a href="README-en.md">🇺🇸 </a>
  <br><br>
</div>

[![Pochi Bot](https://raw.githubusercontent.com/danielmunier/pochi/main/public/pochita-banner.jpg)](https://github.com/danielmunier/pochi)


[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0%2B-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Private](https://img.shields.io/badge/Private-Project-red.svg)](https://github.com/danielmunier/pochi)
[![GitHub release](https://img.shields.io/github/v/release/danielmunier/pochi)](#)
[![GitHub last commit](https://img.shields.io/github/last-commit/danielmunier/pochi)](#)
[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?logo=discord&logoColor=white)](https://discord.gg/grX8THxJ)

⭐ Star us on GitHub — your support motivates us a lot! 🙏😊

[![Share](https://img.shields.io/badge/share-000000?logo=x&logoColor=white)](https://x.com/intent/tweet?text=Check%20out%20this%20Discord%20bot%20on%20GitHub:%20https://github.com/danielmunier/pochi%20%23DiscordBot%20%23TypeScript%20%23OpenSource)
[![Share](https://img.shields.io/badge/share-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/danielmunier/pochi)
[![Share](https://img.shields.io/badge/share-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/danielmunier/pochi)
[![Share](https://img.shields.io/badge/share-FF4500?logo=reddit&logoColor=white)](https://www.reddit.com/submit?title=Check%20out%20this%20Discord%20bot%20on%20GitHub:%20https://github.com/danielmunier/pochi)

🔥 **Pochi Bot** - Um bot Discord moderno e escalável, construído com TypeScript e arquitetura preparada para evolução para microserviços

## 📋 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Commands](#-commands)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Support](#-support)

## 🚀 About

**Pochi Bot** é um bot Discord moderno e escalável, construído com TypeScript e arquitetura preparada para evolução para microserviços Python. Ele adere a altos padrões de flexibilidade, reutilização e confiabilidade.

### **Principais Benefícios:**
- **Modularidade**: Diferentes partes do bot podem funcionar independentemente, melhorando a modularidade e facilitando manutenção e atualizações.
- **Testabilidade**: Melhor separação de responsabilidades torna o código mais testável.
- **Manutenibilidade**: Estrutura clara e separação facilitam melhor gerenciamento do código.
- **Escalabilidade**: Arquitetura preparada para migração para microserviços Python.

O bot também suporta Injeção de Dependência através do container DI padrão, auxiliando na organização e gerenciamento do código. Especificamente projetado para integração perfeita com Discord.js, o Pochi Bot emprega classes de serviço padrão, binding e mecanismos de roteamento, simplificando a integração de funcionalidades avançadas em seus servidores.

## ✨ Features

### 🎯 **Sistema de Logs Avançado**
- **Multi-Guild**: Cada servidor tem seu próprio canal de logs
- **Eventos Completos**: Captura entrada/saída de membros, eventos de voz, mensagens, etc.
- **Configuração Fácil**: Comando slash para configurar canais de logs
- **Embeds Bonitos**: Logs formatados com cores e informações detalhadas

### 🏗️ **Arquitetura Escalável**
- **Modular**: Serviços independentes e reutilizáveis
- **Preparado para Microserviços**: Fácil migração para Python
- **Event-Driven**: Sistema baseado em eventos
- **Multi-Tenant**: Suporte a múltiplos servidores simultâneos

### 🛠️ **Funcionalidades Atuais**
- **Comandos de Moderação**: Ban, kick, logs
- **Sistema de Economia**: Balance e transações
- **Sistema de Música**: Reprodução de áudio
- **Comandos Gerais**: Ping, pong, testlog
- **Sistema de Logs**: Captura todos os eventos do Discord


## 🚀 Getting Started

### 1. **Instalação**
```bash
# Clone o repositório
git clone https://github.com/danielmunier/pochi.git
cd pochi

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp env.example .env
# Edite o .env com seu token do Discord
```

### 2. **Configuração**
```bash
# Compile o projeto
bun run build

# Inicie o bot
bun run start
```

### 3. **Configurar Logs**
Use o comando slash para configurar o canal de logs em cada servidor:
```
/setlogchannel canal:#logs
```


## 🛠️ Technologies

- **TypeScript**: Linguagem principal
- **Discord.js**: Biblioteca do Discord
- **Bun**: Runtime e package manager
- **Prisma**: ORM para banco de dados
- **Docker**: Containerização

## 📊 Commands

### **Moderação**
- `/ban` - Banir usuário
- `/kick` - Expulsar usuário
- `/setlogchannel` - Configurar canal de logs

### **Economia**
- `/balance` - Ver saldo do usuário

### **Música**
- `/play` - Reproduzir música

### **Geral**
- `/ping` - Testar latência
- `/pong` - Resposta ao ping
- `/testlog` - Testar sistema de logs

## 🔧 Configuration

### **Variáveis de Ambiente**
```env
DISCORD_TOKEN=seu_token_aqui
DATABASE_URL=postgresql://user:pass@localhost:5432/pochi
```

### **Intents Necessárias**
- `Guilds` - Informações básicas
- `GuildMembers` - Eventos de membros
- `GuildMessages` - Eventos de mensagens
- `GuildVoiceStates` - Estados de voz
- `MessageContent` - Conteúdo das mensagens

## 🚀 Deployment

### **Docker**
```bash
# Build da imagem
docker build -t pochi-bot .

# Executar container
docker run -d --name pochi-bot pochi-bot
```

### **Docker Compose**
```bash
# Iniciar todos os serviços
docker-compose up -d
```


## 🆘 Support

- **Discord**: [Servidor de Suporte](https://discord.gg/grX8THxJ)
- **Issues**: [GitHub Issues](https://github.com/danielmunier/pochi/issues)
- **Documentação**: [Wiki](https://github.com/danielmunier/pochi/wiki)

---

**Desenvolvido com ❤️ para a comunidade Discord**

[Back to top](#top)