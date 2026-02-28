# CycleCal

Status: 🟢 v1.4.0
Base: v1.3.6
Branch: main  

---

# 🚀 v1.1.x – Concluída

## 1️⃣ Preparação de Versão (DEV)

- [x] Atualizar versão visível  
- [x] Atualizar CACHE_NAME no Service Worker  

---

## 2️⃣ Feature: Destaque do Dia Corrente

- [x] Detectar data atual  
- [x] Aplicar classe `.today`  
- [x] Garantir coexistência com `.folga`  
- [x] Testar navegação entre meses  
- [x] Ajustar intensidade visual  

---

## 3️⃣ Feature: Feriados Fixos (Offline)

### 3.1 Feriados Fixos (Nacionais + Curitiba)

- [x] Implementar lista de feriados nacionais  
- [x] Incluir 01/05 – Dia do Trabalho  
- [x] Incluir 08/09 – Curitiba  
- [x] Incluir 20/11 – Dia da Consciência Negra  
- [x] Aplicar classe `.holiday`  
- [x] Listar feriados do mês no rodapé  
- [x] Ordenar cronologicamente os feriados no rodapé  
- [x] Testar até 2027  
- [x] Validar ano bissexto  

---

# 🚀 v1.2.0-alpha – Feriados Móveis (Concluída)

## 3.2 Feriados Móveis

### 🕒 Ciclo 1 — Cálculo da Páscoa
- [x] Implementar função `calcularPascoa(ano)`
- [x] Testar anos conhecidos (2024, 2025, 2028, 2030)
- [x] Validar ano bissexto

### 🕒 Ciclo 2 — Integrar Páscoa ao sistema
- [x] Inserir Páscoa no array dinâmico de feriados
- [x] Aplicar classe `.holiday`
- [x] Garantir exibição no rodapé do mês

### 🕒 Ciclo 3 — Derivar datas móveis
- [x] Sexta-feira Santa (−2 dias)
- [x] Carnaval (−47 dias) → Planejado para v1.3.0 como Evento Cultural (não será tratado como feriado)
- [x] Corpus Christi (+60 dias)

### 🕒 Ciclo 4 — Testes robustos
- [x] Testar múltiplos anos (até 2035)
- [x] Validar navegação entre meses
- [x] Verificar coexistência com `.folga`
- [x] Testar funcionamento offline

---

## 🧪 Validação de Release (Executada)

- [x] Deploy da branch no Netlify  
- [x] Confirmar registro do Service Worker  
- [x] Confirmar CACHE_NAME ativo  
- [x] Limpar caches antigos automaticamente  
- [x] Testar funcionamento offline  
- [x] Testar atualização da PWA instalada  
- [x] Confirmar versão exibida correta  
- [x] Sanity check geral  

---

# 🔮 Roadmap Pós v1.2.0-alpha

## 🧭 Navegação

- [x] (v1.2.1) Botão “Hoje” para retornar ao mês atual  
- [x] (v1.2.1) Navegação entre meses (anterior/próximo)  

- [x] (v1.2.2) Permitir seleção direta de mês  
- [x] (v1.2.2) Permitir digitar ano manualmente  

## 🧭 v1.2.3 – Navegação Avançada
- [x] (v1.2.3) Permitir navegação entre meses por gesto de swipe (mobile)
- [x] (v1.2.3) Permitir navegação por teclado (setas ← → ↑ ↓)
- [x] Testes desktop
- [x] Testes mobile

---

## 🎭 v1.2.4 – Eventos Culturais

- [x] Criar categoria `cultural`
- [x] Implementar cálculo do Carnaval (derivado da Páscoa −47 dias)
- [x] Marcar Segunda e Terça de Carnaval
- [x] Ajustar renderização para diferenciar de `.holiday`
- [x] Criar legenda explicativa abaixo do calendário

---

## 🔧 v1.3.1 – Micromelhorias e Refinamentos

- [x] v 1.3.1 - Ajustar sensibilidade do swipe (refinar `threshold`)
- [x] v 1.3.1 - Migrar `screenX`/`screenY` para `clientX`/`clientY`
- [x] v 1.3.1 - Implementar bloqueio contra múltiplos swipes rápidos

## 🔧 v1.3.4 – Estratégia de Atualização da PWA

- [x] ** Incluir "Controle de Folgas" abaixo do CycleCal.
- [x] Implementar skipWaiting()
- [x] Implementar clients.claim()
- [x] Limpeza automática de caches antigos

## 🔧 v1.3.5 – Micromelhorias e Refinamentos (parte 2)

- [x] v 1.3.5 - Adicionar suporte a `PageUp` / `PageDown`
- [x] v 1.3.5 - Atalho `Home` para retornar ao mês atual

## 🔧 v1.3.6 – Micromelhorias e Refinamentos (parte 3)

- [x] v 1.3.6 - Pequeno refinamento visual na troca de mês (sem animação pesada)
- [x] v 1.3.6 - Revisão geral de navegação via teclado

---

---

---

## 📱 v1.4.x – Seletor Mobile de Mês e Ano

### 🎯 Objetivo Geral

Substituir `<select>` de mês e `<input type="number">` de ano por um seletor mobile estilo Google Calendar (bottom sheet), com foco total em toque e fluidez.

---

## 📱 v1.4.1 – Remoções e Novo Cabeçalho

### 🧹 Remoções

- [ ] Remover `<select id="monthSelect">`
- [ ] Remover `<input type="number" id="yearInput">`
- [ ] Remover event listeners associados
- [ ] Garantir que `gerarCalendario()` continue como único ponto de render

### 🧱 Cabeçalho Interativo

- [ ] Criar container `.periodo` clicável
- [ ] Exibir mês abreviado + ano (ex: `FEV 2026`)
- [ ] Indicar visualmente que é interativo
- [ ] Garantir área mínima de toque (≥ 44px)
- [ ] Garantir que navegação atual continue funcionando

---

## 📱 v1.4.2 – Estrutura do Bottom Sheet

### 📲 Estrutura Base

- [ ] Criar `#pickerOverlay`
- [ ] Criar `.picker-sheet`
- [ ] Implementar overlay escurecido
- [ ] Abrir ao tocar no período
- [ ] Fechar ao tocar fora

### 🎞 Animação

- [ ] Slide suave de baixo para cima
- [ ] Duração ≤ 200ms
- [ ] Não interferir na microtransição do calendário

---

## 📱 v1.4.3 – Seletor de Mês Funcional

### 🗓 Modo Seleção de Mês

- [ ] Grid 3x4 (12 meses)
- [ ] Destacar mês atual
- [ ] Seleção altera mês mantendo ano
- [ ] Atualizar calendário ao selecionar
- [ ] Fechar automaticamente após seleção
- [ ] Testar mobile (PWA instalada)

---

## 📱 v1.4.4 – Seletor de Ano Funcional

### 📆 Modo Seleção de Ano

- [ ] Alternar modo ao tocar no ano
- [ ] Grid 3x4 (12 anos por bloco)
- [ ] Navegação por blocos (← →)
- [ ] Destacar ano atual
- [ ] Seleção altera ano mantendo mês
- [ ] Retornar automaticamente ao modo mês
- [ ] Testar navegação rápida entre blocos

---

## 📱 v1.4.5 – Refinamento e Validação Final

### 🎨 Ajustes Visuais

- [ ] Ajustar espaçamentos para mobile
- [ ] Ajustar contraste e destaque
- [ ] Garantir conforto para polegar

### ⚡ Performance e Compatibilidade

- [ ] Garantir que swipe continue funcionando
- [ ] Garantir que botões ◀ ▶ continuem funcionando
- [ ] Testar funcionamento offline
- [ ] Testar PWA standalone
- [ ] Atualizar `CACHE_NAME` para v1.4.5
- [ ] Validar comportamento após reload

---

## 🎂 v1.5.0 – Datas Especiais

- [ ] (v1.4.0) Destacar aniversário fixo (10/07)
- [ ] Aplicar classe `.birthday`
- [ ] Definir variável `--birthday-color` (#d4af37)
- [ ] Inserir emoji 🎂 via pseudo-elemento
- [ ] Garantir coexistência com `.holiday`, `.folga` e `.today`
- [ ] Testar navegação entre meses
- [ ] Testar mobile (PWA instalada)

---

---

# 🔁 v1.6.0 – Controle de Folgas em Feriados

## 🎯 Regra de Conflito

- [ ] Detectar conflito entre `.folga` e `.holiday`
- [ ] Criar função isolada `resolverConflitoFolga(date)`
- [ ] Definir estratégia inicial (sem compensação ou compensação automática)

## ⚙ Lógica de Compensação (Fase 1)

- [ ] Implementar regra padrão (ex: postergar para próximo dia útil)
- [ ] Garantir que não gere efeito cascata
- [ ] Evitar duplicação de folgas no mesmo ciclo
- [ ] Validar múltiplos conflitos no mesmo mês

## 🎨 Camada Visual

- [ ] Criar classe `.folga-holiday`
- [ ] Ajustar prioridade visual entre `.today`, `.holiday` e `.folga`
- [ ] Inserir indicação visual discreta (ex: borda diferenciada)
- [ ] Garantir compatibilidade mobile

## 🧪 Testes

- [ ] Testar anos até 2035
- [ ] Testar ano bissexto
- [ ] Testar funcionamento offline
- [ ] Testar PWA instalada
- [ ] Validar comportamento após reload

## 🔮 Evolução futura (pré-v2.0)

- [ ] Permitir configuração da estratégia (antecipar / postergar / manter)
- [ ] Persistir escolha em `localStorage`


## 🗓 Base de Domingo Configurável

- [ ] Criar variável `baseSunday`
- [ ] Persistir em `localStorage`
- [ ] Criar input `type="date"`
- [ ] Validar se data escolhida é domingo
- [ ] Recalcular ciclo após salvar
- [ ] Testar reload da aplicação

---

## 🧱 Base Técnica

- [ ] Separar JS do HTML (`app.js`)  
- [ ] Separar CSS (`style.css`)  
- [ ] Modularizar lógica do calendário  
- [ ] Melhorar estrutura de pastas  
- [ ] Estratégia avançada de cache versionado  

---

## 🎨 UX

- [ ] Melhorar botões de navegação  
- [ ] Ajustar layout para mobile pequeno  
- [ ] Mostrar mês por extenso  
- [ ] Melhorar acessibilidade visual  
- [ ] Pequena animação na troca de mês  

---

# 🚀 v2.0 – Sistema Configurável

## 🧱 Base Estrutural
- [ ] Criar objeto central `config`
- [ ] Persistência estruturada
- [ ] Separar motor de regras
- [ ] Sistema de camadas (layers)

## 🏖 Eventos do Usuário
- [ ] CRUD de eventos
- [ ] Intervalos de datas
- [ ] Categorias personalizadas

## ⚙ Regras Configuráveis
- [ ] Alterar regra do ciclo (2x1, 3x1, etc.)
- [ ] Alterar base Sunday
- [ ] Ativar/desativar camadas

## ⚙ Funcionalidades Futuras

- [ ] Alternar regra de domingo (2x1 / 3x1 etc.)  
- [ ] Marcação manual de folga/trabalho  
- [ ] Estatística mensal  
- [ ] Histórico de alterações  
- [ ] Exportar dados (JSON)  

---

## 🏗 Infraestrutura

- [ ] Criar CHANGELOG.md formal  
- [ ] Organizar releases no GitHub  
- [ ] Melhorar estratégia de atualização automática da PWA  
- [ ] Implementar log estruturado  

