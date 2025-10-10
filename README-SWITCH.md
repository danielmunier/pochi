# 🌐 Sistema de Alternância de README

Este projeto possui READMEs em dois idiomas e um sistema para alternar entre eles facilmente.

## 📁 Arquivos de README

- **`README.md`** - README principal (atualmente em português)
- **`README-en.md`** - README em inglês
- **`README-main.md`** - Página de seleção de idioma
- **`README-backup.md`** - Backup automático (criado quando necessário)

## 🚀 Como Usar

### Método 1: Scripts NPM/Bun

```bash
# Ativar README em português
bun run readme:pt

# Ativar README em inglês  
bun run readme:en

# Mostrar ajuda
bun run readme:switch
```

### Método 2: Script Direto

```bash
# Ativar português
node switch-readme.js pt

# Ativar inglês
node switch-readme.js en

# Mostrar ajuda
node switch-readme.js --help
```

### Método 3: Navegação Manual

1. **Via GitHub**: Use os links no topo de cada README
2. **Via README-main.md**: Acesse a página de seleção de idioma

## 🔄 Como Funciona

1. **Backup Automático**: Quando você alterna para inglês, o README.md atual é salvo como `README-backup.md`
2. **Substituição**: O arquivo de destino é copiado para `README.md`
3. **Preservação**: Os arquivos originais (`README.md` e `README-en.md`) são preservados

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `bun run readme:pt` | Ativa README em português |
| `bun run readme:en` | Ativa README em inglês |
| `bun run readme:switch` | Mostra ajuda do sistema |
| `node switch-readme.js pt` | Ativa português (script direto) |
| `node switch-readme.js en` | Ativa inglês (script direto) |
| `node switch-readme.js --help` | Mostra ajuda detalhada |

## 🎯 Recomendações

- **Para desenvolvimento**: Use `README.md` em português
- **Para documentação pública**: Use `README-en.md` em inglês
- **Para GitHub Pages**: Use `README-main.md` como página inicial

## 🔧 Personalização

Para adicionar mais idiomas:

1. Crie um novo arquivo `README-[idioma].md`
2. Adicione o idioma no objeto `readmeFiles` em `switch-readme.js`
3. Atualize os links nos READMEs existentes

## 📝 Notas

- O sistema preserva todos os arquivos originais
- Backups são criados automaticamente quando necessário
- Os links de navegação funcionam tanto localmente quanto no GitHub
- O README principal (`README.md`) é sempre o que aparece no GitHub por padrão
