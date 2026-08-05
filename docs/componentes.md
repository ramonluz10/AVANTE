# Componentes — Avante (Design System aplicado ao código)

Biblioteca de componentes de UI para o frontend (Next.js + React + TypeScript). Todo componente novo deve ser adicionado a este documento com sua responsabilidade e variações.

## Princípios de componentização

- Componentes pequenos, com uma responsabilidade clara.
- Nenhum componente de UI deve conter lógica de negócio (isso vive em hooks/serviços, não em componentes visuais).
- Sempre respeitar o [Design System](design-system.md) — cores, tipografia e espaçamento nunca hardcoded fora dos tokens definidos.

## Componentes base

| Componente | Responsabilidade |
|---|---|
| `Button` | Ação primária/secundária. Variações: primário (azul), secundário (contorno), texto. |
| `Card` | Container base para blocos de conteúdo (dashboard, plano, histórico). |
| `Input` / `TextField` | Campo de formulário com label, erro e estado de foco. |
| `Select` | Seleção entre opções (ex.: curso, semestre). |
| `Checkbox` / `Toggle` | Seleção binária (ex.: dias livres). |
| `Avatar` | Foto/ícone do usuário. |
| `Badge` | Indicador pequeno de status (ex.: "concluída", "pendente"). |
| `Modal` | Confirmações e formulários secundários. |
| `Toast` | Feedback rápido e não intrusivo (nunca usado para culpa/cobrança). |

## Componentes de progresso

| Componente | Responsabilidade |
|---|---|
| `ProgressBar` | Progresso linear (ex.: meta diária). |
| `ProgressRing` | Progresso circular (ex.: progresso semanal no dashboard). |
| `StreakIndicator` | Exibe dias consecutivos de forma acolhedora, sem tom de pressão. |

## Componentes de estudo

| Componente | Responsabilidade |
|---|---|
| `SessionCard` | Exibe uma sessão de estudo (matéria, horário, duração, status). |
| `ScheduleCalendar` | Visualização do cronograma (semana/dia). |
| `SubjectTag` | Identificação visual rápida de matéria. |
| `PlanSetupWizard` | Fluxo de criação do plano de estudos (curso → matérias → horários → objetivos). |

## Componentes do Avi

| Componente | Responsabilidade |
|---|---|
| `AviAvatar` | Representação visual do mascote Avi. |
| `AviMessageBubble` | Balão de mensagem do Avi, com variações de tom (acolhimento, orientação, celebração). |
| `AviSuggestionCard` | Card de sugestão acionável (ex.: proposta de reorganização de cronograma), sempre com ação de aceitar/ajustar/ignorar. |

## Componentes de dashboard

| Componente | Responsabilidade |
|---|---|
| `NextSessionWidget` | Próxima sessão de estudo. |
| `DailyGoalWidget` | Meta diária e tempo estudado hoje. |
| `WeeklyProgressWidget` | Progresso semanal. |

## Estados obrigatórios por componente interativo

Todo componente que carrega dados deve tratar explicitamente:
1. Estado de carregamento.
2. Estado vazio (ex.: sem sessões hoje) — tratado com acolhimento, nunca como falha.
3. Estado de erro — mensagem clara, sem jargão técnico.
4. Estado de sucesso/preenchido.

## Testes

Componentes visuais devem ter testes de snapshot/render mínimos; lógica de interação (ex.: `PlanSetupWizard`) deve ter testes de comportamento (ex.: Testing Library) cobrindo os principais fluxos.
