# ⚡ Guia Rápido - 5 Minutos

Pronto para começar? Siga estes passos simples.

## 1️⃣ Clonar (1 minuto)

```bash
git clone https://github.com/weemake/briefing-form.git
cd briefing-form
```

## 2️⃣ Instalar (1 minuto)

```bash
npm install
```

## 3️⃣ Rodar Local (1 minuto)

```bash
npm start
```

Abre em `http://localhost:3000` automaticamente ✨

## 4️⃣ Testar (2 minutos)

1. Preenche o formulário com dados fictícios
2. Vê o preview dos 8 blocos atualizando em tempo real
3. Clica "Exportar para Omnacoes"
4. Arquivo `.txt` é baixado
5. Abre e verifica os 8 blocos

## ✅ Pronto!

Seu app está rodando local. Agora você pode:

- 📝 Modificar o código em `src/components/WeeMakeForm.jsx`
- 🎨 Ajustar cores em `tailwind.config.js`
- 📚 Ler docs em `README.md`
- 🚀 Deploy via `vercel` ou `netlify`

---

## 📦 Arquivos Principais

```
src/
├── components/
│   └── WeeMakeForm.jsx    ← Componente principal
├── index.css              ← Estilos
└── index.js               ← Entry point

package.json               ← Dependências
tailwind.config.js         ← Tema Wee Make
```

---

## 🚀 Deploy Rápido (Vercel)

```bash
# Instale (uma vez)
npm install -g vercel

# Deploy
vercel

# Pronto! ✨
```

Seu site estará live em minutos.

---

## 🆘 Problemas?

### npm install falha
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já está em uso
```bash
npm start -- --port 3001
```

### Build falha
```bash
npm run build
```

---

## 📖 Próximas Leituras

1. **README.md** - Overview completo
2. **TECHNICAL.md** - Como tudo funciona
3. **DEPLOY.md** - Deploy para produção
4. **CONTRIBUTING.md** - Contribuir ao projeto

---

## 💡 Dicas Rápidas

✅ **Hot reload**: Salve arquivo → app atualiza sozinho  
✅ **Console errors**: F12 → Console → vê logs  
✅ **Tailwind**: Qualquer classe do Tailwind funciona  
✅ **Preview**: Aberto por padrão, clique olho para esconder  

---

## 🎯 Fluxo Típico

```
User preenche formulário
         ↓
Preview atualiza (8 blocos)
         ↓
Clica "Exportar"
         ↓
Arquivo .txt baixado
         ↓
Copia cada bloco pro Omnacoes
         ↓
Chatbot criado! 🎉
```

---

**Tudo pronto! Divirta-se!** 🚀
