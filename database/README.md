# Database — Avante

Schema, migrations e seeds do PostgreSQL, versionados via Prisma.

Nota: o `schema.prisma` "de verdade" normalmente vive dentro de `backend/prisma/`, já que o Prisma Client é gerado e consumido pelo backend. Esta pasta serve para:

- Documentação de modelagem independente de implementação (ver [Banco de Dados](../docs/banco-de-dados.md)).
- Scripts de seed para ambiente de desenvolvimento.
- Scripts de backup/restore, se necessário.

## Estrutura sugerida

```
database/
├── seeds/
│   └── seed-dev.ts       # dados de exemplo para desenvolvimento local
├── scripts/
│   └── backup.sh
└── README.md
```

## Referências

- [Banco de Dados](../docs/banco-de-dados.md)
- [Arquitetura](../docs/arquitetura.md)
