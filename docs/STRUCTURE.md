# Estrutura do Repositório - Briefing Parametrizado

```
wee-make-briefing-form/
│
├── 📁 .vscode/
│   └── extensions.json          # Extensões VS Code recomendadas
│
├── 📁 src/
│   ├── components/
│   │   └── WeeMakeForm.jsx       # Componente React principal (~800 linhas)
│   │
│   ├── index.css                 # Estilos globais + Tailwind
│   └── index.js                  # Entry point da aplicação
│
├── 📁 public/
│   └── index.html                # HTML principal
│
├── 📄 package.json               # Dependências e scripts
├── 📄 tailwind.config.js         # Configuração Tailwind CSS
├── 📄 postcss.config.js          # Configuração PostCSS
├── 📄 .gitignore                 # Padrões Git a ignorar
├── 📄 .env.example               # Variáveis de ambiente (template)
│
├── 📚 README.md                  # Documentação principal
├── 📚 TECHNICAL.md               # Documentação técnica
├── 📚 CONTRIBUTING.md            # Guia de contribuição
├── 📄 LICENSE                    # Licença MIT
│
└── 📋 CHANGELOG.md               # (Futuro) Histórico de versões

```

## 📦 Arquivos Principais

### Configuração & Dependências
- **package.json** - NPM dependencies, scripts (start, build, test)
- **tailwind.config.js** - Cores custom Wee Make, tipografia Inter
- **postcss.config.js** - Processamento CSS com Tailwind + Autoprefixer
- **.env.example** - Template de variáveis de ambiente

### Aplicação React
- **index.html** - HTML raiz com div#root
- **index.js** - ReactDOM render do componente WeeMakeForm
- **index.css** - Importação Tailwind, fonte Inter, resets globais

### Componente Principal
- **WeeMakeForm.jsx** - Componente funcional com:
  - Estado do formulário (31 campos)
  - Geração de 8 blocos Omnacoes
  - Exportação para .txt
  - Lógica condicional (show_prices, offer_scheduling)
  - Exemplos dinâmicos por segmento
  - Preview em tempo real

### Documentação
- **README.md** - Setup, usage, features, estrutura
- **TECHNICAL.md** - Arquitetura, state, funções, performance
- **CONTRIBUTING.md** - Guia para contribuições
- **LICENSE** - MIT License

### Git & IDE
- **.gitignore** - Node, build, IDE, OS files
- **.vscode/extensions.json** - Recomendações de extensões

## 🚀 Como Usar Este Repositório

### Clonar & Setup
```bash
git clone https://github.com/weemake/briefing-form.git
cd briefing-form
npm install
npm start
```

### Estrutura de Pastas Local
Após clonar, você terá:
```
briefing-form/
├── node_modules/
├── build/              (gerado após npm run build)
├── src/               (seu código)
├── public/
├── package.json
└── ... (configurações)
```

### Development
```bash
npm start              # Inicia em localhost:3000
npm run build          # Build para produção
npm test               # Executa testes (quando disponível)
```

## 📊 Resumo de Arquivos

| Arquivo | Linhas | Tipo | Propósito |
|---------|--------|------|-----------|
| WeeMakeForm.jsx | ~800 | React | Componente principal |
| README.md | ~250 | Docs | Documentação |
| TECHNICAL.md | ~300 | Docs | Arquitetura |
| CONTRIBUTING.md | ~350 | Docs | Contribuição |
| package.json | ~30 | Config | Dependências |
| index.js | ~10 | Config | Entry point |
| index.css | ~20 | CSS | Estilos globais |
| tailwind.config.js | ~20 | Config | Tailwind |
| postcss.config.js | ~10 | Config | PostCSS |
| **Total** | **~1.800** | - | - |

## 🎨 Paleta de Cores

```
Roxo Wee Make:    #7C3AED
Magenta:          #EC4899
Cinza Fundo:      #F3F4F6
Branco:           #FFFFFF
Cinza Escuro:     #1F2937
```

## 🔧 Stack Técnico

- **React 18** - UI Framework
- **Tailwind CSS 3** - Utility-first CSS
- **Lucide React** - Icons
- **PostCSS** - CSS Processing
- **Autoprefixer** - CSS Compatibility

## 📝 Convenções de Código

### Nomeação
```
Funções:     camelCase (generateOmnacoes)
Constantes:  UPPER_SNAKE_CASE (MAX_CHARS)
Componentes: PascalCase (WeeMakeForm)
Classes CSS: kebab-case (wee-purple)
```

### Estrutura de Componente
```javascript
const ComponenteName = () => {
  // 1. State hooks (useState, useCallback, etc)
  // 2. Efeitos (useEffect, useMemo, etc)
  // 3. Event handlers
  // 4. Render helpers
  // 5. Return JSX
};

export default ComponenteName;
```

## 🔄 Fluxo de Contribuição

1. Fork o repositório
2. Crie branch: `git checkout -b feature/sua-feature`
3. Develop & commit: `git commit -m "feat: descrição"`
4. Push: `git push origin feature/sua-feature`
5. Abra Pull Request
6. Code review & merge

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

## 📞 Suporte

- 📧 Email: contato@weemake.com.br
- 🌐 Website: https://weemake.com.br
- 💬 Issues: [GitHub Issues](https://github.com/weemake/briefing-form/issues)

---

**Versão**: 1.0.0  
**Última atualização**: 2024  
**Licença**: MIT
