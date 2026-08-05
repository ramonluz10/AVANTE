# Requisitos Funcionais — Avante (MVP)

Convenção: `RF-XX` = Requisito Funcional. Cada item deve ser rastreável a uma issue/PR.

## Autenticação

- **RF-01** — O sistema deve permitir cadastro por e-mail e senha.
- **RF-02** — O sistema deve permitir login via Google (OAuth).
- **RF-03** — O sistema deve exigir verificação de e-mail antes de liberar uso completo.
- **RF-04** — O sistema deve permitir recuperação de senha via e-mail.
- **RF-05** — O sistema não deve permitir login fictício/simulado para usuários finais em produção.

## Perfil

- **RF-06** — O sistema deve permitir cadastro de nome, faculdade, curso, semestre e objetivo.
- **RF-07** — O sistema deve permitir cadastro dos horários disponíveis do estudante.
- **RF-08** — O sistema deve permitir edição posterior de todos os dados de perfil.

## Plano de estudos

- **RF-09** — O sistema deve coletar do estudante: curso, matérias, horários disponíveis, dias livres e objetivos.
- **RF-10** — O sistema deve gerar automaticamente um cronograma de estudos com base nessas informações.
- **RF-11** — O sistema deve permitir que o estudante ajuste manualmente o cronograma gerado.
- **RF-12** — O sistema deve permitir reorganização do cronograma quando o estudante perde uma sessão planejada.

## Dashboard

- **RF-13** — O sistema deve exibir a próxima sessão de estudo agendada.
- **RF-14** — O sistema deve exibir a meta diária de estudo.
- **RF-15** — O sistema deve exibir o tempo total estudado no dia atual.
- **RF-16** — O sistema deve exibir o progresso da semana corrente.

## IA (Avi)

- **RF-17** — O sistema deve permitir que o Avi reorganize cronogramas mediante solicitação ou detecção de atraso.
- **RF-18** — O sistema deve permitir que o Avi explique conteúdos de estudo quando solicitado.
- **RF-19** — O sistema deve identificar padrões que indiquem dificuldade do estudante em uma matéria (ex.: sessões repetidamente não concluídas).
- **RF-20** — O sistema deve fornecer incentivo contextual ao estudante (não genérico, baseado no seu progresso real).
- **RF-21** — O sistema deve limitar a frequência de interações proativas da IA, evitando sobrecarga do usuário.

## Histórico

- **RF-22** — O sistema deve registrar e exibir o total de horas estudadas.
- **RF-23** — O sistema deve registrar e exibir dias consecutivos de estudo (streak).
- **RF-24** — O sistema deve exibir a evolução do estudante ao longo do tempo.
- **RF-25** — O sistema deve exibir quais matérias foram concluídas.

## Fora de escopo no MVP

Explicitamente não fazem parte dos requisitos funcionais do MVP (ver [Roadmap](roadmap.md)):
- Gamificação, ranking, loja, avatar, comunidade, voz, integrações externas, animações avançadas.
