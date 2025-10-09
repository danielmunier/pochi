# Pochi Bot 🤖

Bot Discord com arquitetura de microserviços, preparado para evoluir de TypeScript para Python.

## 🚀 Características

- ✅ **Slash Commands** - Interface nativa do Discord
- ✅ **Auto-loading** - Comandos e eventos carregados automaticamente
- ✅ **Microserviços** - Preparado para APIs Python
- ✅ **TypeScript** - Type safety e melhor desenvolvimento
- ✅ **Bun** - Runtime rápido e moderno
- ✅ **Docker** - Deploy fácil

## 📁 Estrutura do Projeto

```
pochi-bot/
├── src/
│   ├── commands/           # Slash Commands
│   │   ├── moderation/     # Comandos de moderação
│   │   ├── music/          # Comandos de música
│   │   └── economy/        # Comandos de economia
│   ├── events/             # Eventos do Discord
│   ├── services/           # Clientes para APIs Python
│   ├── utils/              # Utilitários (handlers)
│   └── main.ts             # Ponto de entrada
├── services/               # Microserviços Python (futuro)
├── docker-compose.yml      # Orquestração
└── package.json
```

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone <seu-repo>
cd pochi-bot
```

### 2. Instale o Bun
```bash
curl -fsSL https://bun.sh/install | bash
```

### 3. Instale dependências
```bash
bun install
```

### 4. Configure variáveis de ambiente
```bash
cp env.example .env
# Edite o .env com suas configurações
```

### 5. Execute o bot
```bash
# Desenvolvimento
bun run dev

# Produção
bun run build
bun run start
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
DISCORD_TOKEN=seu_token_discord
CLIENT_ID=seu_client_id
GUILD_ID=seu_guild_id  # Opcional para desenvolvimento
```


## 📋 Comandos Disponíveis

### 🛡️ Moderação
- `/ban <user> [reason]` - Bane um usuário
- `/kick <user> [reason]` - Expulsa um usuário

### 🎵 Música
- `/play <song>` - Toca uma música

### 💰 Economia
- `/balance [user]` - Verifica saldo

## 🏗️ Arquitetura

### Atual (TypeScript)
```
Discord Bot (TypeScript)
├── Slash Commands
├── Event Handlers
└── Service Clients (preparados para Python)
```

### Futuro (Microserviços)
```
Discord Bot (Gateway)
├── Moderation Service (Python)
├── Music Service (Python)
├── Economy Service (Python)
└── Event Bus (Redis)
```

## 🐳 Docker

### Desenvolvimento
```bash
docker-compose up -d
```

### Produção
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 Roadmap

- [x] Bot TypeScript básico
- [x] Slash Commands
- [x] Auto-loading de comandos/eventos
- [x] Estrutura para microserviços
- [ ] Serviços Python (FastAPI)
- [ ] Event Bus (Redis)
- [ ] Database (PostgreSQL)
- [ ] Deploy automatizado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique as [Issues](../../issues) existentes
2. Crie uma nova issue se necessário
3. Entre em contato via Discord

---

**Desenvolvido com ❤️ para a comunidade Discord**
