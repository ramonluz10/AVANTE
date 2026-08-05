# Backend — Avante

API central do Avante.

## Como rodar agora (chat do Avi com IA real)

```bash
cd backend
npm install
cp .env.example .env   # depois edite .env e coloque sua OPENAI_API_KEY
npm run dev
```

O servidor sobe em `http://localhost:4000`. Com o frontend rodando em `http://localhost:3000`
(`cd frontend && npm run dev`), a página `/avi` já conversa de verdade com o modelo da OpenAI
através do endpoint `POST /api/avi/chat`.

⚠️ **Nunca** commite o arquivo `.env` (ele já está no `.gitignore`) — ele contém sua chave secreta.
Se uma chave for exposta acidentalmente (ex: colada em um chat, print, ou commit), revogue-a no
painel da OpenAI e gere uma nova.

---

## Stack

- Node.js
- TypeScript
- Prisma (ORM)
- PostgreSQL

## Estrutura sugerida (Clean Architecture)

```
backend/
├── src/
│   ├── domain/          # entidades e regras de negócio puras
│   ├── application/     # casos de uso (ex: GerarCronograma)
│   ├── infrastructure/  # Prisma, OAuth, Storage, IA (implementações concretas)
│   ├── interfaces/      # controllers HTTP, DTOs, validação
│   └── config/          # variáveis de ambiente, inicialização
├── prisma/
│   └── schema.prisma
├── package.json
└── tsconfig.json
```

## Como rodar (a preencher conforme o setup real)

```bash
npm install
npx prisma migrate dev
npm run dev
```

## Referências

- [Arquitetura](../docs/arquitetura.md)
- [Requisitos Funcionais](../docs/requisitos-funcionais.md)
- [Requisitos Não Funcionais](../docs/requisitos-nao-funcionais.md)
- [Banco de Dados](../docs/banco-de-dados.md)
- [APIs](../docs/apis.md)
- [Guia da IA](../docs/guia-da-ia.md)
