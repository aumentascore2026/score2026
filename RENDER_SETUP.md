# 🚀 Guia de Configuração Score 2026 no Render

## Passo 1: Preencher os Campos no Render

Quando você estiver na tela de configuração do Render, preencha **EXATAMENTE** assim:

### Campo: Build Command
```
pnpm install --frozen-lockfile && pnpm build
```
**Copie e cole isso no campo "Build Command"**

### Campo: Start Command
```
npm start
```
**Copie e cole isso no campo "Start Command"**

---

## Passo 2: Configurar Variáveis de Ambiente

No Render, vá para a seção **"Environment Variables"** e adicione:

### Variáveis Obrigatórias:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `NODE_ENV` | `production` | Ambiente de produção |
| `PORT` | `3000` | Porta padrão (Render detecta automaticamente) |

### Se usar banco de dados (opcional):

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `DATABASE_URL` | `mysql://user:password@host/database` | URL de conexão MySQL |

---

## Passo 3: Configurações Recomendadas

| Campo | Recomendação |
|-------|--------------|
| **Instance Type** | `Free` (para começar) ou `Starter` ($7/mês) |
| **Region** | `Virginia (US East)` ou próximo a você |
| **Auto-deploy** | ✅ Ativar (faz deploy automático ao fazer push no GitHub) |

---

## Passo 4: Fazer o Deploy

1. Clique em **"Deploy web service"** (botão azul no final)
2. Aguarde o build (leva 2-5 minutos)
3. Quando terminar, você verá: ✅ **"Your service is live"**
4. Seu site estará em: `https://score2026.onrender.com`

---

## Passo 5: Verificar se Funcionou

Após o deploy:
1. Acesse `https://score2026.onrender.com`
2. Você deve ver a página do Score 2026
3. Teste a simulação de score

---

## ⚠️ Possíveis Problemas e Soluções

### Problema: Build falha com erro de dependências
**Solução:** Certifique-se que o `package.json` está correto:
```bash
pnpm install
pnpm build
```

### Problema: Aplicação inicia mas mostra erro branco
**Solução:** Verifique os logs no Render:
1. Vá para "Logs" na dashboard do Render
2. Procure por mensagens de erro
3. Verifique as variáveis de ambiente

### Problema: Porta 3000 não está disponível
**Solução:** O Render detecta automaticamente a porta. Não precisa fazer nada.

---

## 📝 Checklist Final

- [ ] Build Command preenchido: `pnpm install --frozen-lockfile && pnpm build`
- [ ] Start Command preenchido: `npm start`
- [ ] NODE_ENV = production
- [ ] Clicou em "Deploy web service"
- [ ] Aguardou 2-5 minutos
- [ ] Acessou o site e testou

---

## 🔗 Links Úteis

- **Dashboard Render:** https://dashboard.render.com
- **Documentação Render:** https://render.com/docs
- **GitHub do Projeto:** https://github.com/aumentascore2026/score2026

---

## 💡 Dicas

- O Render faz deploy automático quando você faz push no GitHub
- Você pode ver os logs em tempo real na dashboard
- Para atualizar o site, apenas faça `git push` no GitHub
- O Free tier do Render coloca a app em sleep após 15 min de inatividade (normal)

---

**Pronto! Seu Score 2026 estará online em poucos minutos! 🎉**
