# CycleCal

Status: 🟢 v1.7.5
Base: v1.7.0
Branch: main

---

# 🧭 Estratégia de Versões

v1.x — Base universal do CycleCal  
v2.x — Mercado / comércio  
v3.x — Segurança (polícia)  
v4.x — Saúde  

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

# 🔮 Evolução do Core (v1.x)

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

## 📱 v1.4.x – Seletor Mobile de Mês e Ano

### 🎯 Objetivo Geral

Substituir `<select>` de mês e `<input type="number">` de ano por um seletor mobile estilo Google Calendar (bottom sheet), com foco total em toque e fluidez.

---

## 📱 v1.4.1 – Remoções e Novo Cabeçalho

### 🧹 Remoções

- [x] Remover `<select id="monthSelect">`
- [x] Remover `<input type="number" id="yearInput">`
- [x] Remover event listeners associados
- [x] Garantir que `gerarCalendario()` continue como único ponto de render

### 🧱 Cabeçalho Interativo

- [x] Criar container `.periodo` clicável
- [x] Exibir mês abreviado + ano (ex: `FEV 2026`)
- [x] Indicar visualmente que é interativo
- [x] Garantir área mínima de toque (≥ 44px)
- [x] Garantir que navegação atual continue funcionando

---

## 📱 v1.4.2 – Estrutura do Bottom Sheet

### 📲 Estrutura Base

- [x] Criar `#pickerOverlay`
- [x] Criar `.picker-sheet`
- [x] Implementar overlay escurecido
- [x] Abrir ao tocar no período
- [x] Fechar ao tocar fora

### 🎞 Animação

- [x] Slide suave de baixo para cima
- [x] Duração ≤ 200ms
- [x] Não interferir na microtransição do calendário

---

## 📱 v1.4.3 – Seletor de Mês Funcional

### 🗓 Modo Seleção de Mês

- [x] Grid 3x4 (12 meses)
- [x] Destacar mês atual
- [x] Seleção altera mês mantendo ano
- [x] Atualizar calendário ao selecionar
- [x] Fechar automaticamente após seleção
- [x] Testar mobile (PWA instalada)

---

## 📱 v1.4.4 – Seletor de Ano Funcional

### 📆 Modo Seleção de Ano

- [x] Alternar modo ao tocar no ano
- [x] Grid 3x4 (12 anos por bloco)
- [x] Navegação por blocos (← →)
- [x] Destacar ano atual
- [x] Seleção altera ano mantendo mês
- [x] Retornar automaticamente ao modo mês
- [x] Testar navegação rápida entre blocos

---

## 📱 v1.4.5 – Refinamento e Validação Final

### 🎨 Interface (UI / UX)

- [x] Ajustar espaçamentos para mobile
- [x] Ajustar contraste e destaque dos elementos
- [x] Garantir conforto para interação com polegar (thumb zone)

### ⚙️ Funcionalidade

- [x] Garantir que swipe continue funcionando
- [x] Garantir que botões ◀ ▶ continuem funcionando
- [x] Validar navegação de mês após reload

### 📦 PWA / Infraestrutura

- [x] Atualizar `CACHE_NAME` para v1.4.5
- [x] Testar funcionamento offline
- [x] Testar modo PWA standalone
- [x] Verificar atualização do Service Worker

### 🧪 Critério de Encerramento da Versão

- [x] Teste completo em mobile
- [x] Teste completo em desktop
- [x] Confirmar atualização da PWA instalada
- [x] Commit final da versão

---

## 🎂 v1.5.0 – Datas Especiais

- [x] (v1.4.0) Destacar aniversário fixo (10/07)
- [x] Aplicar classe `.birthday`
- [x] Definir variável `--birthday-color` (#d4af37)
- [x] Inserir legenda
- [x] Mostrar legenda apenas no mês correto
- [x] Inserir emoji 🎂 via pseudo-elemento
- [x] Garantir coexistência com `.holiday`, `.folga` e `.today`
- [x] Testar navegação entre meses
- [x] Testar mobile (PWA instalada)

---

# v1.6.0 — Controle de Folgas em Feriados

## 🎯 Regra de Conflito

- [x] Detectar conflito entre `.folga` e `.holiday`
- [x] Definir estratégia inicial (folga tem prioridade sobre feriado)

## 🧠 Infraestrutura do Calendário

- [x] Criar estrutura de eventos do dia
- [x] Centralizar cálculo de eventos
- [x] Definir prioridade de eventos
- [x] Preparar suporte para férias

## ⚙️ Lógica de Compensação (Fase 1)

- [x] Garantir que não gere efeito cascata
- [x] Evitar duplicação de folgas no mesmo ciclo
- [x] Validar múltiplos conflitos no mesmo mês

## 🎨 Camada Visual

- [x] Ajustar prioridade visual entre `.today`, `.holiday` e `.folga`
- [x] Inserir indicação visual discreta (ex: 🎂 aniversário)
- [x] Garantir compatibilidade mobile

## 🧪 Testes

- [x] Testar anos até 2035
- [x] Testar ano bissexto
- [x] Testar funcionamento offline
- [x] Testar PWA instalada
- [x] Validar comportamento após reload

---

# 🏖 v1.7.0 – Férias

## 🎯 Objetivo

Permitir que o usuário registre períodos de férias
e visualize claramente esses períodos no calendário.

---

## ⚙️ Funcionalidade

- [x] Permitir registrar data de início das férias
- [x] Permitir registrar data de término das férias
- [x] Permitir edição de um período de férias
- [x] Permitir remoção de um período de férias
- [x] Destacar dias de férias no calendário
- [x] Garantir compatibilidade com ciclos de escala

---

## 💾 Persistência de Dados

- [x] Definir estrutura de armazenamento das férias
- [x] Salvar períodos de férias no armazenamento local
- [x] Restaurar férias automaticamente ao abrir o aplicativo

---

## 🎨 Camada Visual

- [x] Criar classe `.vacation`
- [x] Definir estilo visual específico (hachurado cinza)
- [x] Garantir contraste adequado com `.holiday`, `.folga` e `.today`
- [x] Inserir legenda explicativa abaixo do calendário
- [x] Exibir legenda apenas quando houver férias no mês

---

## 🖊 Cadastro de Férias

- [x] Criar interface para registrar férias
- [x] Permitir selecionar data inicial
- [x] Permitir selecionar data final
- [x] Validar intervalo de datas
- [x] Confirmar registro de férias

---

## 🧪 Testes

- [x] Testar períodos longos (ex: 30 dias)
- [x] Testar férias atravessando meses
- [x] Testar coexistência com `.holiday`, `.folga` e `.today`
- [x] Testar funcionamento offline
- [x] Testar PWA instalada

---

## 🚀 Critério de Conclusão

A versão será considerada concluída quando:

- O usuário conseguir registrar um período de férias
- O calendário destacar corretamente todos os dias do período
- Os dados permanecerem salvos após fechar e reabrir o aplicativo
- O funcionamento estiver estável tanto online quanto offline

---

## 📝 Nota de Versão

Refinamentos visuais da funcionalidade de férias
não fazem parte da v1.7.0.

Qualquer melhoria estética, ajustes de layout ou
melhorias de interface serão tratados na versão **v1.8.5**.

---

# ⚙ v1.7.5 – Configurações do Usuário

## 🎯 Objetivo

Criar a estrutura inicial de configurações do usuário,
preparando a base para o futuro sistema de perfil.

## ⚙️ Funcionalidades

- [x] Criar estrutura `cyclecal_user` no LocalStorage
- [x] Registrar data base da escala
- [x] Registrar tipo de escala
- [x] Registrar padrão da escala
- [x] Armazenar preferências do usuário
- [x] Persistir configurações em `cyclecal_user.settings`

## 📦 Benefício

Estabelecer a base de configuração do usuário,
permitindo evoluir posteriormente para o sistema de perfil completo (v1.8.0).

## 🗂 Estrutura de Dados do Usuário

O CycleCal utilizará uma única chave principal no LocalStorage:

cyclecal_user

Estrutura:

```json
{
  "version": 1,
  "updated_at": "",
  "profile": {
    "user_id": "uuid",
    "name": "",
    "area": "",
    "created_at": ""
  },
  "settings": {
    "base_date": "",
    "scale_type": "",
    "scale_pattern": ""
  },
  "preferences": {
    "theme": "auto"
  },
  "vacations": [
    {
      "start": "",
      "end": ""
    }
  ]
}

```

---

# 👤 v1.8.0 – Perfil do Usuário

## 🎯 Objetivo

Permitir que o usuário configure seu perfil na primeira utilização do CycleCal,
definindo informações básicas e sua área de atuação para personalização do aplicativo.

---

## ⚙️ Funcionalidade

- [ ] Detectar primeiro acesso (perfil ainda não configurado)
- [ ] Exibir tela de cadastro inicial do usuário
- [ ] Permitir registrar nome do usuário
- [ ] Permitir registrar data base da escala
- [ ] Permitir registrar tipo de escala
- [ ] Permitir registrar padrão da escala
- [ ] Permitir selecionar área de atuação
- [ ] Gerar identificador único do usuário (`user_id`)

---

## 🧭 Áreas de Atuação

- [ ] Comércio
- [ ] Segurança Pública
- [ ] Saúde
- [ ] Geral

---

## 💾 Persistência

- [ ] Criar estrutura `profile` dentro de `cyclecal_user`
- [ ] Salvar dados do usuário em `cyclecal_user.profile`
- [ ] Carregar dados de `cyclecal_user` ao iniciar o app
- [ ] Evitar exibir cadastro novamente após configuração

---

## 🔗 Integração com Módulos

- [ ] Integrar seleção de área com `roadmap-comercio`
- [ ] Integrar seleção de área com `roadmap-seguranca`
- [ ] Integrar seleção de área com `roadmap-saude`
- [ ] Manter funcionamento padrão quando área = `geral`

---

## 🧪 Testes

- [ ] Testar primeiro acesso sem perfil salvo
- [ ] Testar carregamento correto do perfil salvo
- [ ] Testar persistência após recarregar a página
- [ ] Testar funcionamento offline
- [ ] Testar comportamento com PWA instalada

---

# 🎨 v1.8.5 — Refinamento Visual

## 🎯 Objetivo

Melhorar a experiência visual e a usabilidade
das funcionalidades de férias implementadas na v1.7.0.

## Interface

- [ ] Substituir `alert()` por mensagem visual no sistema
- [ ] Melhorar layout do formulário de registro de férias
- [ ] Melhorar visual da lista de períodos de férias

## UX

- [ ] Padronizar formato de datas exibidas
- [ ] Melhorar espaçamento e alinhamento da interface

---


