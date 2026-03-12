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

# 🧱 Arquitetura do Sistema

Objetivo:
Garantir que o CycleCal tenha uma base técnica escalável.

## Estrutura

- [ ] Criar objeto central `config`
- [ ] Separar motor de regras do calendário
- [ ] Implementar sistema de camadas (layers)
- [ ] Estruturar módulos do sistema

---

# 💾 Persistência de Dados

Objetivo:
Permitir que o usuário mantenha suas escalas e configurações.

- [ ] Salvar escala atual
- [ ] Salvar data base
- [ ] Salvar configurações do usuário

Tecnologias possíveis:

- localStorage
- IndexedDB

---

# 📜 Histórico de Dados

Objetivo:
Permitir ao usuário consultar histórico de escalas e eventos.

## Histórico de Escalas

Exemplo:

Jan → 24x72  
Fev → 24x96

- [ ] Registrar mudanças de escala
- [ ] Permitir consulta histórica

## Histórico de Plantões

Exemplo:

15/02 – Plantão  
16/02 – Folga

- [ ] Registrar histórico diário
- [ ] Permitir consulta mensal

---

# 🔄 Motor de Regras Configuráveis

Objetivo:
Permitir múltiplos tipos de escala no sistema.

- [ ] Alterar regra do ciclo (2x1, 3x1 etc.)
- [ ] Alterar data base
- [ ] Ativar / desativar camadas

---

# ☁ Infraestrutura Online

Objetivo:
Permitir sincronização e backup.

Possíveis serviços:

- Supabase
- Firebase
- Render
- Railway

- [ ] Hospedar backend
- [ ] Armazenar dados dos usuários
- [ ] Permitir sincronização entre dispositivos

---

# ☁ Backup Automático

Fluxo esperado:

Usuário cria conta  
→ dados sincronizam com servidor  
→ troca de celular  
→ login  
→ dados restaurados

- [ ] Implementar autenticação básica
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

# 📊 Métricas da Plataforma

Objetivo:
Permitir acompanhar crescimento e uso do CycleCal.

## Métricas de Usuários

- [ ] Registrar quantidade total de usuários
- [ ] Registrar usuários ativos (últimos 30 dias)
- [ ] Registrar usuários ativos diários (DAU)
- [ ] Registrar usuários ativos mensais (MAU)

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

- [ ] Criar painel interno de métricas
- [ ] Visualizar crescimento de usuários
- [ ] Visualizar retenção de usuários

# 🔄 Estratégia Offline-First

Objetivo:
Permitir que o CycleCal funcione offline como PWA,
mas sincronize automaticamente quando houver conexão.

- [ ] Criar camada de persistência abstrata (`storage`)
- [ ] Implementar adaptador local (localStorage / IndexedDB)
- [ ] Implementar adaptador remoto (API)
- [ ] Sincronizar dados automaticamente quando online
- [ ] Resolver conflitos de dados entre dispositivos

# 💾 Sincronização de Dados

- [ ] Criar estrutura de dados sincronizável
- [ ] Implementar timestamp de atualização
- [ ] Detectar conflitos de edição
- [ ] Priorizar versão mais recente

# 🔐 Segurança e Controle de Acesso

Objetivo:
Garantir proteção dos dados dos usuários e acesso seguro ao sistema.

## Autenticação

- [ ] Implementar login seguro
- [ ] Suporte a login por email
- [ ] Avaliar login social (Google / Apple)

## Controle de Acesso

- [ ] Garantir que cada usuário acesse apenas seus próprios dados
- [ ] Validar permissões no backend
- [ ] Proteger endpoints da API

## Proteção de Dados

- [ ] Criptografar dados sensíveis
- [ ] Implementar HTTPS obrigatório
- [ ] Garantir armazenamento seguro das credenciais

## Proteção contra abuso

- [ ] Implementar rate limiting na API
- [ ] Detectar uso excessivo ou comportamento suspeito
