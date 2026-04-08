# CycleCal — Infraestrutura da Plataforma

Status: 🟢 v1.9.12b  
Base: v1.9.12b
Branch: main

> ⚠️ Infra restante (Fases 12–16) executa após conclusão de v2.x, v3.x e v4.x.

---

# Papel deste documento

Este documento descreve a evolução da infraestrutura técnica
da plataforma CycleCal.

Ele suporta todas as linhas de produto:

- v1.x — Core
- v2.x — Comércio
- v3.x — Segurança
- v4.x — Saúde

---

# 🧱 Fase 1 — Fundação Arquitetural (v1.9.0 → v1.9.4)

## Arquitetura

- [x] v1.9.0 — Separar motor de regras do calendário
- [x] v1.9.2 — Criar objeto central `config`
- [x] v1.9.3 — Implementar sistema de camadas (layers)
- [x] v1.9.4 — Definir modelo de dados baseado em parâmetros

## Modularização Frontend

- [x] Separar CSS do HTML
- [x] Criar pasta `/css`
- [x] Criar arquivo `styles.css`

- [x] Criar pasta `/js`
- [x] Separar lógica do calendário
- [x] Separar regras de eventos
- [x] Separar lógica de feriados
- [x] Separar lógica de férias

---

# 🎯 Fase 2 — Core Funcional (v1.9.1)

- [x] Contador de dias restantes para férias

---

# 📜 Fase 3 — Histórico de Dados

## Histórico de Escalas

- [x] Registrar mudanças de escala
- [x] Permitir alteração da base da escala sem alterar o histórico passado
- [x] Permitir consulta histórica

## Histórico de Plantões

- [x] Registrar histórico diário
- [x] Permitir consulta mensal

---

# ⚙️ Fase 4 — Motor de Regras (v1.9.5 → v1.9.6)

## v1.9.5 — Estrutura de Parâmetros da Escala

- [x] Definir modelo de dados da escala
- [x] Representar ciclos de trabalho como sequência de estados
- [x] Permitir padrões como `24x72`, `12x36`, `6x1`, `5x2`
- [x] Implementar parâmetro `offset`
- [x] Garantir compatibilidade com `base_date`
- [x] Validar cálculo correto ao navegar entre meses

## v1.9.6 — Geração Dinâmica do Calendário

- [x] Gerar calendário a partir dos parâmetros da escala
- [x] Aplicar `offset` (Offset desnecessário quando base_date é corretamente um dia de trabalho. Resolvido por design — label do campo orienta o usuário a informar um dia trabalhado.)
- [x] Garantir consistência ao mudar mês ou ano
- [x] Permitir recalcular após alteração da escala

## v1.9.6 — Features já entregues

- [x] Folgas destacadas no calendário
- [x] Troca de turnos
- [x] Histórico de trocas
- [x] Rodapé mais informativo

---

# 💾 Fase 5 — Persistência de Dados (v1.9.7 → v1.9.9)

- [x] v1.9.7 — Criar camada de persistência (`storage.js`)
- [x] v1.9.8 — Migrar `index.html` para usar `storage.js` (remover `localStorage` direto)
- [x] v1.9.9 — Implementar IndexedDB para `vacations` e `shift_swaps`

---

# 🧩 Fase 6 — Sistema de Eventos (v1.9.10) ✅

- [x] v1.9.10 — Estrutura genérica de eventos
- [x] Modelo com `id`, `type`, `start`, `end`, `label`, `meta`
- [x] `EVENT_TYPES` e `EVENT_PRIORITY` definidos
- [x] Funções: `createEvent()`, `isValidEvent()`, `filterByDate()`, `sortByPriority()'

---

# 🌍 Fase 7 — Timezone e Localização (v1.9.11) ✅

- [x] v1.9.11 — Detectar timezone automaticamente
- [x] Salvar timezone no perfil
- [x] Usar timezone nos cálculos

---

# 📦 Fase 8 — Organização do Projeto ~~(v1.9.12)~~ — descartada

- ~~CHANGELOG.md~~ — descartado (roadmap + git log já cobrem)
- ~~Organizar releases~~ — descartado
- ~~Logs estruturados~~ — descartado

---

# 🌐 Fase 9 — Distribuição (v1.9.12) ✅

- [x] v1.9.12 — Toast de atualização automática (GitHub Pages PWA)
- ~~Avaliar TWA (Android)~~ — adiado para quando o SaaS estiver no ar
- ~~Compatibilidade iOS~~ — adiado para quando o SaaS estiver no ar

---

## v1.9.12a — Correção de labels de escala na UI ✅

- [x] Footer exibia `"Escala"` hardcoded para áreas de plantão — substituído por `config.escala`
- [x] Campo "Tipo de escala" no Setup exibia valor raw (`plantao`) — agora exibe label amigável (`Plantão`)
- [x] Corrigido para todas as áreas: segurança, saúde, supermercado e outros
- [x] Save continua gravando valor raw no storage via mapa inverso `SCALE_TYPE_RAW`

## v1.9.12b — Multi-escala: suporte a 2ª instituição ✅

- [x] Usuário pode cadastrar uma 2ª instituição com ciclo independente (padrão + data base livres)
- [x] Disponível para áreas: hospital, segurança e outros
- [x] Diagonal split CSS nos dias em que os dois ciclos coincidem em plantão
- [x] Cor customizável por instituição via color picker
- [x] Migração automática do schema: `version` 3 → 4, campo `secondary_scale` e `inst_color`
- [x] Novas funções: `buildSecondaryModel()`, `getDayTypeSecondary()`
- [x] Sugestão da beta tester Fabiolla Matsue

---

# 📈 Fase 10 — Evolução ~~(v1.9.13)~~ — descartada

- ~~v1.9.13 — Exportação de dados~~ — descartado (coberto pelo backend na Fase 13)
- ~~Integração com calendários externos~~ — descartado

---

# 🧪 Fase 11 — Estabilização ~~(v1.9.14)~~ — descartada

- ~~v1.9.14 — Revisão geral da arquitetura~~ — descartado (testes contínuos cobrem ao longo do desenvolvimento)
- ~~Testes de sincronização~~ — descartado
- ~~Testes de segurança~~ — descartado
- ~~Validação offline-first~~ — descartado
- ~~Preparação para v2.0~~ — descartado

---

# 💬 Fase 12 — Produto (v1.9.15 → v1.9.16)

> Executa após v2.x, v3.x e v4.x concluídos.

- [ ] v1.9.15 — Canal de feedback
- [ ] v1.9.16 — Monetização via Google AdMob (app gratuito)
  - Banner fixo no rodapé
  - Interstitial na entrada do app
  - Interstitial no loading

---

# 📊 Fase 13 — Métricas (v1.9.17 → v1.9.18)

- [ ] v1.9.17 — Registrar DAU / MAU e métricas de uso
- [ ] v1.9.18 — Dashboard interno de métricas

---

# ☁️ Fase 14 — Backend & Sincronização (v1.9.19 → v1.9.21)

> Stack: **Supabase** (BaaS — free tier)
> Executa após o produto estar maduro e com usuários reais.

## v1.9.19 — Setup do Supabase

- [ ] Criar projeto no Supabase
- [ ] Definir schema das tabelas (`users`, `scales`, `events`, `vacations`, `shift_swaps`)
- [ ] Configurar Row Level Security (RLS) — cada usuário acessa só seus dados
- [ ] Integrar `supabase-js` no CycleCal

## v1.9.20 — Autenticação

- [ ] Login com e-mail + senha via Supabase Auth
- [ ] Login social (Google) — opcional
- [ ] Salvar `user_id` no perfil local
- [ ] Tela de login/logout no app

## v1.9.21 — Sincronização e Backup

- [ ] Migrar dados do localStorage/IndexedDB para Supabase na primeira autenticação
- [ ] Backup automático ao salvar alterações (`upsert`)
- [ ] Restaurar dados ao fazer login em novo dispositivo

---

# 🔄 Fase 15 — Offline-First (v1.9.22 → v1.9.24)

> Requer backend (Fase 14) concluído.

- [ ] v1.9.22 — Adapter de API remoto (abstrai Supabase do restante do app)
- [ ] v1.9.23 — Sincronização automática em background
- [ ] v1.9.24 — Resolução de conflitos (local vs. remoto)

---

# 🔐 Fase 16 — Segurança (v1.9.25 → v1.9.26)

> Requer backend (Fase 14) concluído.

- [ ] v1.9.25 — Controle de acesso à API e rate limiting
- [ ] v1.9.26 — Autenticação segura e criptografia de dados
