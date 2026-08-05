# Arquitetura — Avante

## Visão geral

O Avante é composto por três clientes (web, mobile e, futuramente, integrações) consumindo uma API central. A arquitetura prioriza simplicidade no MVP, mas com camadas bem definidas para permitir crescimento sem reescrita.

```
┌────────────┐     ┌────────────┐
│  Frontend   │     │   Mobile    │
│  (Next.js)  │     │  (Flutter)  │
└──────┬──────┘     └──────┬──────┘
       │                    │
       └─────────┬──────────┘
                  │  HTTPS / REST (JSON)
                  ▼
          ┌───────────────┐
          │    Backend     │
          │ (Node.js + TS) │
          │  Clean Arch.   │
          └───────┬────────┘
                  │
        ┌─────────┼─────────┐
        ▼                    ▼
┌───────────────┐    ┌───────────────┐
│  PostgreSQL    │    │ Cloud Storage │
│  (via Prisma)  │    │  (assets/fotos)│
└───────────────┘    └───────────────┘
```

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Frontend web | Next.js + React + TypeScript | SSR/SSG, DX madura, ecossistema React |
| Mobile | Flutter | Um único código para iOS/Android |
| Backend | Node.js + TypeScript | Mesma linguagem do frontend, tipagem forte |
| Banco de dados | PostgreSQL | Relacional, robusto, adequado ao domínio (usuários, planos, sessões) |
| ORM | Prisma | Tipagem end-to-end, migrations versionadas |
| Autenticação | Google OAuth + e-mail/senha | Cobre o caso comum (Google) sem excluir quem prefere e-mail |
| Armazenamento | Cloud Storage | Fotos de perfil, assets gerados |

## Camadas do backend (Clean Architecture, simplificada para o MVP)

```
backend/
├── src/
│   ├── domain/         # Entidades e regras de negócio puras (sem dependências externas)
│   ├── application/    # Casos de uso (ex: GerarCronograma, RegistrarSessaoDeEstudo)
│   ├── infrastructure/ # Implementações concretas (Prisma, OAuth, Storage, IA)
│   ├── interfaces/     # Controllers HTTP, DTOs, validação de entrada
│   └── config/         # Variáveis de ambiente, inicialização
```

Regra prática: `domain` e `application` nunca importam de `infrastructure`. Isso mantém as regras de negócio testáveis sem banco de dados real e permite trocar peças (ex: outro provedor de IA) sem tocar no núcleo.

## Decisões e trade-offs

- **Monorepo vs. multi-repo:** monorepo (`avante/`) no MVP, para reduzir fricção de coordenação entre frontend/backend/mobile enquanto o time é pequeno. Migrar para multi-repo é uma decisão adiável.
- **REST vs. GraphQL:** REST no MVP — menor complexidade operacional, suficiente para os fluxos do MVP (auth, dashboard, plano de estudos). GraphQL pode ser reavaliado se a variedade de clientes/consultas crescer muito.
- **IA:** a integração com o provedor de IA vive isolada em `infrastructure/ai`, atrás de uma interface (`AiMentorPort` ou similar), para não acoplar o domínio a um fornecedor específico. Ver [Guia da IA](guia-da-ia.md).
- **Geração de cronograma:** a lógica de montar o cronograma inicial deve ser determinística e testável (regras + heurísticas), com a IA atuando por cima para reorganizar e explicar — não para gerar o cronograma do zero de forma opaca.

## Segurança e dados

- Senhas nunca em texto puro (hash + salt).
- Tokens de sessão com expiração e renovação segura.
- Segregação clara de variáveis de ambiente sensíveis (nunca versionadas — ver `.gitignore`).
- Conformidade com LGPD para dados pessoais do estudante (ver [Requisitos Não Funcionais](requisitos-nao-funcionais.md)).

## Escalabilidade (pensada, não implementada no MVP)

O MVP roda com arquitetura simples (um serviço backend, um banco). Pontos a considerar quando houver necessidade real de escala:
- Extrair a geração de cronogramas/IA para um worker assíncrono, se o volume de requisições justificar.
- Cache de leitura para dashboard (dados que mudam pouco durante o dia).
- CDN para assets estáticos.

Nenhum desses pontos deve ser implementado preventivamente — apenas quando houver evidência real de necessidade.
