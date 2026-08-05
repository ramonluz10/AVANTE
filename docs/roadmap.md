# Roadmap — Avante

O roadmap segue uma regra simples: **o MVP contém apenas o essencial**. Tudo o mais espera.

## Fase 0 — Fundação do repositório
- [x] Estrutura de pastas e documentação inicial.
- [ ] Setup do monorepo (frontend, backend, database).
- [ ] CI básico (lint + build) em `.github/workflows`.
- [ ] Ambiente de desenvolvimento documentado (README de cada pasta).

## Fase 1 — Autenticação
- [ ] Cadastro por e-mail e senha.
- [ ] Login com Google (OAuth).
- [ ] Verificação de e-mail.
- [ ] Recuperação de senha.
- [ ] Sem logins fictícios para usuários finais.

## Fase 2 — Perfil
- [ ] Cadastro de nome, faculdade, curso, semestre, objetivo.
- [ ] Cadastro de horários disponíveis.

## Fase 3 — Plano de estudos
- [ ] Formulário de entrada: curso, matérias, horários, dias livres, objetivos.
- [ ] Geração automática de cronograma inteligente.
- [ ] Reorganização manual do cronograma pelo estudante.

## Fase 4 — Dashboard
- [ ] Próxima sessão de estudo.
- [ ] Meta diária.
- [ ] Tempo estudado hoje.
- [ ] Progresso semanal.

## Fase 5 — IA (Avi)
- [ ] Reorganização de cronogramas via IA.
- [ ] Explicação de conteúdos.
- [ ] Identificação de dificuldades do estudante.
- [ ] Incentivo e acompanhamento de evolução.
- [ ] Limites de volume de interação (nunca bombardear o estudante).

Ver [Guia da IA](guia-da-ia.md) para regras detalhadas.

## Fase 6 — Histórico
- [ ] Horas estudadas.
- [ ] Dias consecutivos (streak).
- [ ] Evolução ao longo do tempo.
- [ ] Matérias concluídas.

## Critério de saída do MVP

O MVP é considerado pronto para os primeiros usuários quando as Fases 0 a 6 estiverem funcionais, estáveis e testadas — mesmo que com design simples. Polimento visual e funcionalidades extras vêm depois do primeiro ciclo de feedback real.

---

## Funcionalidades futuras (pós-MVP)

**Não desenvolver antes do MVP estar validado.** Ordem de prioridade sugerida, a ser revisada com base em feedback de usuários reais:

1. Gamificação (com propósito claro, não apenas pontos).
2. Comunidade entre estudantes.
3. Ranking (opcional, nunca central à experiência).
4. Avatar personalizável.
5. Integrações externas (calendário, LMS da faculdade, etc.).
6. Voz / assistente por voz.
7. Animações avançadas.
8. Loja (recursos cosméticos ou premium).

Cada item futuro só entra em desenvolvimento após passar pelo filtro da filosofia do produto: **isso realmente ajuda o estudante?**
