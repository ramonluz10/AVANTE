# Deploy em Produção — Avante

## Arquitetura recomendada

- Frontend: Vercel
- Backend: Railway
- Banco: PostgreSQL no Railway
- Código: GitHub
- CI/CD: GitHub Actions + webhook de deploy de host

## Variáveis de ambiente

### Frontend (Vercel)

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### Backend (Railway)

- `PORT`
- `NODE_ENV`
- `FRONTEND_ORIGIN`
- `JWT_SECRET`
- `ACCESS_TOKEN_TTL`
- `REFRESH_TOKEN_TTL`
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL`

## Fluxo de deploy

1. Faça push para `main` no GitHub.
2. O workflow de CI valida o build.
3. O webhook do Railway ou Vercel é acionado.
4. O frontend é publicado no Vercel.
5. O backend é publicado no Railway.
6. O banco permanece protegido e configurado via `DATABASE_URL`.

## Checklist de produção

- Defina todas as variáveis de ambiente no painel do host.
- Use `https` em produção.
- Habilite `health` no backend.
- Configure CORS somente para domínios aprovados.
- Rotacione chaves e secrets periodicamente.
- Ative backups automáticos do PostgreSQL.
- Mantenha `JWT_SECRET` forte e exclusivo.

## Publicação

### Frontend

1. Conecte o repositório no Vercel.
2. Selecione a pasta `frontend`.
3. Configure `NEXT_PUBLIC_API_URL` para a URL pública do backend.
4. Publique automaticamente no push da branch principal.

### Backend

1. Conecte o repositório no Railway.
2. Selecione a pasta `backend` como serviço.
3. Configure `PORT`, `NODE_ENV` e as secrets.
4. Ative o deploy automático na branch `main`.

### Banco

1. Crie um PostgreSQL no Railway.
2. Copie a URL interna/externa do banco.
3. Configure `DATABASE_URL` no backend.
4. Execute `prisma migrate deploy` em produção.
