# CycleCal

Status: 🔮 v2.x
Base: v1.x
Branch: main

---

# 🧭 Linha de Produto

v1.x — Base universal do CycleCal  
v2.x — Mercado / comércio  
v3.x — Segurança (polícia e vigilância)  
v4.x — Saúde (plantões hospitalares)

---

# 🛒 v2.x — Mercado / Comércio

Objetivo:

Adaptar o CycleCal para trabalhadores do comércio
(supermercados, farmácias, lojas e shopping centers).

Escalas mais comuns nesse setor:

- 6x1
- 5x2
- turnos rotativos
- domingos alternados

O foco desta versão é permitir que trabalhadores
visualizem facilmente:

- dias de trabalho
- dias de folga
- domingos trabalhados
- turnos de trabalho

---

# 🚀 v2.0 – Escala 6x1 ✅

Escala mais comum no comércio brasileiro.

Ciclo:

6 dias de trabalho  
1 dia de folga

Objetivos:

- [x] Implementar ciclo automático 6x1
- [x] Destacar folga semanal
- [x] Reiniciar ciclo automaticamente
- [x] Garantir continuidade entre meses
- [x] Testar múltiplos meses consecutivos

Notas:

- Implementado via cyclePatterns em model.js
- Setup com select de dia de folga (Domingo, Segunda, ..., Sábado)
- base_date calculada automaticamente a partir da escolha

---

# 🚀 v2.1 – Escala 5x2 ✅

Escala comum em shoppings e redes de varejo.

Ciclo:

5 dias de trabalho  
2 dias de folga consecutivos

Objetivos:

- [x] Implementar ciclo 5x2
- [x] Garantir rotação correta de folgas
- [x] Validar continuidade entre meses
- [x] Testar múltiplos anos

Notas:

- Disponível na área "Outros" com tipo semanal + padrão 5x2
- Setup com select de dias de folga (Sáb/Dom, Dom/Seg, ..., Sex/Sáb)
- base_date calculada automaticamente a partir da escolha
- Originalmente documentado como 5x1 — corrigido para 5x2

---

# 🚀 v2.2 – Turnos de Trabalho

Comércio frequentemente opera em turnos.

Exemplos:

Manhã  
Tarde  
Noite

Objetivos:

- [ ] Permitir configuração de turno
- [ ] Exibir turno no calendário
- [ ] Diferenciar visualmente os turnos
- [ ] Permitir alterar turno manualmente

---

# 🚀 v2.3 – Domingos Trabalhados

Domingos são importantes no comércio
e normalmente seguem regras específicas.

Objetivos:

- [ ] Marcar domingos trabalhados
- [ ] Contar domingos trabalhados no mês
- [ ] Destacar domingos de folga
- [ ] Permitir alternância automática

---

# 🚀 v2.4 – Escala Rotativa

Alguns estabelecimentos usam folga rotativa.

Exemplo:

Semana 1 → folga segunda  
Semana 2 → folga terça  
Semana 3 → folga quarta

Objetivos:

- [ ] Implementar rotação automática de folgas
- [ ] Garantir continuidade entre meses
- [ ] Visualização clara da rotação semanal

---

# 🚀 v2.5 – Banco de Horas (Visual)

Alguns trabalhadores do comércio usam banco de horas.

Objetivos:

- [ ] Registrar horas extras
- [ ] Visualizar saldo de horas
- [ ] Marcar compensações
- [ ] Exibir resumo mensal

---

# 🧪 Validação da Versão

Critérios para considerar a linha v2.x funcional:

- [x] Escala 6x1 funcionando corretamente
- [x] Escala 5x2 funcionando corretamente
- [ ] Turnos visíveis no calendário
- [ ] Domingos trabalhados identificados
- [ ] Testes completos em mobile
- [ ] Testes completos em desktop
- [ ] Funcionamento correto em PWA instalada

---

# 📊 Evolução do Produto

Possíveis melhorias futuras para o comércio:

- [ ] Estatísticas de dias trabalhados
- [ ] Estatísticas de folgas
- [ ] Exportação de escala (PDF)
- [ ] Compartilhamento de escala
