# ✅ Checklist de Deploy - Score 2026 no Render

## 📋 Antes de Começar

- [x] Projeto criado no GitHub: https://github.com/aumentascore2026/score2026
- [x] Build testado localmente (funcionando)
- [x] Código commitado e feito push para o GitHub

---

## 🚀 Configuração no Render

### Passo 1: Acessar o Render
- [ ] Acesse: https://render.com
- [ ] Faça login com sua conta GitHub
- [ ] Clique em "New +" → "Web Service"

### Passo 2: Conectar o Repositório
- [ ] Selecione: `aumentascore2026/score2026`
- [ ] Branch: `main`
- [ ] Clique em "Connect"

### Passo 3: Preencher Configurações

**Name:**
- [ ] `score2026`

**Language:**
- [ ] `Node` (já deve estar selecionado)

**Region:**
- [ ] `Virginia (US East)` ou próximo a você

**Build Command:**
- [ ] Apague o que está lá
- [ ] Cole: `pnpm install --frozen-lockfile && pnpm build`
- [ ] Verifique se ficou exatamente assim

**Start Command:**
- [ ] Apague o que está lá
- [ ] Cole: `npm start`
- [ ] Verifique se ficou exatamente assim

### Passo 4: Variáveis de Ambiente (Opcional)
- [ ] NODE_ENV = `production`

### Passo 5: Escolher Plano
- [ ] **Free** ($0/mês) - Para começar
- [ ] **Starter** ($7/mês) - Recomendado

---

## 🎬 Deploy

- [ ] Clique em **"Deploy web service"** (botão azul)
- [ ] Aguarde 2-5 minutos
- [ ] Veja a mensagem: ✅ **"Your service is live"**

---

## ✨ Depois do Deploy

- [ ] Acesse: `https://score2026.onrender.com`
- [ ] Teste a página de simulação de score
- [ ] Digite um CPF e clique em "Simular Score"
- [ ] Veja o termômetro subir
- [ ] Veja as notificações flutuantes aparecerem
- [ ] Veja o modal de sucesso

---

## 🔗 Links Importantes

| Item | Link |
|------|------|
| **Dashboard Render** | https://dashboard.render.com |
| **Seu Site** | https://score2026.onrender.com |
| **GitHub** | https://github.com/aumentascore2026/score2026 |
| **Logs** | Dashboard → score2026 → Logs |

---

## 🐛 Se Algo Não Funcionar

### Build falhou?
1. Vá para "Logs" no Render
2. Procure por mensagens de erro em vermelho
3. Copie o erro e me mande

### Site mostra erro branco?
1. Abra o Console (F12)
2. Veja se há mensagens de erro
3. Verifique as variáveis de ambiente

### Porta não está disponível?
- Não se preocupe! O Render detecta automaticamente

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique os logs no Render
2. Consulte: https://render.com/docs
3. Me mande uma mensagem com o erro

---

**Você está pronto! Boa sorte com o deploy! 🚀**
