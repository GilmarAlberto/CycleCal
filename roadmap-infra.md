# CycleCal — Infraestrutura da Plataforma

Status: 🔮 Planejamento
Compatível com: v1.x → v4.x
Branch: main

# Papel deste documento

Este documento descreve a evolução da infraestrutura técnica
da plataforma CycleCal.

Ele suporta todas as linhas de produto:

v1.x — Core
v2.x — Comércio
v3.x — Segurança
v4.x — Saúde

---

# 🧩 Modularização do Frontend (v1.8.x)

Objetivo:  
Reduzir complexidade do `index.html` e preparar o CycleCal
para crescimento modular e manutenção mais fácil.

## Estrutura de Código

- [ ] Separar CSS do HTML
- [ ] Criar pasta `/css`
- [ ] Criar arquivo `styles.css`

- [ ] Criar pasta `/js`
- [ ] Separar lógica do calendário
- [ ] Separar regras de eventos
- [ ] Separar lógica de feriados
- [ ] Separar lógica de férias

## Organização de Arquivos

Estrutura alvo:

docs/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── calendario.js
│   ├── eventos.js
│   ├── feriados.js
│   ├── ferias.js
│   └── navigation.js
│
├── manifest.json
├── sw.js
│
└── icons/
    ├── icon-256.png
    └── icon-512.png

## Critério de Conclusão

- `index.html` com menos de ~300 linhas
- Cada módulo com responsabilidade única
- Nenhuma mudança funcional no comportamento do sistema

---

# 🧱 Arquitetura do Sistema (v1.9.0 – v1.9.3)

Objetivo:
Garantir que o CycleCal tenha uma base técnica escalável.

## Estrutura

- [ ] v1.9.0 — Separar motor de regras do calendário
- [ ] v1.9.1 — Criar objeto central `config`
- [ ] v1.9.2 — Implementar sistema de camadas (layers)
- [ ] v1.9.3 — Definir modelo de dados baseado em parâmetros

---

# 📜 Histórico de Dados

Objetivo:
Permitir ao usuário consultar histórico de escalas e eventos.

## Histórico de Escalas

Exemplo:

Jan → 24x72  
Fev → 24x96

- [ ] Registrar mudanças de escala
- [ ] Permitir alteração da base da escala sem alterar o histórico passado
- [ ] Permitir consulta histórica

## Histórico de Plantões

Exemplo:

15/02 – Plantão  
16/02 – Folga

- [ ] Registrar histórico diário
- [ ] Permitir consulta mensal

---

# 💾 Persistência de Dados (v1.9.4 – v1.9.8)

Objetivo:
Permitir que o usuário mantenha suas escalas e configurações.

## Estrutura de Persistência

- [ ] v1.9.4 — Criar camada de persistência abstrata (`storage`)
- [ ] v1.9.7 — Implementar adapter LocalStorage
- [ ] v1.9.8 — Implementar adapter IndexedDB

Tecnologias possíveis:

- localStorage
- IndexedDB

---

# 🔄 Motor de Regras Configuráveis (v1.9.5 – v1.9.6)

Objetivo:
Permitir múltiplos tipos de escala no sistema e garantir alinhamento correto
dos ciclos de trabalho no calendário.

---

## v1.9.5 — Estrutura de Parâmetros da Escala

- [ ] Definir modelo de dados da escala
- [ ] Representar ciclos de trabalho como sequência de estados
- [ ] Permitir padrões como `24x72`, `12x36`, `6x1`, `5x2`
- [ ] Implementar parâmetro **offset** para alinhamento do ciclo
- [ ] Garantir compatibilidade com `base_date`
- [ ] Validar cálculo correto do ciclo ao navegar entre meses

---

## v1.9.6 — Geração Dinâmica do Calendário

- [ ] Gerar calendário a partir dos parâmetros da escala
- [ ] Aplicar `offset` para determinar posição inicial do ciclo
- [ ] Garantir consistência ao mudar mês ou ano
- [ ] Permitir recalcular calendário após alteração da escala

---

## 📐 Estrutura de Parâmetros da Escala

Modelo conceitual esperado:

```json
{
  "scale": {
    "type": "cycle",
    "pattern": [1,0,0,0],
    "base_date": "2026-01-01",
    "offset": 2
  }
}
```

---

# 🔄 Estratégia Offline-First (v1.9.9 – v1.9.11)

Objetivo:
Permitir que o CycleCal funcione offline como PWA,
mas sincronize automaticamente quando houver conexão.

- [ ] v1.9.9 — Implementar adapter API remoto
- [ ] v1.9.10 — Implementar sincronização automática
- [ ] v1.9.11 — Resolver conflitos de sincronização

---

# ☁ Infraestrutura Online (v1.9.12)

Objetivo:
Permitir sincronização e backend online.

Possíveis serviços:

- Supabase
- Firebase
- Render
- Railway

- [ ] v1.9.12 — Implementar backend SaaS
- [ ] Armazenar dados dos usuários
- [ ] Permitir sincronização entre dispositivos

---

# ☁ Backup Automático (v1.9.13 – v1.9.14)

Fluxo esperado:

Usuário cria conta  
→ dados sincronizam com servidor  
→ troca de celular  
→ login  
→ dados restaurados

- [ ] v1.9.13 — Implementar autenticação de usuários
- [ ] v1.9.14 — Implementar backup automático
- [ ] Sincronizar dados do calendário
- [ ] Restaurar dados automaticamente

---

# 💬 Comunicação com Usuários

- [ ] Criar canal de feedback no aplicativo
- [ ] Coletar sugestões
- [ ] Registrar problemas relatados

---

# 💰 Monetização

Modelo preferido:

- anúncio ao abrir aplicativo

ou

- banner discreto no rodapé

Princípios:

- [ ] não interromper o uso
- [ ] não poluir a interface
- [ ] manter experiência limpa

---

# 📦 Organização do Projeto

- [ ] Criar `CHANGELOG.md`
- [ ] Organizar releases no GitHub
- [ ] Melhorar estratégia de atualização da PWA
- [ ] Implementar log estruturado

---

# 🌐 Distribuição

## PWA

- [ ] Distribuição via GitHub Pages
- [ ] Instalação direta no navegador

## Android

- [ ] Avaliar publicação na Google Play
- [ ] Possível uso de Trusted Web App (TWA)

## iPhone

- [ ] Testar instalação via Safari
- [ ] Garantir compatibilidade PWA no iOS

---

# 📊 Evolução da Plataforma

- [ ] Estatísticas de uso
- [ ] Exportação de dados (JSON / PDF)
- [ ] Integração com calendários externos

---

# 📊 Métricas da Plataforma (v1.9.15 – v1.9.16)

Objetivo:
Permitir acompanhar crescimento e uso do CycleCal.

## Métricas de Usuários

- [ ] Registrar quantidade total de usuários
- [ ] Registrar usuários ativos (últimos 30 dias)
- [ ] v1.9.15 — Registrar usuários ativos diários (DAU)
- [ ] v1.9.15 — Registrar usuários ativos mensais (MAU)

## Métricas de Uso

- [ ] Contar número de acessos por usuário
- [ ] Registrar criação de escalas
- [ ] Registrar uso de funcionalidades principais

## Métricas por Área

- [ ] Quantidade de usuários por setor
  - comércio
  - segurança
  - saúde
  - geral

## Dashboard

- [ ] v1.9.16 — Criar painel interno de métricas
- [ ] Visualizar crescimento de usuários
- [ ] Visualizar retenção de usuários

---

# 🔐 Segurança e Controle de Acesso (v1.9.17 – v1.9.18)

Objetivo:
Garantir proteção dos dados dos usuários e acesso seguro ao sistema.

## Autenticação

- [ ] Implementar login seguro
- [ ] Suporte a login por email
- [ ] Avaliar login social (Google / Apple)

## Controle de Acesso

- [ ] v1.9.17 — Implementar controle de acesso à API
- [ ] Garantir que cada usuário acesse apenas seus próprios dados
- [ ] Validar permissões no backend
- [ ] Proteger endpoints da API

## Proteção de Dados

- [ ] Criptografar dados sensíveis
- [ ] Implementar HTTPS obrigatório
- [ ] Garantir armazenamento seguro das credenciais

## Proteção contra abuso

- [ ] v1.9.18 — Implementar rate limiting na API
- [ ] Detectar uso excessivo ou comportamento suspeito

---

# 🧩 Sistema de Eventos de Calendário


## 🎯 Objetivo

Criar uma estrutura genérica para representar eventos associados a dias do calendário.

Essa estrutura permitirá que diferentes tipos de eventos sejam tratados de forma uniforme
pelo motor do calendário.

---

## Tipos de eventos previstos

- folga
- feriado
- férias
- eventos futuros

---

## Estrutura conceitual

Cada evento deverá possuir:

- id
- tipo
- data inicial
- data final
- metadados opcionais

Exemplo conceitual:

```json
{
  id: "evt_001",
  type: "vacation",
  start: "2026-07-01",
  end: "2026-07-30",
  meta: {}
}
```

---

## Benefícios

- evitar múltiplas estruturas paralelas no código
- simplificar renderização do calendário
- permitir novas funcionalidades sem refatoração
- facilitar sincronização futura

---

## Status

Planejado

---

# 🧪 Estabilização da Infraestrutura (v1.9.20)

Objetivo:
Garantir que toda a infraestrutura esteja estável
antes da liberação da versão v2.0.

- [ ] Revisão geral da arquitetura
- [ ] Testes de sincronização
- [ ] Testes de segurança
- [ ] Validação da estratégia offline-first
- [ ] Preparação para release v2.0
