# Implementação de Segurança — Avante

## Visão Geral

A implementação foi organizada para cobrir os pilares de segurança do projeto com uma base executável e documentada.

## Camadas implementadas

### Backend

- `Security Layer` como camada obrigatória de proteção
- `auth` com registro, login, refresh e logout
- `JWT` com refresh token
- `cookie HttpOnly`
- `Argon2` para hash de senha
- `rate limit`
- `Helmet`
- `CORS`
- `sanitização` de payload
- `logs` de segurança
- `guard` de autorização

### Frontend

- `middleware` para bloquear rotas privadas sem sessão
- headers rígidos via `next.config.mjs`
- sessão observada no client
- ausência de storage persistente para autenticação

## Fluxo de segurança real

```text
Usuário
 ↓
Frontend
 ↓
API
 ↓
Security Layer
 ↓
Auth / Permission guard
 ↓
Banco / memória em fase inicial
 ↓
Resposta
```

## Arquivos relevantes

- [avante/backend/src/security/authentication/authController.js](avante/backend/src/security/authentication/authController.js)
- [avante/backend/src/security/authentication/authRoutes.js](avante/backend/src/security/authentication/authRoutes.js)
- [avante/backend/src/security/authorization/permissionGuard.js](avante/backend/src/security/authorization/permissionGuard.js)
- [avante/backend/src/security/validators/requestSanitizer.js](avante/backend/src/security/validators/requestSanitizer.js)
- [avante/backend/src/server.js](avante/backend/src/server.js)
- [avante/frontend/middleware.ts](avante/frontend/middleware.ts)
- [avante/frontend/next.config.mjs](avante/frontend/next.config.mjs)

## Observações

- A autenticação inicial está em memória e pronta para evolução para Prisma + PostgreSQL.
- O objetivo atual é proporcionar regulagem segura, rastreabilidade e isolamento de acesso.
