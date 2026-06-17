# Guia de Deploy - Briefing Parametrizado

Instruções para fazer deploy da aplicação em diferentes plataformas.

## 🚀 Preparação

Antes de fazer deploy:

```bash
# 1. Build otimizado
npm run build

# 2. Testar build localmente
npm install -g serve
serve -s build

# 3. Verificar em http://localhost:3000
```

## 📦 Vercel (Recomendado)

**Vantagens**: Grátis, automático, rápido, ótimo para React

### Via CLI
```bash
# Instale Vercel CLI
npm install -g vercel

# Deploy
vercel

# Siga as instruções
# - Selecione projeto
# - Confirme build settings
# - Deploy completo
```

### Via GitHub
1. Push seu código para GitHub
2. Vá para [vercel.com](https://vercel.com)
3. "New Project" → Conecte seu repo
4. Deploy automático a cada push

**Variáveis de ambiente** (se usar):
```
REACT_APP_ENV=production
REACT_APP_API_URL=https://api.example.com
```

### Resultado
```
✓ Deploy completo
✓ URL: https://seu-projeto.vercel.app
✓ SSL automático
✓ CDN global
```

---

## 🔷 Netlify

**Vantagens**: Grátis, simples, bom suporte

### Via Dashboard
1. Vá para [netlify.com](https://netlify.com)
2. "Add new site" → "Import an existing project"
3. Conecte seu GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build/`
5. Deploy

### Via CLI
```bash
# Instale Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Siga as instruções
```

**netlify.toml** (opcional, mas recomendado):
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  REACT_APP_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ☁️ AWS S3 + CloudFront

**Para maior controle e escala**

### Setup

```bash
# 1. Instale AWS CLI
npm install -g awscli

# 2. Configure credenciais
aws configure

# 3. Build
npm run build

# 4. Upload para S3
aws s3 sync build/ s3://seu-bucket-name --delete

# 5. Invalidate CloudFront (se usar)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::seu-bucket-name/*"
    }
  ]
}
```

### CloudFront Distribution
- Origin: seu bucket S3
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Default Root Object: index.html
- Error responses: 404 → /index.html (status 200)

---

## 🐳 Docker + Heroku

**Para máximo controle**

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
```

### Deploy Heroku
```bash
# Login
heroku login

# Criar app
heroku create seu-app-name

# Deploy via Git
git push heroku main

# Ver logs
heroku logs --tail
```

### Heroku Procfile
```
web: npm run build && serve -s build -l $PORT
```

---

## 🟢 GitHub Pages

**Grátis, ideal para demonstração**

### Setup

1. **package.json** - Adicione:
```json
{
  "homepage": "https://seu-usuario.github.io/briefing-form",
  "devDependencies": {
    "gh-pages": "^6.0.0"
  },
  "scripts": {
    "deploy": "npm run build && gh-pages -d build"
  }
}
```

2. **Deploy**:
```bash
npm install gh-pages --save-dev
npm run deploy
```

3. **GitHub Settings**:
   - Vá para Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

**Resultado**: `https://seu-usuario.github.io/briefing-form`

---

## 📋 Checklist de Deploy

Antes de fazer deploy em produção:

- [ ] Teste local (`npm start`)
- [ ] Build completo sem erros (`npm run build`)
- [ ] Teste build localmente (`serve -s build`)
- [ ] Remova console.logs desnecessários
- [ ] Verifique variáveis de ambiente
- [ ] Teste responsividade (mobile/tablet/desktop)
- [ ] Teste exportação de arquivo .txt
- [ ] Teste em navegadores modernos
- [ ] Lighthouse score acima de 90
- [ ] Sem erros no console
- [ ] Meta tags corretas
- [ ] Favicon configurado
- [ ] SSL/HTTPS ativado

---

## 🔄 CI/CD Automatizado

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📊 Monitoramento Pós-Deploy

### Ferramentas Recomendadas

1. **Google Analytics**
   - Rastrear usuários
   - Ver páginas mais acessadas
   - Bounce rate, duração sessão

2. **Sentry** (opcional)
   - Rastreamento de erros
   - Performance monitoring
   - Alertas automáticos

3. **Lighthouse**
   - Performance
   - Accessibility
   - Best practices
   - SEO

### Integração Sentry (opcional)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV,
  tracesSampleRate: 0.1,
});
```

---

## 🔐 Variáveis de Ambiente Produção

```bash
REACT_APP_ENV=production
REACT_APP_FORM_TITLE=Briefing Parametrizado
REACT_APP_COMPANY_NAME=Wee Make
# REACT_APP_SENTRY_DSN=https://...@sentry.io/...
# REACT_APP_GA_ID=G-...
```

---

## 🆘 Troubleshooting

### Build falha
```bash
# Limpe cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Aplicação em branco após deploy
- Verifique `homepage` em package.json
- Verifique caminhos de assets
- Verifique console para erros

### Lento após deploy
- Ative Gzip em servidor
- Use CDN
- Comprima imagens
- Verifique bundle size: `npm run build -- --analyze`

### Problemas de CORS
- Configure headers adequadamente
- Use proxy em desenvolvimento
- Verifique origens permitidas

---

## 📈 Performance

### Otimizações sugeridas

1. **Bundle Size**
   ```bash
   npm run build
   # Veja tamanho em "build/" folder
   ```

2. **Code Splitting** (futuro)
   ```javascript
   const WeeMakeForm = lazy(() => import('./components/WeeMakeForm'));
   ```

3. **Image Optimization**
   - Use WebP format
   - Comprima imagens
   - Use lazy loading

4. **Caching**
   - Vercel/Netlify: automático
   - Service Worker: offline support

---

## 📞 Suporte Deploy

Para dúvidas:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [AWS Docs](https://docs.aws.amazon.com)
- [GitHub Pages Docs](https://pages.github.com)

---

**Versão**: 1.0.0  
**Última atualização**: 2024
