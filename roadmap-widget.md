# 📱 CycleCal — roadmap-widget.md

## 🎯 Objetivo

Desenvolver um widget Android para o CycleCal que permita ao usuário visualizar rapidamente o status do dia (TRABALHO / FOLGA) diretamente na tela inicial, sem abrir o app.

---

## 📦 Escopo do MVP (v2.0.0)

### ✅ Incluído
- Exibir data atual (ex: `30 MAR`)
- Exibir status do dia (TRABALHO / FOLGA)
- Atualização automática diária
- Clique abre o app

### ❌ Fora do MVP
- Backend / SaaS
- Login
- Sincronização em nuvem
- Configuração de escala via UI
- Notificações

---

## 🧭 Fases de Desenvolvimento

---

## 🔹 FASE 0 — Definição

- [ ] Confirmar escopo do MVP
- [ ] Definir formato de data (ex: `30 MAR`)
- [ ] Definir nomenclatura:
  - TRABALHO
  - FOLGA
- [ ] Definir comportamento ao clicar (abrir app)

---

## 🔹 FASE 1 — Setup do Projeto

- [ ] Criar projeto no Android Studio
  - Nome: `cyclecal-widget`
  - Linguagem: Kotlin
- [ ] Criar `MainActivity`
- [ ] Build inicial OK

---

## 🔹 FASE 2 — Estrutura do Widget

- [ ] Criar App Widget:
  - New → Widget → App Widget
- [ ] Arquivos gerados:
  - [ ] `CycleCalWidget.kt`
  - [ ] `widget_cyclecal.xml`
  - [ ] `appwidget-provider.xml`

---

## 🔹 FASE 3 — Layout (UI)

### Objetivo
Interface minimalista, limpa e legível.

- [ ] Criar layout base:
  - [ ] TextView (data)
  - [ ] TextView (status)
- [ ] Ajustar:
  - [ ] Tamanho de fonte
  - [ ] Alinhamento
  - [ ] Espaçamento

### Estrutura esperada:
```
30 MAR
TRABALHO
```

---

## 🔹 FASE 4 — Lógica Inicial (Pipeline)

### Objetivo
Validar funcionamento do widget.

- [ ] Implementar `onUpdate()`
- [ ] Obter data atual (`LocalDate.now()`)
- [ ] Exibir data no widget
- [ ] Hardcode status: "TRABALHO"
- [ ] Atualizar widget corretamente

---

## 🔹 FASE 5 — Lógica do CycleCal

### Objetivo
Integrar regra real de cálculo.

- [ ] Identificar função JS atual
- [ ] Isolar lógica de cálculo de status
- [ ] Traduzir para Kotlin
- [ ] Criar função:

```kotlin
fun getStatus(date: LocalDate): String
```

- [ ] Testar com datas conhecidas
- [ ] Validar consistência com versão web

---

## 🔹 FASE 6 — Interação

- [ ] Implementar clique no widget:
  - [ ] Abrir `MainActivity`
- [ ] (Opcional futuro)
  - [ ] Deep link para data atual

---

## 🔹 FASE 7 — Atualização Automática

### MVP
- [ ] Usar `updatePeriodMillis` (24h)

### Futuro (melhor precisão)
- [ ] Implementar `WorkManager` ou `AlarmManager`

---

## 🔹 FASE 8 — Testes

### Funcional
- [ ] Widget aparece na tela
- [ ] Data correta
- [ ] Status correto
- [ ] Clique funciona

### Temporal
- [ ] Simular mudança de dia
- [ ] Validar atualização

---

## 🔹 FASE 9 — Integração com App

- [ ] Definir comportamento ao abrir:
  - [ ] WebView OU
  - [ ] Abrir URL do CycleCal (GitHub Pages)

---

## 🔹 FASE 10 — Validação com Usuário

- [ ] Teste próprio
- [ ] Teste com usuário real (ex: Fábio)

### Perguntas-chave:
- [ ] É útil sem abrir o app?
- [ ] Informação clara?
- [ ] Consultaria diariamente?

---

## 🏷️ Versionamento

v2.0.0 — Widget Android (MVP)

---

## 🔮 Roadmap Futuro (SaaS)

- [ ] Persistência local (SharedPreferences)
- [ ] Configuração de escala via app
- [ ] Backend (SaaS)
- [ ] Sincronização multi-dispositivo
- [ ] Widget expandido
- [ ] Notificações inteligentes

---

## ⚠️ Riscos / Atenções

- Atualização automática pode ser limitada pelo sistema Android
- Diferenças entre lógica JS e Kotlin
- Performance do widget (manter leve)

---

## ✅ Estratégia de Execução

1. Fazer widget aparecer
2. Fazer widget atualizar
3. Mostrar dado simples (hardcode)
4. Integrar lógica real
5. Testar antes de evoluir

---

## 🧠 Princípios

- Incremental e testável
- Evitar complexidade prematura
- Validar valor antes de expandir
- Priorizar clareza visual
