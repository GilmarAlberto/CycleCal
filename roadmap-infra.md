# CycleCal — Infraestrutura da Plataforma

Status: 🟢 v1.9.6  
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

- [ ] Gerar calendário a partir dos parâmetros da escala  
- [ ] Aplicar `offset`  
- [ ] Garantir consistência ao mudar mês ou ano  
- [ ] Permitir recalcular após alteração da escala  

## v1.9.6 — Features já entregues

- [x] Folgas destacadas no calendário  
- [x] Troca de turnos  
- [x] Histórico de trocas  
- [x] Rodapé mais informativo  

---

# 💾 Fase 5 — Persistência de Dados (v1.9.7 → v1.9.9)

- [ ] v1.9.7 — Criar camada de persistência (`storage`)  
- [ ] v1.9.8 — Implementar LocalStorage  
- [ ] v1.9.9 — Implementar IndexedDB  

---

# 🔄 Fase 6 — Offline-First (v1.9.10 → v1.9.12)

- [ ] v1.9.10 — Adapter de API remoto  
- [ ] v1.9.11 — Sincronização automática  
- [ ] v1.9.12 — Resolução de conflitos  

---

# ☁️ Fase 7 — Backend & Sincronização (v1.9.13 → v1.9.15)

## Backend

- [ ] v1.9.13 — Backend SaaS  
- [ ] Armazenamento de dados dos usuários  
- [ ] Sincronização entre dispositivos  

## Conta & Backup

- [ ] v1.9.14 — Autenticação de usuários  
- [ ] v1.9.15 — Backup automático  

---

# 💬 Fase 8 — Produto (v1.9.16 → v1.9.17)

- [ ] v1.9.16 — Canal de feedback  
- [ ] v1.9.17 — Monetização leve  

---

# 📊 Fase 9 — Métricas (v1.9.18 → v1.9.19)

- [ ] Registrar DAU / MAU  
- [ ] Métricas de uso  
- [ ] v1.9.19 — Dashboard interno  

---

# 🔐 Fase 10 — Segurança (v1.9.20 → v1.9.21)

- [ ] Controle de acesso à API  
- [ ] Autenticação segura  
- [ ] Criptografia de dados  
- [ ] Rate limiting  

---

# 🧩 Fase 11 — Sistema de Eventos (v1.9.22)

- [ ] Estrutura genérica de eventos  
- [ ] Modelo com `id`, `type`, `start`, `end`  

---

# 📦 Fase 12 — Organização do Projeto (v1.9.23)

- [ ] Criar `CHANGELOG.md`  
- [ ] Organizar releases  
- [ ] Logs estruturados  

---

# 🌐 Fase 13 — Distribuição (v1.9.24)

- [ ] GitHub Pages (PWA)  
- [ ] Avaliar TWA (Android)  
- [ ] Compatibilidade iOS  

---

# 📈 Fase 14 — Evolução (v1.9.25)

- [ ] Exportação de dados  
- [ ] Integração com calendários externos  

---

# 🧪 Fase 15 — Estabilização (v1.9.26)

- [ ] Revisão geral da arquitetura  
- [ ] Testes de sincronização  
- [ ] Testes de segurança  
- [ ] Validação offline-first  
- [ ] Preparação para v2.0  

---

# 🌍 Fase 16 — Timezone e Localização (v1.9.27)

- [ ] Detectar timezone automaticamente  
- [ ] Salvar timezone no perfil  
- [ ] Usar timezone nos cálculos  
