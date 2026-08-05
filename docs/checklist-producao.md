# Checklist de Produção — Avante

## Repositório

- [ ] GitHub conectado com branch `main`
- [ ] `.gitignore` bloqueando `.env`, `.next`, `node_modules` e segredos
- [ ] README profissional atualizado
- [ ] Workflow de CI/CD em `.github/workflows/`

## Frontend — Vercel

- [ ] Repositório conectado ao Vercel
- [ ] Build habilitada para `frontend/`
- [ ] `NEXT_PUBLIC_API_URL` configurado
- [ ] `NEXTAUTH_SECRET` configurado
- [ ] HTTPS habilitado
- [ ] Cache e compressão ativados pelo framework

## Backend — Railway

- [ ] Serviço conectado ao GitHub
- [ ] Porta dinâmica com `process.env.PORT`
- [ ] `health` respondendo `200`
- [ ] `helmet`, `cors`, `rate limit` e `compression` ativos
- [ ] Secrets configuradas no ambiente do host
- [ ] Logs e observabilidade habilitados

## Banco — PostgreSQL no Railway

- [ ] PostgreSQL provisionado
- [ ] `DATABASE_URL` configurada
- [ ] Prisma conectado
- [ ] Migrations aplicadas
- [ ] Backup automatizado configurado

## Segurança

- [ ] JWT com secreta forte
- [ ] Senhas com hash (Argon2)
- [ ] CORS restritivo
- [ ] Headers de segurança ativos
- [ ] Rate limit para endpoints sensíveis
- [ ] Sanitização e validação de entrada
- [ ] Secrets nunca no Git
