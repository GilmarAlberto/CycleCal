# CycleCal

Status: ✅ v3.x
Base: v1.x
Branch: main

---

# 🧭 Linha de Produto

v1.x — Base universal do CycleCal  
v2.x — Mercado / comércio  
v3.x — Segurança (polícia e vigilância)  
v4.x — Saúde (plantões hospitalares)

---

# 🚓 v3.x — Segurança

Objetivo:

Adaptar o CycleCal para profissionais de segurança:

- policiais
- bombeiros
- guardas municipais
- vigilantes

Essas profissões utilizam escalas de plantão,
normalmente com ciclos longos e folgas extensas.

Escalas mais comuns nesse setor:

- 24x72
- 24x96

O foco desta versão é registrar plantões extras —
dias trabalhados fora do ciclo regular.

> Funcionalidades já cobertas pelo v1.x e não replicadas aqui:
> 12x36, 24x72, 24x96, troca de plantão, escalas variáveis por período.

---

# ~~🚀 v3.0 – Motor de Ciclos Longos~~ ❌ Descartado

> 24x72 e 24x96 já implementados no v1.x.
> Não há necessidade de reimplementação nesta linha.

---

# ✅ v3.1 – Plantões Extras

Profissionais de segurança frequentemente realizam
plantões adicionais fora do ciclo regular — por cobertura
de colega, reforço em evento ou escala extraordinária.

Diferente da troca de plantão (já implementada no v1.x),
o plantão extra é um dia de trabalho avulso sem contrapartida:
o profissional trabalha num dia que seria folga, sem compensação.

Objetivos:

- [x] Permitir adicionar plantão extra manualmente em qualquer data
- [x] Destacar visualmente plantões extras no calendário
- [x] Registrar histórico de plantões extras
- [x] Evitar conflito visual com folgas do ciclo regular

---

# 🧪 Validação da Versão

Critérios para considerar a linha v3.x funcional:

- [x] Plantão extra registrado corretamente em dia de folga do ciclo
- [x] Plantão extra destacado visualmente sem sobrescrever o ciclo
- [x] Histórico de plantões extras persistido corretamente
- [x] Sem conflito visual com troca de plantão existente
- [x] Testes completos em mobile
- [x] Testes completos em desktop
- [ ] Funcionamento correto em PWA instalada

---

# 📊 Evolução do Produto

Possíveis melhorias futuras para segurança:

- [ ] Estatísticas de plantões extras realizados
- [ ] Contagem de horas extras trabalhadas no mês
- [ ] Exportação de escala (PDF)
- [ ] Compartilhamento de escala
