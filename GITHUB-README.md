# 🌐 README Multilíngue no GitHub

## 📋 **Resumo**

Este projeto possui READMEs em **português** e **inglês** com navegação automática no GitHub.

## 🎯 **Como Funciona no GitHub**

### ✅ **Navegação Manual (Funciona 100%)**
- **Links no topo**: Cada README tem links para alternar entre idiomas
- **README-main.md**: Página de seleção com botões visuais
- **Navegação direta**: Acesse `README.md` ou `README-en.md` diretamente

### ❌ **Scripts JavaScript (Só funcionam localmente)**
- `switch-readme.js` - Só funciona no seu computador
- `bun run readme:pt` - Só funciona localmente
- GitHub não executa scripts JavaScript

## 🚀 **Como Usar no GitHub**

### **Método 1: Links de Navegação**
1. Abra qualquer README
2. Clique nos links no topo:
   - 🇧🇷 **Português** → Vai para `README.md`
   - 🇺🇸 **English** → Vai para `README-en.md`

### **Método 2: Acesso Direto**
- **Português**: `https://github.com/danielmunier/pochi/blob/main/README.md`
- **Inglês**: `https://github.com/danielmunier/pochi/blob/main/README-en.md`
- **Seleção**: `https://github.com/danielmunier/pochi/blob/main/README-main.md`

### **Método 3: README Principal**
- Acesse `README-main.md` para página de seleção com botões grandes

## 🔧 **Para Desenvolvedores (Local)**

### **Scripts Locais (Funcionam no seu PC)**
```bash
# Ativar README em português
bun run readme:pt

# Ativar README em inglês  
bun run readme:en

# Script direto
node switch-readme.js pt
node switch-readme.js en
```

## 📁 **Estrutura de Arquivos**

```
📁 Projeto/
├── 📄 README.md          # README principal (português)
├── 📄 README-en.md       # README em inglês
├── 📄 README-main.md     # Página de seleção
├── 📄 README-SWITCH.md   # Documentação do sistema
├── 📄 switch-readme.js   # Script local (não funciona no GitHub)
└── 📄 GITHUB-README.md   # Este arquivo
```

## 🎯 **Recomendações**

### **Para Usuários do GitHub:**
- Use os **links de navegação** no topo de cada README
- Ou acesse `README-main.md` para seleção visual

### **Para Desenvolvedores:**
- Use os **scripts locais** para alternar rapidamente
- Mantenha ambos os READMEs atualizados

## 💡 **Dicas**

1. **GitHub sempre mostra `README.md`** por padrão
2. **Links funcionam perfeitamente** no GitHub
3. **Scripts são úteis** para desenvolvimento local
4. **README-main.md** é ótimo para apresentação

## 🔄 **Fluxo de Trabalho Recomendado**

1. **Desenvolvimento**: Use scripts locais para alternar
2. **Commit**: Mantenha ambos os READMEs atualizados
3. **GitHub**: Usuários usam links de navegação
4. **Apresentação**: Use README-main.md como entrada

---

**✅ Sistema funciona perfeitamente no GitHub via navegação manual!**
