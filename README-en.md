<a name="top"></a>


[![Pochi Bot](https://raw.githubusercontent.com/danielmunier/pochi/main/public/pochita-banner.jpg)](https://github.com/danielmunier/pochi)

<div align="left">
  <a href="README.md">🇧🇷</a> 
  <a href="README-en.md">🇺🇸</a>
  <br><br>
</div>


[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0%2B-000000?logo=bun&logoColor=white)](https://bun.sh/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Private](https://img.shields.io/badge/Private-Project-red.svg)](https://github.com/danielmunier/pochi)
[![GitHub last commit](https://img.shields.io/github/last-commit/danielmunier/pochi)](#)
[![Discord](https://img.shields.io/badge/Discord-Join%20Server-5865F2?logo=discord&logoColor=white)](https://discord.gg/grX8THxJ)

⭐ Star us on GitHub — your support motivates us a lot! 🙏😊

[![Share](https://img.shields.io/badge/share-000000?logo=x&logoColor=white)](https://x.com/intent/tweet?text=Check%20out%20this%20Discord%20bot%20on%20GitHub:%20https://github.com/danielmunier/pochi%20%23DiscordBot%20%23TypeScript%20%23OpenSource)
[![Share](https://img.shields.io/badge/share-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/danielmunier/pochi)
[![Share](https://img.shields.io/badge/share-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/danielmunier/pochi)
[![Share](https://img.shields.io/badge/share-FF4500?logo=reddit&logoColor=white)](https://www.reddit.com/submit?title=Check%20out%20this%20Discord%20bot%20on%20GitHub:%20https://github.com/danielmunier/pochi)

🔥 **Pochi Bot** - A modern and scalable Discord bot built with TypeScript and architecture ready for microservices evolution.

## 📋 Table of Contents
- [About](#-about)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Commands](#-commands)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Support](#-support)

## 🚀 About

**Pochi Bot** is a modern and scalable Discord bot built with TypeScript and architecture ready for microservices evolution. It follows high standards of flexibility, reusability, and reliability, using well-known software design patterns including modular and hexagonal architectures.

### **Key Benefits:**
- **Modularity**: Different parts of the bot can function independently
- **Scalability**: Architecture prepared for Python microservices migration
- **Event-Driven**: System based on events for better performance
- **Multi-Tenant**: Support for multiple servers simultaneously

## ✨ Features

### 🎯 **Advanced Logging System**
- **Multi-Guild**: Each server has its own log channel
- **Complete Events**: Captures member join/leave, voice events, messages, etc.
- **Easy Setup**: Slash command to configure log channels
- **Beautiful Embeds**: Formatted logs with colors and detailed information

### 🏗️ **Scalable Architecture**
- **Modular**: Independent and reusable services
- **Microservices Ready**: Easy migration to Python
- **Event-Driven**: Event-based system
- **Multi-Tenant**: Multiple server support

### 🛠️ **Current Features**
- **Moderation Commands**: Ban, kick, logs
- **Economy System**: Balance and transactions
- **Music System**: Audio playback
- **General Commands**: Ping, pong, testlog
- **Logging System**: Captures all Discord events

## 🚀 Getting Started

### 1. **Installation**
```bash
# Clone the repository
git clone https://github.com/danielmunier/pochi.git
cd pochi

# Install dependencies
bun install

# Configure environment variables
cp env.example .env
# Edit .env with your Discord token
```

### 2. **Configuration**
```bash
# Build the project
bun run build

# Start the bot
bun run start
```

### 3. **Setup Logs**
Use the slash command to configure the log channel in each server:
```
/setlogchannel canal:#logs
```

## 📊 Commands

### **Moderation**
- `/ban` - Ban user
- `/kick` - Kick user
- `/setlogchannel` - Configure log channel

### **Economy**
- `/balance` - Check user balance

### **Music**
- `/play` - Play music

### **General**
- `/ping` - Test latency
- `/pong` - Ping response
- `/testlog` - Test logging system

## 🔧 Configuration

### **Environment Variables**
```env
DISCORD_TOKEN=your_token_here
DATABASE_URL=postgresql://user:pass@localhost:5432/pochi
```

### **Required Intents**
- `Guilds` - Basic information
- `GuildMembers` - Member events
- `GuildMessages` - Message events
- `GuildVoiceStates` - Voice states
- `MessageContent` - Message content

## 🚀 Deployment

### **Docker**
```bash
# Build image
docker build -t pochi-bot .

# Run container
docker run -d --name pochi-bot pochi-bot
```

### **Docker Compose**
```bash
# Start all services
docker-compose up -d
```

## 🆘 Support

- **Discord**: [Support Server](https://discord.gg/grX8THxJ)
- **Issues**: [GitHub Issues](https://github.com/danielmunier/pochi/issues)
- **Documentation**: [Wiki](https://github.com/danielmunier/pochi/wiki)

---

**Developed with ❤️ for the Discord community**

[Back to top](#top)
