# CycleCal

Status: 🔮 v5.x
Base: v4.x
Branch: main

---

# 🧭 Linha de Produto

v1.x — Base universal do CycleCal  
v2.x — Mercado / comércio  
v3.x — Segurança (polícia e vigilância)  
v4.x — Saúde (plantões hospitalares)  
v5.x — Outros (demais categorias profissionais)

---

# 👥 v5.x — Outros

Objetivo:

Atender profissionais que não se enquadram
nas categorias anteriores, consolidando e
expandindo o suporte a escalas diversas.

Público-alvo:

- profissionais de indústria
- motoristas e transportadores
- trabalhadores rurais
- prestadores de serviço autônomo
- qualquer trabalhador com escala irregular

---

# ✅ Já Implementado (herdado das linhas anteriores)

As funcionalidades abaixo já estão disponíveis
para a área "Outros" por herança do v1.x:

## Supermercado / Comércio (v2.x)

- Escala semanal (ex: 6x1, 5x2)
- DSR automático (descanso semanal remunerado)
- Folga rotativa semanal
- Troca de escala (registro e histórico)

## Segurança (v3.x)

- Ciclos de plantão longos (24x72, 24x96)
- Escala 12x36
- Plantões extras (registro manual)
- Áreas sem DSR

## Saúde (v4.x)

- Escala 12x36 hospitalar
- Plantões de 24h
- Múltiplos vínculos de trabalho (secondary_scale)
- Escala 12x36 com folga a cada 5 plantões (v4.0)
- Plantão de 6h com folga semanal (v4.1)

---

# 🚀 v5.0 – Escala Personalizada Livre

Permitir que o usuário da área "Outros"
configure qualquer padrão de escala
não coberto pelas áreas fixas.

Objetivos:

- [ ] Permitir entrada livre de padrão NxM
- [ ] Validar entrada e exibir prévia do ciclo
- [ ] Salvar padrão personalizado no perfil
- [ ] Garantir continuidade entre meses
- [ ] Testar múltiplos padrões e anos

---

# 🚀 v5.1 – Escala Irregular (sem ciclo fixo)

Alguns trabalhadores não têm ciclo regular —
cada semana pode ser diferente.

Objetivos:

- [ ] Permitir marcação manual de dias trabalhados
- [ ] Não exigir padrão de ciclo fixo
- [ ] Registrar histórico de dias trabalhados
- [ ] Exibir resumo mensal de dias e horas

---

# 🧪 Testes da Linha v5.x

## Testes de Escala Personalizada (v5.0)

- [ ] Padrões válidos: 4x2, 3x1, 10x4, 7x3
- [ ] Padrões inválidos: entrada vazia, letras, zero
- [ ] Continuidade correta entre meses
- [ ] Continuidade correta entre anos
- [ ] Comportamento com data-base em diferentes dias da semana

## Testes de Escala Irregular (v5.1)

- [ ] Marcação e desmarcação de dias
- [ ] Histórico preservado após fechar o app
- [ ] Resumo mensal correto
- [ ] Comportamento em meses com 28, 29, 30 e 31 dias

## Testes Gerais de Regressão

- [ ] Área "Outros" com scale_type = plantao
- [ ] Área "Outros" com scale_type = semanal
- [ ] Área "Outros" com scale_type = escala
- [ ] secondary_scale ativo junto com escala irregular
- [ ] Troca de escala registrada corretamente
- [ ] Feriados nacionais exibidos corretamente
- [ ] Férias sobrepostas à escala
- [ ] PWA instalada: comportamento offline
- [ ] Mobile (Android e iOS): layout e interação
- [ ] Desktop: layout e interação

---

# 🧪 Testes de Regressão das Linhas Anteriores

## Supermercado / Comércio

- [ ] Escala 6x1 com DSR na segunda semana
- [ ] Escala 5x2 com folga em fim de semana
- [ ] Troca de escala: calendário ajustado corretamente
- [ ] DSR não aparece em áreas sem DSR

## Segurança

- [ ] Ciclo 24x72: continuidade entre meses
- [ ] Ciclo 24x96: continuidade entre meses
- [ ] Ciclo 12x36: continuidade entre meses
- [ ] Plantão extra: registrado e visível no calendário
- [ ] Plantão extra: não quebra o ciclo base

## Saúde

- [ ] 12x36 hospitalar: igual ao da segurança
- [ ] 12x36 com folga a cada 5 plantões: contador correto
- [ ] Plantão de 6h com folga semanal: folga no dia certo
- [ ] secondary_scale (dois vínculos): sobreposição visual correta
- [ ] secondary_scale: continuidade entre meses

---

# 📊 Evolução do Produto

Possíveis melhorias futuras para a linha v5.x:

- [ ] Exportação de escala (PDF)
- [ ] Compartilhamento de escala via link
- [ ] Notificações de plantão (push notification)
- [ ] Integração com calendários externos
