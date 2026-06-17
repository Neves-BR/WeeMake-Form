# Guia de Contribuição

Obrigado por considerar contribuir para o projeto Briefing Parametrizado! Este documento fornece diretrizes e instruções para contribuir.

## Antes de Começar

- Verifique as [issues abertas](https://github.com/weemake/briefing-form/issues) para não duplicar esforços
- Leia o [README.md](./README.md) para entender o projeto
- Revise a [Documentação Técnica](./TECHNICAL.md)

## Como Contribuir

### Reportando Bugs

Ao reportar um bug, inclua:
- **Título claro e descritivo**
- **Descrição detalhada do problema**
- **Passos para reproduzir**
- **Comportamento esperado vs. atual**
- **Screenshots/vídeos** (se aplicável)
- **Ambiente**: navegador, versão do Node, SO

**Exemplo:**
```
Título: Campos de agendamento não aparecem quando offer_scheduling=true

Descrição: Ao selecionar "Sim" em "Oferecer agendamento?", a seção de agendamento não é renderizada.

Passos:
1. Preencher nome da empresa
2. Selecionar "Sim" em "Oferecer agendamento?"
3. Observar que seção não aparece

Esperado: Seção de agendamento deve aparecer abaixo
Atual: Nada acontece

Ambiente: Chrome 120, Windows 11, Node 18.17
```

### Sugerindo Features

Para sugerir uma feature:
- **Título claro**
- **Descrição detalhada**
- **Caso de uso / Problema que resolve**
- **Possível solução** (opcional)
- **Contexto adicional**

**Exemplo:**
```
Título: Adicionar persistência local (LocalStorage)

Descrição: Permitir que usuários salvem seus briefings como rascunho

Caso de uso: Lead preenche parcialmente e precisa sair; ao voltar, seus dados estão perdidos

Possível solução: Usar localStorage para auto-save a cada mudança no formulário
```

## Processo de Pull Request

### 1. Preparação

```bash
# Clone o repositório
git clone https://github.com/weemake/briefing-form.git
cd briefing-form

# Crie uma branch
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug-fix

# Instale dependências
npm install
```

### 2. Desenvolvimento

- Siga o estilo de código existente
- Use nomes descritivos para variáveis/funções
- Adicione comentários para lógica complexa
- Mantenha componentes pequenos e focados

**Boas práticas:**
```javascript
// ✅ BOM: Nome claro, comentário explicativo
const generateOmnacoesBriefing = () => {
  // Gera 8 blocos separados por delimitadores
  // Respeita limites de caracteres de cada bloco
  // ...
}

// ❌ RUIM: Nome vago, sem contexto
const gen = () => {
  // ...
}
```

### 3. Testes

```bash
# Teste sua feature localmente
npm start

# Execute testes (quando disponível)
npm test

# Build production
npm run build
```

**Checklist antes de submeter:**
- [ ] Funcionamento testado em navegadores modernos (Chrome, Firefox, Safari, Edge)
- [ ] Sem console errors/warnings
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Limites de caracteres respeitados
- [ ] Campos condicionais funcionam
- [ ] Exportação `.txt` funciona

### 4. Commit

```bash
# Use commits atômicos com mensagens claras
git commit -m "feat: adiciona persistência com localStorage"
git commit -m "fix: corrige renderização condicional de agendamento"
git commit -m "style: alinha espaçamento em cards"
```

**Formato sugerido:**
```
<tipo>(<escopo>): <descrição curta>

<descrição longa detalhada, se necessário>

<referência a issues>
```

**Tipos:**
- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação, sem mudança de lógica
- `refactor`: Refatoração sem mudança de comportamento
- `test`: Adição de testes
- `chore`: Atualização de dependências, etc

**Exemplos:**
```
feat(omnacoes): adiciona bloco de hallucination control

Adiciona novo bloco de "Hallucination Control" com 5000 caracteres
de limite. Inclui validação de palavras proibidas e tópicos.

Resolve #42
```

### 5. Push & Pull Request

```bash
# Push sua branch
git push origin feature/sua-feature
```

**Template de PR:**

```markdown
## Descrição
Breve descrição do que foi mudado.

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Issues Relacionadas
Resolve #123

## Como Testar
1. Passo 1
2. Passo 2
3. Verificar que...

## Checklist
- [ ] Código segue style guide
- [ ] Testei localmente
- [ ] Documentação atualizada
- [ ] Sem console errors
- [ ] Responsivo
```

## Padrões de Código

### Nomeação

```javascript
// Funções: camelCase, verbo + substantivo
generateOmnacoes()
handleInputChange()
exportBriefing()

// Constantes: UPPER_SNAKE_CASE
const MAX_CHARS_ROLE_DEF = 5000;
const INDUSTRIES = [...];

// Components: PascalCase
WeeMakeForm
BriefingCard

// CSS classes: kebab-case (Tailwind já cuida)
className="wee-purple-border text-sm font-semibold"
```

### Componentes React

```javascript
// ✅ BOM: Funcional, com hooks, bem estruturado
const WeeMakeForm = () => {
  const [formData, setFormData] = useState({...});
  
  const handleChange = (e) => {...};
  
  const generateOutput = useMemo(() => {...}, [formData]);
  
  return <div>...</div>;
};

export default WeeMakeForm;
```

### Estado

```javascript
// Use descritivos
const [formData, setFormData] = useState({
  company_name: '',
  industry: '',
  // ...
});

// Não
const [data, setData] = useState({...});
const [x, setX] = useState({...});
```

## Revisão de Código

Esperamos feedback construtivo. Ao revisar:
- Seja respeitoso
- Explique o "por quê"
- Sugira melhorias
- Aprove quando estiver bom

**Bom feedback:**
```
Sugestão: Esse `useMemo` não precisa de `formData` inteira como 
dependência. Vamos mudar para apenas `[formData.company_name, formData.industry]`
para evitar recálculos desnecessários quando outros campos mudam.
```

**Feedback ruim:**
```
Isso está errado.
```

## Documentação

Se sua mudança afeta funcionalidade pública:
- Atualize o [README.md](./README.md)
- Atualize a [Documentação Técnica](./TECHNICAL.md)
- Adicione comentários em código complexo

## Versioning

Seguimos [Semantic Versioning](https://semver.org/):
- `MAJOR`: Breaking changes
- `MINOR`: Novas features
- `PATCH`: Bug fixes

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [MIT License](./LICENSE).

## Dúvidas?

- Abra uma [Issue](https://github.com/weemake/briefing-form/issues)
- Entre em contato: contato@weemake.com.br

---

**Obrigado por contribuir! 💜**
