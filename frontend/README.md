# Frontend — Avante

Aplicação web do Avante.

## Stack

- Next.js
- React
- TypeScript

## Estrutura sugerida

```
frontend/
├── src/
│   ├── app/            # rotas (App Router)
│   ├── components/     # componentes de UI (ver docs/componentes.md)
│   ├── hooks/          # hooks de dados e estado
│   ├── services/       # chamadas à API (backend/api)
│   ├── styles/         # tokens e estilos globais (ver docs/design-system.md)
│   └── types/          # tipos compartilhados
├── public/
├── package.json
└── tsconfig.json
```

## Como rodar (a preencher conforme o setup real)

```bash
npm install
npm run dev
```

## Referências

- [Componentes](../docs/componentes.md)
- [Design System](../docs/design-system.md)
- [APIs](../docs/apis.md)
