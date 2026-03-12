# CycleCal

Status: 🔮 v3.x
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
- 12x36
- escalas variáveis

O foco desta versão é permitir que o usuário visualize:

- plantões
- folgas
- mudanças de escala
- plantões extras

---

# 🚀 v3.0 – Escala 24x72

Escala muito comum em segurança pública.

Ciclo:

24 horas de trabalho  
72 horas de folga

Objetivos:

- [ ] Implementar ciclo automático 24x72
- [ ] Marcar claramente dias de plantão
- [ ] Destacar dias de folga
- [ ] Garantir continuidade entre meses
- [ ] Testar múltiplos anos

---

# 🚀 v3.1 – Escala 24x96

Escala comum em alguns batalhões e vigilância.

Ciclo:

24 horas de trabalho  
96 horas de folga

Objetivos:

- [ ] Implementar ciclo 24x96
- [ ] Garantir cálculo correto das folgas
- [ ] Testar continuidade entre meses
- [ ] Validar funcionamento em múltiplos anos

---

# 🚀 v3.2 – Escala 12x36

Escala comum em segurança privada e hospitais.

Ciclo:

12 horas de trabalho  
36 horas de folga

Objetivos:

- [ ] Implementar ciclo 12x36
- [ ] Marcar turnos diurnos e noturnos
- [ ] Garantir continuidade do ciclo
- [ ] Testar múltiplos meses

---

# 🚀 v3.3 – Plantões Extras

Profissionais de segurança frequentemente realizam
plantões adicionais.

Objetivos:

- [ ] Permitir adicionar plantão extra manualmente
- [ ] Destacar visualmente plantões extras
- [ ] Registrar histórico de plantões extras
- [ ] Evitar conflito com folgas do ciclo

---

# 🚀 v3.4 – Troca de Plantão

Trocas de plantão são comuns entre colegas.

Objetivos:

- [ ] Permitir registrar troca de plantão
- [ ] Ajustar automaticamente o calendário
- [ ] Registrar histórico da troca
- [ ] Manter consistência do ciclo

---

# 🚀 v3.5 – Escalas Variáveis

Algumas unidades mudam escala ao longo do tempo.

Exemplo:

Jan → 24x72  
Fev → 24x96  

Ou:

até dia 15 → 24x72  
depois → 24x96

Objetivos:

- [ ] Permitir múltiplas escalas por período
- [ ] Recalcular calendário automaticamente
- [ ] Registrar histórico de mudanças de escala
- [ ] Garantir continuidade do calendário

---

# 🧪 Validação da Versão

Critérios para considerar a linha v3.x funcional:

- [ ] Escala 24x72 funcionando corretamente
- [ ] Escala 24x96 funcionando corretamente
- [ ] Escala 12x36 funcionando corretamente
- [ ] Plantões extras registrados corretamente
- [ ] Trocas de plantão funcionando
- [ ] Escalas variáveis funcionando
- [ ] Testes completos em mobile
- [ ] Testes completos em desktop
- [ ] Funcionamento correto em PWA instalada

---

# 📊 Evolução do Produto

Possíveis melhorias futuras para segurança:

- [ ] Estatísticas de plantões realizados
- [ ] Estatísticas de folgas
- [ ] Contagem de horas trabalhadas
- [ ] Exportação de escala (PDF)
- [ ] Compartilhamento de escala
