# CycleCal — Infraestrutura da Plataforma

Status: 🟢 v1.9.9  
Base: v1.9.5  
Branch: main

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

# 🧩 Fase 6 — Sistema de Eventos (v1.9.10) ⬅️ próxima

- [ ] v1.9.10 — Estrutura genérica de eventos
- [ ] Modelo com `id`, `type`, `start`, `end`

---

# 🌍 Fase 7 — Timezone e Localização (v1.9.11)

- [ ] v1.9.11 — Detectar timezone automaticamente
- [ ] Salvar timezone no perfil
- [ ] Usar timezone nos cálculos

---

# 📦 Fase 8 — Organização do Projeto (v1.9.12)

- [ ] v1.9.12 — Criar `CHANGELOG.md`
- [ ] Organizar releases
- [ ] Logs estruturados

---

# 🌐 Fase 9 — Distribuição (v1.9.13)

- [ ] v1.9.13 — GitHub Pages (PWA)
- [ ] Avaliar TWA (Android)
- [ ] Compatibilidade iOS

---

# 📈 Fase 10 — Evolução (v1.9.14)

- [ ] v1.9.14 — Exportação de dados
- [ ] Integração com calendários externos

---

# 🧪 Fase 11 — Estabilização (v1.9.15)

- [ ] v1.9.15 — Revisão geral da arquitetura
- [ ] Testes de sincronização
- [ ] Testes de segurança
- [ ] Validação offline-first
- [ ] Preparação para v2.0

---

# 🔄 Fase 12 — Offline-First (v1.9.16 → v1.9.18)

> Requer backend (Fase 13) concluído.

- [ ] v1.9.16 — Adapter de API remoto
- [ ] v1.9.17 — Sincronização automática
- [ ] v1.9.18 — Resolução de conflitos

---

# ☁️ Fase 13 — Backend & Sincronização (v1.9.19 → v1.9.21)

## Backend

- [ ] v1.9.19 — Backend SaaS
- [ ] Armazenamento de dados dos usuários
- [ ] Sincronização entre dispositivos

## Conta & Backup

- [ ] v1.9.20 — Autenticação de usuários
- [ ] v1.9.21 — Backup automático

---

# 💬 Fase 14 — Produto (v1.9.22 → v1.9.23)

> Requer backend (Fase 13) concluído.

- [ ] v1.9.22 — Canal de feedback
- [ ] v1.9.23 — Monetização leve

---

# 📊 Fase 15 — Métricas (v1.9.24 → v1.9.25)

> Requer backend (Fase 13) concluído.

- [ ] v1.9.24 — Registrar DAU / MAU e métricas de uso
- [ ] v1.9.25 — Dashboard interno de métricas

---

# 🔐 Fase 16 — Segurança (v1.9.26 → v1.9.27)

> Requer backend (Fase 13) concluído.

- [ ] v1.9.26 — Controle de acesso à API e rate limiting
- [ ] v1.9.27 — Autenticação segura e criptografia de dados
