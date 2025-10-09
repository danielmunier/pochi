# Dockerfile para o bot Discord
FROM oven/bun:1 as base
WORKDIR /app

# Instala dependências
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copia código fonte
COPY . .

# Build do TypeScript
RUN bun run build

# Comando para executar
CMD ["bun", "run", "start"]
