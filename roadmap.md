# CycleCal

Status: 🟡 v1.1.1 em desenvolvimento  
Base: v1.0.3  
Branch: feature/1.1.0  

---

# 🚀 v1.1.x – Desenvolvimento

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

## 3️⃣ Feature: Feriados (Offline)

### 3.1 Feriados Fixos (Nacionais + Curitiba)

- [x] Implementar lista de feriados nacionais  
- [x] Incluir 01/05 – Dia do Trabalho  
- [x] Incluir 08/09 – Curitiba  
- [x] Aplicar classe `.holiday`  
- [x] Listar feriados do mês no rodapé  
- [x] Testar até 2027  
- [x] Validar ano bissexto  

### 3.2 Feriados Móveis

- [ ] Implementar cálculo da Páscoa  
- [ ] Derivar Carnaval  
- [ ] Derivar Corpus Christi  
- [ ] Testar múltiplos anos  

---

## 4️⃣ Feature: Base de Domingo Configurável

- [ ] Criar variável `baseSunday`
- [ ] Persistir em `localStorage`
- [ ] Criar input `type="date"`
- [ ] Validar se data escolhida é domingo
- [ ] Recalcular ciclo após salvar
- [ ] Testar reload da aplicação

---

# 🧪 Validação de Release (antes do merge na main)

- [ ] Deploy da branch no Netlify  
- [ ] Confirmar registro do Service Worker  
- [ ] Confirmar CACHE_NAME ativo  
- [ ] Limpar caches antigos automaticamente  
- [ ] Testar funcionamento offline  
- [ ] Testar atualização da PWA instalada  
- [ ] Confirmar versão exibida correta  
- [ ] Sanity check geral  

---

# 📦 Release

- [ ] Atualizar versão final (se necessário)  
- [ ] Revisar lista de arquivos cacheados no SW  
- [ ] Commit final consolidado  
- [ ] Merge para main  
- [ ] Criar tag oficial  
- [ ] Publicar release no GitHub  

---

# 🔮 v1.2.0+ (Backlog Futuro)

## 🧭 Navegação

- [ ] Permitir seleção direta de mês/ano  
- [ ] Permitir digitar ano manualmente  
- [ ] Botão “Hoje” para retornar ao mês atual  

## 🧱 Base Técnica

- [ ] Separar JS do HTML (`app.js`)  
- [ ] Separar CSS (`style.css`)  
- [ ] Modularizar lógica do calendário  
- [ ] Melhorar estrutura de pastas  
- [ ] Estratégia avançada de cache versionado  

## 🎨 UX

- [ ] Melhorar botões de navegação  
- [ ] Ajustar layout para mobile pequeno  
- [ ] Mostrar mês por extenso  
- [ ] Melhorar acessibilidade visual  
- [ ] Pequena animação na troca de mês  

## ⚙ Funcionalidades Futuras

- [ ] Alternar regra de domingo (2x1 / 3x1 etc.)  
- [ ] Marcação manual de folga/trabalho  
- [ ] Estatística mensal  
- [ ] Histórico de alterações  
- [ ] Exportar dados (JSON)  

## 🏗 Infraestrutura

- [ ] Criar CHANGELOG.md formal  
- [ ] Organizar releases no GitHub  
- [ ] Melhorar estratégia de atualização automática da PWA  
- [ ] Implementar log estruturado  

