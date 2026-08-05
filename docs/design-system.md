# Design System — Avante

## Princípios visuais

Minimalista. Acolhedor. Moderno. Fundo claro. A interface deve transmitir calma — nunca ansiedade ou urgência visual.

## Cores

| Token | Uso | Valor sugerido |
|---|---|---|
| `--avante-blue` | Cor principal — ações, navegação, identidade | `#2563EB` |
| `--avante-blue-dark` | Hover/estados ativos da cor principal | `#1D4ED8` |
| `--avante-white` | Base de fundo | `#FFFFFF` |
| `--avante-gray-50` | Fundo secundário / cards | `#F8FAFC` |
| `--avante-gray-200` | Bordas e divisores | `#E2E8F0` |
| `--avante-gray-600` | Texto secundário | `#475569` |
| `--avante-gray-900` | Texto principal | `#0F172A` |
| `--avante-green` | **Exclusivo** para indicar progresso (barras, streaks, conclusão) | `#16A34A` |
| `--avante-yellow` | **Exclusivo** para destaques pontuais (nunca para erro ou alerta) | `#EAB308` |
| `--avante-red` | Erros e estados críticos (uso mínimo, nunca decorativo) | `#DC2626` |

**Regra importante:** verde e amarelo têm função semântica fixa (progresso e destaque, respectivamente) e não devem ser usados decorativamente em outros contextos — isso preserva o significado visual em toda a plataforma.

## Tipografia

- Fonte recomendada: uma sans-serif humanista e legível (ex.: Inter ou similar), tanto para títulos quanto para corpo de texto — reforçando o tom acolhedor e evitando frieza excessiva de fontes puramente geométricas.
- Escala sugerida:

| Token | Tamanho | Uso |
|---|---|---|
| `--font-xs` | 12px | Legendas, metadados |
| `--font-sm` | 14px | Texto secundário |
| `--font-base` | 16px | Corpo de texto |
| `--font-lg` | 20px | Subtítulos |
| `--font-xl` | 28px | Títulos de seção |
| `--font-2xl` | 36px | Títulos principais / telas de destaque |

## Espaçamento

Escala em múltiplos de 4px, para consistência entre web e mobile:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`

- Espaçamento interno mínimo de componentes interativos (botões, cards clicáveis): 12px.
- Espaçamento entre blocos de conteúdo no dashboard: 24–32px, para reforçar a sensação de "respiro" e calma.

## Raio de borda

- Componentes pequenos (botões, inputs, badges): `8px`.
- Cards e containers maiores: `16px`.
- Avatares e elementos circulares: `9999px` (círculo completo).

## Elevação (sombra)

Uso discreto — o Avante não usa sombras pesadas ou efeitos de profundidade dramáticos, coerente com o princípio de calma visual.

| Token | Uso |
|---|---|
| `--shadow-sm` | Cards em repouso |
| `--shadow-md` | Cards em hover/foco, modais |

## Ícones

- Estilo de linha (outline), não preenchido — reforça leveza visual.
- Tamanho padrão: 20px (interfaces densas) ou 24px (ações principais).

## Logo

Baseada na letra "A", representando caminho, evolução e progresso. Deve existir em três formatos:
1. Wordmark completo ("Avante") — uso em cabeçalhos e materiais de marca.
2. Ícone isolado (o "A") — favicon, ícone de app, avatares do sistema.
3. Versão monocromática (branca ou azul sólida) — uso sobre fundos coloridos ou fotográficos.

## Acessibilidade

- Contraste mínimo AA entre texto e fundo em todas as combinações de cor acima.
- Nunca usar cor como único indicador de estado (ex.: progresso concluído deve ter também um ícone de check, não apenas a cor verde).
