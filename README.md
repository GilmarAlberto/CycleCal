# CycleCal

CycleCal é um projeto pessoal em Python para **gerar e manter agendas baseadas em ciclos**,  
sincronizando automaticamente os eventos com o **Google Calendar**.

O foco não é criar um novo calendário, mas **definir regras** e deixar que os eventos sejam
gerados, removidos e recriados sempre que a regra mudar.

---

## 🎯 Motivação

Alguns tipos de agenda não funcionam bem com recorrências padrão, por exemplo:

- Domingo sim, dois domingos não
- Escalas em ciclos de várias semanas
- Mudança ocasional do dia-base da folga

Editar esses casos manualmente no Google Calendar é trabalhoso, repetitivo e propenso a erro.

O CycleCal resolve isso tratando **a regra como fonte da verdade**.

---

## 🧠 Conceito central

- A **regra** é permanente
- Os **eventos são derivados**
- Se a regra muda:
  - eventos antigos são removidos
  - novos eventos são gerados automaticamente

Sem edição manual.  
Sem inconsistência.  
Sem acúmulo de lixo no calendário.

---

## ✨ Funcionalidades

- Definir padrões cíclicos (ex: ciclo de 3 semanas)
- Gerar datas automaticamente a partir de um dia-base
- Sincronizar eventos com o Google Calendar
- Criar eventos de dia inteiro
- Evitar duplicação de eventos
- Remover e recriar eventos quando a regra mudar

---

## 🛠️ Tecnologias

- Python 3
- Google Calendar API
- python-dateutil
- pytest
- (Futuro) Django para orquestração e persistência

---

## 🚧 Status do projeto

🚧 Em desenvolvimento ativo  
Atualmente focado na **consolidação da lógica de ciclos e integração com o Google Calendar**.

O projeto já:
- gera datas corretamente
- aplica regras de segurança
- cria eventos reais no Google Calendar via API

---

## ⏳ Regra definitiva de agendamento

O CycleCal possui uma **regra de segurança obrigatória**:

> **O CycleCal nunca gera ou sincroniza folgas além de 1 ano à frente da data base.**

Essa regra é aplicada em múltiplas camadas do sistema:

- 📅 **Limite de negócio:** no máximo **12 meses**
- 🛡️ **Limite físico:** no máximo **365 dias**

Mesmo que o usuário solicite um período maior, o CycleCal:
- bloqueia a entrada inválida **ou**
- ajusta automaticamente o período permitido

Essa decisão garante:
- previsibilidade
- segurança
- prevenção de poluição do calendário
- manutenção simples a longo prazo

Essa regra é **definitiva** e faz parte do contrato central do projeto.

---

## 📌 Observação

Este é um projeto de uso pessoal, criado como exercício prático de:

- lógica
- integração com APIs
- organização de código
- boas práticas de engenharia

O CycleCal prioriza **clareza, segurança e controle**, mesmo sendo um projeto pequeno.

---

## 📜 Licença

Uso pessoal.  
Sem fins comerciais no momento.

