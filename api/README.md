# API (contratos e especificações) — Avante

Esta pasta guarda artefatos de contrato de API que não são código-fonte do backend em si:

- Especificação OpenAPI/Swagger (quando formalizada a partir de [docs/apis.md](../docs/apis.md)).
- Coleções de teste (Postman/Insomnia/Bruno).
- Exemplos de payloads de request/response para uso em testes de integração e no desenvolvimento do frontend/mobile antes do backend estar pronto (contract-first, quando fizer sentido).

## Estrutura sugerida

```
api/
├── openapi.yaml
├── postman/
│   └── avante.postman_collection.json
└── examples/
    ├── dashboard.response.json
    └── planos.request.json
```

## Referências

- [APIs](../docs/apis.md) — fonte de verdade em linguagem natural sobre os endpoints do MVP.
