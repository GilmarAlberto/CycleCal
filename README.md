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

Editar esses casos manualmente no Google Calendar é trabalhoso e propenso a erro.

O CycleCal resolve isso tratando **a regra como fonte da verdade**.

---

## 🧠 Conceito central

- A **regra** é permanente
- Os **eventos são derivados**
- Se a regra muda:
  - eventos antigos são removidos
  - novos eventos são gerados automaticamente

Sem edição manual. Sem inconsistência.

---

## ✨ Funcionalidades (planejadas)

- Definir padrões cíclicos (ex: ciclo de 3 semanas)
- Gerar datas automaticamente a partir de um dia-base
- Sincronizar eventos com o Google Calendar
- Remover e recriar eventos quando a regra mudar
- Evitar duplicação de eventos

---

## 🛠️ Tecnologias

- Python 3
- Google Calendar API
- (Futuro) Django para orquestração e persistência

---

## 🚧 Status do projeto

🚧 Em desenvolvimento inicial  
Atualmente focado na **lógica pura de geração de ciclos**.

---

## 📌 Observação

Este é um projeto de uso pessoal, criado como exercício prático de:
- lógica
- integração com APIs
- organização de código
- boas práticas de engenharia

---
