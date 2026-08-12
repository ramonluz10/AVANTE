# AVANTE

![Deploy frontend to GitHub Pages](https://github.com/ramonluz10/AVANTE/actions/workflows/static.yml/badge.svg)

**Um passo de cada vez.**

Avante é uma plataforma inteligente de planejamento e acompanhamento de estudos, criada para ajudar estudantes a estudarem melhor, criarem constância e evoluírem profissionalmente.

Este repositório não guarda apenas código — ele guarda a filosofia do produto. Antes de abrir uma issue, propor uma funcionalidade ou revisar uma PR, vale reler `docs/manual-da-marca.md` e `docs/requisitos-funcionais.md`. A pergunta que toda decisão precisa responder é sempre a mesma:

> **"Isso realmente ajuda o estudante?"**

## Missão

Ajudar estudantes a estudar, aprender e evoluir como profissionais através de uma plataforma inteligente, organizada, acolhedora e humana.

## Visão

Ser a maior plataforma brasileira de planejamento e acompanhamento inteligente de estudos.

## Estrutura do repositório

```
avante/
├── docs/            → documentação de produto, arquitetura e design
├── frontend/         → aplicação web (Next.js + React + TypeScript)
├── backend/          → API e regras de negócio (Node.js + TypeScript)
├── database/          → schema, migrations e seeds (PostgreSQL + Prisma)
├── mobile/           → aplicativo mobile (Flutter)
├── api/              → contratos de API, coleções de testes, especificações
├── assets/           → marca, ícones, ilustrações, fontes
├── prototypes/       → protótipos de tela e fluxos (Figma exports, mockups)
└── .github/          → templates de issue/PR e workflows de CI
```

## Documentação

| Documento | Conteúdo |
|---|---|
| [Manual da Marca](docs/manual-da-marca.md) | Identidade, missão, mascote Avi, tom de voz |
| [Roadmap](docs/roadmap.md) | Fases do MVP e funcionalidades futuras |
| [Arquitetura](docs/arquitetura.md) | Stack, camadas, decisões técnicas |
| [Requisitos Funcionais](docs/requisitos-funcionais.md) | O que o sistema faz |
| [Requisitos Não Funcionais](docs/requisitos-nao-funcionais.md) | Como o sistema deve se comportar |
| [Guia do Avi](docs/guia-do-avi.md) | Persona e regras de comportamento do mentor |
| [Guia da IA](docs/guia-da-ia.md) | Funções e limites da inteligência artificial |
| [Banco de Dados](docs/banco-de-dados.md) | Modelagem de entidades |
| [APIs](docs/apis.md) | Endpoints do MVP |
| [Componentes](docs/componentes.md) | Biblioteca de componentes de UI |
| [Design System](docs/design-system.md) | Cores, tipografia, espaçamento |

## Stack (MVP)

- **Frontend:** Next.js + React + TypeScript
- **Mobile:** Flutter
- **Backend:** Node.js + TypeScript
- **Banco de dados:** PostgreSQL + Prisma
- **Autenticação:** Google OAuth + e-mail/senha
- **Armazenamento:** Cloud Storage

## Como contribuir

1. Leia `docs/manual-da-marca.md` e `docs/roadmap.md` antes de propor qualquer mudança.
2. Toda funcionalidade nova deve ser justificada em uma issue, respondendo: isso ajuda o estudante a estudar, aprender ou evoluir?
3. Prefira a solução mais simples que entregue o mesmo valor.
4. Siga Clean Architecture e SOLID onde fizer sentido — sem complexidade desnecessária.
5. Abra PRs pequenas e objetivas, usando o template em `.github/PULL_REQUEST_TEMPLATE.md`.

## Deploy e produção

A arquitetura recomendada para produção é:

- Frontend em Vercel
- Backend em Railway
- Banco PostgreSQL em Railway
- GitHub como repositório e trigger de CI/CD

### Fluxo recomendado

```text
git push
  ↓
GitHub
  ↓
Vercel publica o frontend
  ↓
Railway publica o backend
  ↓
PostgreSQL permanece sincronizado via Railway / Prisma
```

Para o roteiro completo de publicação, consulte [docs/deploy-producao.md](docs/deploy-producao.md) e [docs/checklist-producao.md](docs/checklist-producao.md).

## Status

🚧 Em desenvolvimento — Fase MVP (ver `docs/roadmap.md`).

## Licença

Ver [LICENSE](LICENSE).
