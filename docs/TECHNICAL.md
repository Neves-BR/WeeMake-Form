# Documentação Técnica - Briefing Parametrizado

## 📐 Arquitetura

```
src/
├── components/
│   └── WeeMakeForm.jsx (Componente principal - ~800 linhas)
├── index.css (Estilos globais + Tailwind)
└── index.js (Entry point)
```

## 🏗️ Componentes

### WeeMakeForm.jsx

Componente React monolítico que gerencia:

#### Estado (formData)
```javascript
{
  company_name: string,
  industry: string,
  company_description: string,
  tone_type: string,
  brand_personality: array,
  core_values: string,
  brand_phrases: string,
  products_list: string,
  main_product: string,
  product_details: string,
  show_prices: boolean | null,
  pricing_strategy: string,
  price_ranges: string,
  offers_installments: string,
  target_audience: string,
  integrations: string,
  seasonality: string,
  success_stories: string,
  competitors: string,
  competitive_advantage: string,
  forbidden_topics: string,
  words_to_avoid: string,
  offer_scheduling: boolean | null,
  collect_leads: boolean | null,
  escalate_human: boolean | null,
  response_speed: string,
  scheduling_tool: string,
  scheduling_link: string,
  available_hours: string,
  additional_info: string,
  contact_method: string
}
```

#### Funções Principais

**generateOmnacoes()**: Gera os 8 blocos de texto plano
- Role Definition (5000 chars)
- About Company, Products and Services (10000 chars)
- Conversation Tone (5000 chars)
- Knowledge Base Guidelines (5000 chars)
- Hallucination Control (5000 chars)
- Human Escalation (5000 chars)
- Relevant Links (5000 chars)
- Interaction Examples (5000 chars)

**handleInputChange(e)**: Gerencia input e checkbox changes
- Atualiza formData no estado
- Suporta text, textarea, select, radio, checkbox

**exportBriefing()**: Exporta para arquivo `.txt`
- Cria blob com conteúdo
- Dispara download automático
- Nome: `briefing-omnacoes-{company_name}.txt`

#### Lógica Condicional

**Campos que aparecem/desaparecem:**
- `show_prices === true` → Mostra seção de Pricing
- `offer_scheduling === true` → Mostra seção de Agendamento

#### Examples Dinâmicos

Objeto `toneExamples` com:
- `generic`: Exemplo geral
- `saas`, `ecommerce`, `servicos`, etc: Exemplos por segmento

Quando o usuário seleciona um segmento, o exemplo correspondente é mostrado.

## 🎨 Styling

### Tailwind Configuration
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'wee-purple': '#7C3AED',
      'wee-magenta': '#EC4899',
      'wee-gray': '#F3F4F6',
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    },
  },
}
```

### Paleta de Cores
- **Roxo Principal**: #7C3AED (borders, botões)
- **Magenta/Rosa**: #EC4899 (borders alternados, gradiente)
- **Fundo Cinza**: #F3F4F6 (background geral)
- **Gradiente Header**: roxo → magenta

### Tipografia
- **Font**: Inter (importada via Google Fonts)
- **Tamanhos**:
  - h1: text-4xl (título principal)
  - h2: text-xl (seções)
  - label: text-sm (labels de campo)
  - help text: text-xs

## 📱 Responsividade

### Breakpoints Tailwind
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Layout Grid
```css
grid-cols-1        /* Mobile */
lg:grid-cols-3     /* Desktop: 2 colunas form + 1 coluna preview */
lg:grid-cols-2     /* Formulário */
lg:grid-cols-1     /* Preview sticky */
```

## 🔄 Fluxo de Dados

```
User Input
    ↓
handleInputChange()
    ↓
Atualiza formData (setState)
    ↓
useMemo(() => generateOmnacoes())
    ↓
Gera 8 blocos
    ↓
Preview atualiza em tempo real
    ↓
exportBriefing() → Download .txt
```

## 📦 Dependências

### Principais
- **react**: 18.2.0
- **react-dom**: 18.2.0
- **react-scripts**: 5.0.1
- **lucide-react**: 0.263.1 (Icons)
- **tailwindcss**: 3.3.0

### DevDependencies
- **autoprefixer**: 10.4.14
- **postcss**: 8.4.24

## 🚀 Performance

### Otimizações
1. **useMemo()** para memoizar geração de blocos
2. **Campos condicionais** para não renderizar desnecessariamente
3. **Tailwind CSS** (CSS-in-JS compilado em build)
4. **Event delegation** em checkboxes

### Bundle Size
Estimado: ~150KB (gzipped ~50KB após minificação)

## 🧪 Testes Sugeridos

```javascript
// Unit tests
- generateOmnacoes(): valida limites de caracteres
- handleInputChange(): atualiza state corretamente
- exportBriefing(): cria blob e dispara download

// Integration tests
- Preencher formulário → gera blocos corretos
- Selecionar show_prices=true → mostra seção pricing
- Selecionar offer_scheduling=true → mostra seção agendamento
- Exportar → arquivo contém 8 blocos separados

// E2E tests
- User journey completo: preencher → preview → exportar
```

## 🔐 Segurança

- **Sem API calls**: Tudo no client-side
- **Sem dados sensíveis salvos**: Tudo em memória
- **XSS protection**: React escapa automaticamente
- **Input validation**: Limites de caracteres aplicados

## 📈 Melhorias Futuras

1. **Persistência**: LocalStorage para salvar rascunhos
2. **Templates**: Salvar templates de briefing
3. **Múltiplos idiomas**: I18n para EN, ES, FR
4. **Dark mode**: Toggle de tema escuro/claro
5. **Integração API**: Enviar direto para Omnacoes API
6. **Histórico**: Visualizar briefings anteriores
7. **Colaboração**: Compartilhar formulário com time
8. **Analytics**: Rastrear campos mais preenchidos

## 🛠️ Debugging

### Console logs úteis
```javascript
// Ver estado atual
console.log(formData);

// Ver blocos gerados
console.log(omnacoesBriefing);

// Ver limites de caracteres
console.log(roleDef.length, '/5000');
```

### Erros comuns
1. **Blocos truncados**: Verificar limites de caracteres no `generateOmnacoes()`
2. **Preview não atualiza**: Verificar useMemo dependencies
3. **Campos não aparecem**: Verificar lógica condicional (show_prices, offer_scheduling)

## 📚 Referências

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- Omnacoes Docs: https://omnacoes.weemake.com.br (interno)

---

**Versão**: 1.0.0  
**Última atualização**: 2024  
**Mantido por**: Wee Make Team
