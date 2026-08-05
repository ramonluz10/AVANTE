# Security Layer

## Objetivo

Centralizar todas as regras de proteção antes do acesso à lógica de negócio.

## Responsabilidade

- autenticação
- autorização
- rate limit
- validação
- sanitização
- logs
- auditoria
- criptografia
- monitoramento
- proteção contra abuso

## Dependências

- Express
- Helmet
- express-rate-limit
- crypto
- console structured logging

## Fluxo

1. a requisição entra na API
2. o middleware de segurança valida origem, método e payload
3. o token e a sessão são verificados
4. a autorização é aplicada
5. a request é registrada para auditoria
6. somente depois disso o serviço de negócio é chamado

## Boas práticas

- nenhuma requisição deve entrar em serviço sem passar pela layer
- nunca registrar senhas, tokens ou secrets
- validar origem, payload e permissões de forma explícita
- usar o menor privilégio possível

## Riscos

- rota pública sem validação
- abuso por brute force
- payload malformado
- bypass de permission check

## Melhorias futuras

- MFA
- Redis para refresh token e throttling
- observabilidade centralizada
- device binding
