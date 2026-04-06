# CycleCal — CHANGELOG

Todas as mudanças relevantes do projeto são documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [v1.9.12] — 2026-04-05

### Adicionado
- `CHANGELOG.md` — registro estruturado de versões
- Organização de releases com versionamento semântico explícito

### Alterado
- Versão bumped para `1.9.12` em `index.html`, `sw.js` e cache name

---

## [v1.9.11] — Fase 7: Timezone e Localização

### Adicionado
- Detecção automática de timezone via `Intl.DateTimeFormat` (`getLocalTimezone()` em `utils.js`)
- Timezone salvo no perfil do usuário em `settings.timezone`
- `getTimezone()` e `saveTimezone()` em `storage.js`
- Timezone usado nos cálculos de data em `context.js`

### Alterado
- Migração de schema v2 → v3: adiciona campo `timezone` ao perfil existente

### Arquivos modificados
- `js/logic/utils.js`
- `js/logic/storage.js`
- `js/logic/context.js`
- `js/logic/folgas.js`

---

## [v1.9.10] — Fase 6: Sistema de Eventos

### Adicionado
- `js/logic/events_model.js` — modelo canônico de eventos
- `EVENT_TYPES`: `folga`, `vacation`, `holiday`, `cultural`, `birthday`, `swap`
- `EVENT_PRIORITY` — sistema de prioridades de exibição por tipo
- Funções utilitárias: `createEvent()`, `isValidEvent()`, `getEventPriority()`, `sortByPriority()`, `filterByDate()`
- Estrutura de evento com campos `id`, `type`, `start`, `end`, `label`, `meta`

### Arquivos adicionados
- `js/logic/events_model.js`

---

## [v1.9.9] — Fase 5: Persistência — IndexedDB

### Adicionado
- IndexedDB para armazenamento de `vacations` e `shift_swaps`
- Object stores `vacations` e `swaps` com índices por data

### Arquivos modificados
- `js/logic/storage.js`

---

## [v1.9.8] — Fase 5: Persistência — Migração de localStorage

### Alterado
- `index.html` migrado para usar `storage.js` em vez de `localStorage` direto
- Toda leitura/escrita de dados do usuário passa pela camada de storage

---

## [v1.9.7] — Fase 5: Persistência — Camada de Storage

### Adicionado
- `js/logic/storage.js` — camada centralizada de persistência
- Funções: `loadUser()`, `saveUser()`, `getTimezone()`, `saveTimezone()`
- Migração automática de schema: v1 → v2 (adiciona `scale_history`)

### Arquivos adicionados
- `js/logic/storage.js`

---

## [v1.9.6] — Fase 4: Motor de Regras — Geração Dinâmica

### Adicionado
- Folgas destacadas visualmente no calendário
- Sistema de troca de turnos com registro e histórico
- Rodapé mais informativo (próxima folga, contagem de dias)
- Suporte a `AREAS_WITHOUT_DSR` (segurança, saúde)

### Alterado
- Calendário gerado dinamicamente a partir dos parâmetros da escala
- Consistência garantida ao navegar entre meses/anos

### Arquivos modificados
- `js/logic/events.js`
- `js/main.js`
- `sw.js`
- `css/styles.css`
- `index.html`

---

## [v1.9.5] — Fase 4: Motor de Regras — Estrutura de Parâmetros

### Adicionado
- `js/logic/model.js` — modelo centralizado com `cyclePatterns` e `buildModel()`
- Suporte a padrões: `24x72`, `12x36`, `6x1`, `5x2`
- Parâmetro `offset` para ajuste de fase do ciclo
- Compatibilidade com `base_date` como âncora do ciclo
- Histórico de Dados: modal com seções Escalas / Férias / Plantões
- `getScaleForDate()` — consulta histórica de escala por data
- Migração de schema v1 → v2 com `scale_history`
- Seletores de mês/ano via `<select>` duplo (sem `input[type="month"]`)

### Arquivos adicionados
- `js/logic/model.js`

---

## [v1.9.4] — Fase 1: Modelo de Dados

### Adicionado
- Modelo de dados baseado em parâmetros (escala, offset, base_date)
- Countdown para próximo domingo de descanso no rodapé
- Função pura `getDayType()` em `folgas.js`

### Corrigido
- Bug de parsing de datas com UTC-3 (timezone Brasil)

---

## [v1.9.3] — Fase 1: Sistema de Camadas

### Adicionado
- Arquitetura de layers (`buildLayers()`, `getTopLayer()`) substituindo resolução de evento único
- Evento customizado `cyclecal:ready` substituindo `DOMContentLoaded` (corrige race condition)

### Validado
- Navegação em múltiplos meses no Firefox

---

## [v1.9.2] — Fase 1: Objeto de Configuração

### Adicionado
- Objeto central `config` com todas as configurações do usuário

---

## [v1.9.1] — Fase 2: Core Funcional

### Adicionado
- Contador de dias restantes para férias

---

## [v1.9.0] — Fase 1: Fundação Arquitetural

### Adicionado
- Separação do motor de regras do calendário
- Estrutura de pastas `/css` e `/js`
- Módulos ES6: `feriados.js`, `context.js`, `utils.js`, `areas.js`
- `main.js` como orquestrador principal
- Uso de `window.*` para compatibilidade entre módulos

### Alterado
- `index.html` monolítico convertido para arquitetura modular
