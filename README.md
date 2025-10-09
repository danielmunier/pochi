# 🤖 Pochi Bot - Discord Bot Escalável

Um bot Discord moderno e escalável, construído com TypeScript e arquitetura preparada para evolução para microserviços Python.

## 🚀 Características Principais

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

## 📋 Eventos Capturados

### 👥 **Membros**
- Entrada no servidor
- Saída do servidor
- Atualizações de perfil

### 🎵 **Canais de Voz**
- Entrada em canal de voz
- Saída de canal de voz
- Mudança entre canais
- Mudanças de estado (mute, deafen, stream, etc.)

### 💬 **Mensagens**
- Mensagens deletadas
- Mensagens editadas
- Reações em mensagens

## 🚀 Como Usar

### 1. **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pochi-py.git
cd pochi-py

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

## 🏗️ Arquitetura Atual

```
src/
├── commands/           # Comandos slash organizados por categoria
│   ├── economy/       # Sistema de economia
│   ├── general/       # Comandos gerais
│   ├── moderation/    # Comandos de moderação
│   └── music/         # Sistema de música
├── events/            # Eventos do Discord
│   ├── guildMemberAdd.ts
│   ├── voiceStateUpdate.ts
│   └── ...
├── services/          # Serviços de negócio
│   ├── loggingService.ts
│   ├── economyService.ts
│   └── ...
├── utils/             # Utilitários
│   ├── commandHandler.ts
│   ├── eventHandler.ts
│   └── guildManager.ts
└── main.ts           # Ponto de entrada
```

## 🔄 Evolução para Microserviços

A arquitetura atual foi projetada para facilitar a migração para microserviços Python:

### **Arquitetura Atual (Monolítica)**
```
┌─────────────────────────────────────┐
│           Discord Bot               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ Logging │ │Economy  │ │ Music   ││
│  │Service  │ │Service  │ │Service  ││
│  └─────────┘ └─────────┘ └─────────┘│
└─────────────────────────────────────┘
```

### **Arquitetura Futura (Microserviços)**
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Discord   │    │   Logging   │    │  Economy    │
│    Bot      │◄──►│  Service    │◄──►│  Service    │
│ (Gateway)   │    │  (Python)   │    │  (Python)   │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                   ┌─────────────┐
                   │   Message   │
                   │   Broker    │
                   │ (Redis/RMQ) │
                   └─────────────┘
```

### **Vantagens da Arquitetura Atual**

1. **Serviços Independentes**: Cada serviço tem responsabilidade única
2. **Interfaces Bem Definidas**: Fácil extração para APIs REST/gRPC
3. **Event-Driven**: Sistema baseado em eventos facilita comunicação assíncrona
4. **Configuração Centralizada**: Fácil migração de configurações
5. **Logging Unificado**: Sistema de logs já preparado para múltiplos serviços

### **Plano de Migração**

1. **Fase 1**: Extrair `LoggingService` para microserviço Python
2. **Fase 2**: Migrar `EconomyService` para microserviço Python
3. **Fase 3**: Extrair `MusicService` para microserviço Python
4. **Fase 4**: Implementar message broker (Redis/RabbitMQ)
5. **Fase 5**: Bot vira apenas gateway de comandos

## 🛠️ Tecnologias

- **TypeScript**: Linguagem principal
- **Discord.js**: Biblioteca do Discord
- **Bun**: Runtime e package manager
- **Prisma**: ORM para banco de dados
- **Docker**: Containerização

## 📊 Comandos Disponíveis

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

## 🔧 Configuração

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

## 🚀 Deploy

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

## 📈 Roadmap

- [ ] **v1.1**: Sistema de permissões avançado
- [ ] **v1.2**: Dashboard web para configuração
- [ ] **v2.0**: Migração para microserviços Python
- [ ] **v2.1**: API REST para integrações
- [ ] **v2.2**: Sistema de plugins
- [ ] **v3.0**: Interface web completa

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- **Discord**: [Servidor de Suporte](https://discord.gg/seu-servidor)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/pochi-py/issues)
- **Documentação**: [Wiki](https://github.com/seu-usuario/pochi-py/wiki)

---

**Desenvolvido com ❤️ para a comunidade Discord**