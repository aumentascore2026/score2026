# 🚀 Configurar UptimeRobot para Manter Render Acordado

## O Problema

O Render coloca serviços gratuitos em modo de "soneca" (sleep) após 15 minutos de inatividade. Isso causa lentidão ao acessar o site pela primeira vez.

## A Solução

Use **UptimeRobot** (gratuito) para fazer ping a cada 1 minuto e manter seu Render sempre acordado!

---

## ✅ Passo a Passo

### 1. Acesse UptimeRobot
- Vá para: https://uptimerobot.com/
- Clique em **"Sign Up"** (canto superior direito)
- Crie uma conta gratuita

### 2. Crie um Monitor
- Após fazer login, clique em **"Add New Monitor"**
- Escolha o tipo: **"HTTP(s)"**
- Preencha os dados:

| Campo | Valor |
|-------|-------|
| **Monitor Name** | Score 2026 Keep Alive |
| **URL** | `https://score2026.onrender.com` |
| **Monitor Type** | HTTP(s) |
| **Monitoring Interval** | 1 minute (cada 1 minuto) |

### 3. Configurações Adicionais
- **Alert Contacts:** Deixe em branco (opcional)
- **HTTP Method:** GET
- **Timeout:** 30 seconds

### 4. Salve o Monitor
- Clique em **"Create Monitor"**
- Pronto! UptimeRobot começará a fazer ping a cada 1 minuto

---

## 🎯 Resultado

✅ Seu site NUNCA mais vai dormir
✅ Acesso rápido 24/7
✅ Sem custo adicional
✅ Totalmente automático

---

## 📊 Verificar Status

1. Acesse seu dashboard do UptimeRobot
2. Veja o status do monitor "Score 2026 Keep Alive"
3. Se estiver verde = tudo funcionando!

---

## 💡 Dica Extra

Você também pode usar:
- **Pulsetic:** https://pulsetic.com/ (alternativa)
- **Cronitor:** https://cronitor.io/ (mais robusto)

Mas UptimeRobot é o mais simples e gratuito!

---

## ⚠️ Importante

O seu site já tem um ping interno (a cada 60 segundos), mas o UptimeRobot adiciona uma camada extra de proteção para garantir que o Render não durma.

**Configuração recomendada:**
- UptimeRobot: 1 minuto
- Ping interno: 60 segundos

Dessa forma, o Render receberá requisições a cada 30-60 segundos, garantindo que nunca durma!
