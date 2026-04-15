# CycleCal

Status: 🔮 v4.x
Base: v1.x
Branch: main

---

# 🧭 Linha de Produto

v1.x — Base universal do CycleCal  
v2.x — Mercado / comércio  
v3.x — Segurança (polícia e vigilância)  
v4.x — Saúde (plantões hospitalares)

---

# 🏥 v4.x — Saúde

Objetivo:

Adaptar o CycleCal para profissionais da área de saúde:

- enfermeiros
- técnicos de enfermagem
- médicos
- fisioterapeutas
- profissionais hospitalares

Essas profissões utilizam escalas de plantão
com ciclos específicos e muitas vezes trabalham
em mais de um local.

Funcionalidades já implementadas no v1.x:

- Escala 12x36
- Plantões de 24h (24x72, 24x96)
- Múltiplos vínculos de trabalho (secondary_scale)

---

# 🚀 v4.0 – Escala 12x36 com Folga a Cada 5 Plantões

Variante da 12x36 usada por profissionais
que acumulam um dia extra de folga
a cada 5 plantões trabalhados.

Ciclo base:

12 horas de trabalho  
36 horas de folga  
A cada 5 plantões: folga adicional de 1 dia

Objetivos:

- [x] Modelar ciclo irregular de folga extra
- [x] Implementar contador de plantões no ciclo
- [x] Destacar o dia de folga adicional no calendário
- [x] Garantir continuidade entre meses
- [ ] Testar múltiplos anos

---

# 🚀 v4.1 – Plantão de 6h com Folga Semanal

Escala utilizada por profissionais que trabalham
turnos de 6 horas com uma folga fixa por semana.

Ciclo:

6 horas de trabalho por dia  
1 dia de folga por semana

Objetivos:

- [x] Implementar ciclo de turno de 6h
- [x] Configurar folga semanal fixa
- [x] Exibir corretamente no calendário
- [x] Garantir continuidade entre meses
- [ ] Testar múltiplos anos

---

# 🧪 Validação da Versão

Critérios para considerar a linha v4.x funcional:

- [x] Escala 12x36 com folga a cada 5 plantões funcionando
- [x] Plantão de 6h com folga semanal funcionando
- [ ] Testes completos em mobile
- [ ] Testes completos em desktop
- [ ] Funcionamento correto em PWA instalada
