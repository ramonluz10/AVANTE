# Arquitetura de Segurança — Projeto Avante

## 1. Visão Executiva

A arquitetura de segurança do Avante foi desenhada para operar como uma plataforma de software resiliente, modular e preparada para crescimento em escala e maturidade. A solução deve ser tratada como um sistema de confiança, não como uma aplicação com login isolado.

A base arquitetural segue os princípios:

- Security First
- Privacy by Design
- Least Privilege
- Defense in Depth
- Zero Trust
- Fail Secure
- Secure by Default
- Clean Architecture
- SOLID
- OWASP Top 10
- OWASP ASVS
- OWASP API Security Top 10

A camada central do sistema é a Security Layer, que deve interceptar toda requisição de forma obrigatória e conduzir a análise antes que qualquer módulo de negócio seja acessado.

---

## 2. Objetivos de Segurança

### 2.1 Objetivos Estratégicos

1. Proteger identidade, sessão e autorização.
2. Garantir confidencialidade dos dados do usuário.
3. Isolar o uso da IA e impedir vazamento de contexto interno.
4. Prevenir abuso pela API e por prompt malicioso.
5. Garantir rastreabilidade completa por auditoria.
6. Permitir crescimento para milhares de usuários sem reestruturação.
7. Mantém a arquitetura compatível com microserviços e Kubernetes no futuro.

### 2.2 Objetivos Operacionais

- todas as chamadas devem sair com resposta padrão
- toda operação crítica deve possuir log e auditoria
- nenhuma chave secreta deve ficar no frontend
- cada módulo deve ter responsabilidade única
- nenhuma camada pode confiar na camada anterior sem validação

---

## 3. Modelo de Segurança Aplicado

### 3.1 Defense in Depth

A proteção deve ser cumulativa e estratificada.

Cascata recomendada:

1. Frontend protegido
2. API protegida por rate limit, validação, CORS e CSP
3. Security Layer com autenticação, autorização e auditoria
4. Serviços de negócio com regras próprias e contexto validado
5. Banco com usuário mínimo, TLS, logs e backups
6. Observabilidade e alertas para detecção contínua

### 3.2 Zero Trust

Nenhuma requisição é confiável por padrão.

Cada operação deve validar:

- identidade
- sessão
- origem
- permissão
- contexto do usuário
- risco do request
- consistência da chamada

### 3.3 Least Privilege

Toda identidade deve receber o menor conjunto de permissões possível.

Exemplos:

- o serviço de dashboard não acessa dados administrativos
- a IA Luna não acessa o banco diretamente
- o backend de chat não modula privilégios de admin
- o usuário só acessa seus próprios dados

### 3.4 Fail Secure

Se algo falhar, o sistema deve falhar de forma segura.

Exemplos:

- token inválido → 401
- abuso de API → 429
- falha na IA → resposta segura e sem vazamento
- falha no banco → resposta sem stack trace

### 3.5 Secure by Default

Toda configuração padrão deve ser segura.

Exemplo:

- cookie HttpOnly
- `SameSite=Lax` ou `Strict`
- TLS obrigatório
- ssh/secret manager
- rate limit habilitado
- logs estruturados por padrão

### 3.6 Privacy by Design

Os dados pessoais devem ser minimizados e tratados apenas quando estritamente necessários.

- nenhum dado sensível em `localStorage`
- nenhuma senha em logs
- nenhuma chave em frontend
- autorização por escopo
- auditoria sem conteúdo privado

---

## 4. Estrutura Proposta de Diretórios

```text
src/
  security/
    authentication/
    authorization/
    middleware/
    validators/
    encryption/
    permissions/
    audit/
    logs/
    monitoring/
    config/

  modules/
    users/
    auth/
    studies/
    ai/
    dashboard/

  shared/
    errors/
    responses/
    constants/
    utils/
    types/

  database/
    prisma/
    migrations/
    seeds/
    repositories/

  tests/
    unit/
    integration/
    security/
    owasp/
    e2e/
```

### 4.1 `src/security/`

Diretório central de proteção transversal.

Responsabilidade: 

- concentrar políticas de autenticação, autorização, validação, auditoria e monitoramento.
- garantir que toda chamada seja validada antes do acesso a qualquer módulo de negócio.

Subdiretórios:

- `authentication/`: JWT, refresh token, sessão, cookies.
- `authorization/`: RBAC, ABAC, políticas por módulo.
- `middleware/`: rate limit, CORS, Helmet, CSP, guard de requisições.
- `validators/`: Zod, Yup, schema validation e sanitização.
- `encryption/`: Argon2, JWT signing e gerenciamento de secrets.
- `permissions/`: regras por uso e by-role.
- `audit/`: rastreio de mudanças críticas.
- `logs/`: logging estruturado.
- `monitoring/`: métricas, alertas, health checks.
- `config/`: env, policies, defaults, feature flags.

### 4.2 `src/modules/users/`

Responsável por identificação estável do usuário.

Inclui:

- perfil
- preferências
- configurações pessoais
- consentimento
- dados de contato

### 4.3 `src/modules/auth/`

Responsável pelo ciclo de identidade.

Inclui:

- login
- logout
- refresh
- recuperação de senha
- MFA futuro
- sessão e invalidação

### 4.4 `src/modules/studies/`

Responsável por tarefas e organização de estudo.

Inclui:

- plano de estudos
- foco do dia
- metas
- calendário
- progresso

### 4.5 `src/modules/ai/`

Responsável pela lógica do Luna e pela segurança de IA.

Inclui:

- orquestração de prompts
- regras de resposta
- inspeção de prompt injection
- isolamento de contexto
- limites de ação

### 4.6 `src/modules/dashboard/`

Responsável pela consolidação de visão para o usuário.

Inclui:

- sumarização
- painel de progresso
- métricas do dia
- sugestão de continuidade

### 4.7 `src/shared/`

Responsável por utilidades e contratos compartilhados.

Inclui:

- erros comuns
- responses padronizadas
- constants
- type definitions
- helpers gerais

### 4.8 `src/database/`

Responsável pela persistência e acesso seguro ao banco.

Inclui:

- Prisma
- migrations
- seeds
- repository layer
- transações e queries

### 4.9 `src/tests/`

Responsável por validação de qualidade e segurança.

Inclui:

- unit tests
- integration tests
- security tests
- OWASP validation
- pen-test simulation
- CI security gates

---

## 5. Security Layer — Camada Exclusiva de Proteção

A Security Layer deve ser a primeira e obrigatória porta de entrada para qualquer request.

### 5.1 Função

A Security Layer é responsável por:

- autenticação
- autorização
- rate limit
- validação
- sanitização
- logs
- auditoria
- criptografia
- monitoramento
- proteção contra ataques
- tratamento de erros
- controle de sessões

### 5.2 Regra de Ouro

Nenhuma requisição deve acessar a lógica de negócio sem passar por essa camada.

### 5.3 Fluxo da Security Layer

```text
Request
  ↓
Security Layer
  ├─ parse/validate headers
  ├─ origin + CORS validation
  ├─ body schema validation
  ├─ input sanitization
  ├─ CSRF / token validation
  ├─ JWT validation
  ├─ permission check
  ├─ rate limit
  ├─ request fingerprint
  ├─ log + audit
  └─ allow or deny
  ↓
Application Service
```

### 5.4 Proteções da Layer

- validação de payload
- validação de headers
- validação de conteúdo
- validação token
- validação de sessão
- validação de CSP e origin
- proteção contra overflows e abuse

---

## 6. Fluxo Completo de Requisição

### 6.1 Fluxo de Tarefa

```text
Usuário
  ↓
Frontend
  ↓
API
  ↓
Security Layer
  ↓
Serviços
  ↓
Banco de Dados
  ↓
Resposta
```

### 6.2 Validações em Cada Etapa

#### Usuário

- interage com UI
- deve possuir sessão válida
- deve ter acesso permitido por role

#### Frontend

- não expõe tokens em localStorage
- usa cookies HttpOnly para sessão
- redireciona para rotas protegidas
- só envia payloads limitados e validados
- aplica sanitização mínima de entrada

#### API

- valida `Content-Type`
- valida schema do JSON
- valida headers e cookies
- aplica rate limit
- valida CORS
- valida origem e device
- registra request id

#### Security Layer

- autentica o token
- valida `exp`, `iat`, `aud`, `iss`
- valida refresh token
- valida role e scope
- verifica CSP/headers
- aplica regra de risco e auditoria

#### Serviços

- acessa apenas dados autorizados
- transações e regras de domínio
- usa DTOs validados
- não admite acesso direto a banco por camada de apresentação

#### Banco de Dados

- acesso por Prisma
- acesso mínimo por usuário de app
- transações controladas
- logs de acesso e mudanças
- backups ativos e criptografados

#### Resposta

- resposta padronizada
- headers de segurança
- status HTTP consistente
- log de sucesso ou falha
- nenhuma stack trace em produção

---

## 7. Autenticação e Sessão

### 7.1 Stack recomendada

- JWT para sessão curta
- Refresh Token para renovação de sessão
- Cookies HttpOnly
- `SameSite=Lax|Strict`
- `Secure=true` em produção

### 7.2 Fluxo de Autenticação

```text
Login
  ↓
API valida credenciais
  ↓
Security Layer checa hash Argon2
  ↓
Gera access token
  ↓
Gera refresh token
  ↓
Armazena refresh token com hash
  ↓
Envia cookie HttpOnly seguro
  ↓
Resposta autenticada
```

### 7.3 Regras

- access token de curta duração
- refresh token rotativo
- revogação por logout
- revogação por troca de senha
- invalidar sessões suspeitas
- manter `token id` e `device id`

### 7.4 Boas Práticas

- usar `Argon2` para senha
- nunca usar SHA-1 / MD5 para autenticação
- nunca armazenar senha em texto claro
- nunca logar senha ou token

---

## 8. Autorização

### 8.1 Modelo

- RBAC: admin, user, auditor, support
- ABAC: owner, scope, context, device, geolocation

### 8.2 Como aplicar

Cada endpoint deve definir:

- `resource`
- `action`
- `subject`
- `context`

Exemplo:

```text
resource: studies
action: write
subject: user
context: owner
```

### 8.3 Política de acesso

- usuário só acessa o seu conteúdo
- admin acessa operações globais
- IA tem acesso apenas ao contexto permitido
- serviços não possuem acesso horizontal em recursos de outros domínios

---

## 9. API Security Architecture

Toda API deve garantir:

- validação obrigatória
- rate limit
- CORS configurado
- Helmet habilitado
- Content Security Policy
- sanitização
- tratamento de erros
- logs
- controle de permissões
- respostas padronizadas

### 9.1 Regras de API

#### Validação

- body schema
- query string validation
- headers validation
- enum validation

#### Rate Limit

- por IP
- por usuário
- por endpoint crítico
- com backoff e alerta

#### CORS

- whitelist de origens
- não aceitar origens arbitrárias
- origin check em runtime

#### Helmet

- remover `x-powered-by`
- headers de proteção
- políticas de conteúdo

#### CSP

- `default-src 'self'`
- `img-src` controlado
- `script-src` restrito
- `frame-ancestors 'none'`
- sem inline scripts inseguros

#### Sanitização

- remover HTML bruto em campos de texto
- aplicar escape em contexto de render
- validar busca e payload

#### Tratamento de Erros

- classes de erro centralizadas
- codigo identificável
- mensagem genérica em produção
- request id para rastreio

#### Respostas Padronizadas

```json
{
  "success": false,
  "error": {
    "code": "AUTH_REQUIRED",
    "message": "Acesso não autorizado"
  },
  "requestId": "uuid"
}
```

---

## 10. Frontend Security Architecture

### 10.1 Proteção contra XSS

- React como base segura
- evitar `dangerouslySetInnerHTML`
- sanitizer em inputs de texto
- validação dos dados recebidos da API
- CSP no domínio

### 10.2 Proteção de Tokens

- lembrar sempre: tokens não ficam em `localStorage`
- usar cookie HttpOnly e session-controlled
- access token é curto e transitório
- refresh token é protegido e com rotação

### 10.3 Armazenamento Seguro

- armazenamento local apenas para estado não-sensível
- sessão no servidor e cookies seguros
- nada de secret no frontend

### 10.4 Rotas Protegidas

- middleware de roteamento por sessão
- redirecionamento para login
- validação de role no servidor
- nunca depender do frontend como única linha de defesa

### 10.5 Sessão e Controle de Permissão

- o usuário só acessa o que o backend autoriza
- dashboard e páginas de administrador usam guard de permissions
- toda ação crítica deve ser revalidada no backend

### 10.6 Manipulação de Interface

A interface nunca deve ser tratada como “trusted source”.

Qualquer manipulação enviada pelo cliente deve ser validada em servidor.

---

## 11. IA Luna — AI Security Layer

A IA Luna deve ser protegida por uma camada exclusiva de segurança, isolada da lógica de negócio comum.

### 11.1 Objetivo

Garantir que a IA nunca:

- revele prompts internos
- revele arquitetura
- revele tokens
- revele variáveis de ambiente
- acesse dados de outros usuários
- execute comandos administrativos
- ignore regras de segurança
- aceite Prompt Injection
- aceite Jailbreak
- acesse banco diretamente

### 11.2 AI Security Layer

Ela fica entre o usuário e o provedor LLM.

Responsabilidades:

1. autenticar o usuário
2. validar escopo da sessão
3. limpar prompt de entrada
4. bloquear comandos indesejados
5. bloquear prompt injection e jailbreak
6. isolar contexto por usuário
7. registrar logs e auditoria
8. validar resposta
a
a
9. controlar o uso do modelo
10. impedir vazamento de secrets

### 11.3 Fluxo da IA

```text
Usuário
  ↓
Frontend
  ↓
API
  ↓
AI Security Layer
  ├─ valida sessão
  ├─ valida permissão do módulo
  ├─ remove contextos internos
  ├─ aplica prompt filter
  ├─ bloqueia tool/admin access
  ├─ isola contexto por usuário
  ├─ registra observabilidade
  └─ envia prompt seguro ao LLM
  ↓
LLM
  ↓
Resposta filtrada e validada
  ↓
Resposta final
```

### 11.4 Proteções da IA

- prompt sandbox
- secret redaction
- blocked capabilities
- prompt classifier
- user context isolation
- resposta com policy enforcement
- log de uso e anomalia

### 11.5 Riscos Mitigados

- prompt injection
- data leakage
- prompt self-disclosure
- internal architecture disclosure
- unwanted admin behavior
- cross-user context contamination

---

## 12. Logs e Auditoria

### 12.1 O que registrar

- login
- logout
- erros
- alterações
- tentativas inválidas
- mudanças de senha
- alterações administrativas
- requisições suspeitas

### 12.2 O que jamais registrar

- senhas
- tokens
- secrets
- chaves de ambiente
- arrays de sessão intactos
- qualquer payload privado sem necessidade

### 12.3 Estrutura mínima de log

```json
{
  "timestamp": "2026-08-02T00:00:00Z",
  "requestId": "uuid",
  "userId": "uuid",
  "role": "user",
  "ip": "203.0.113.10",
  "userAgent": "Mozilla/5.0",
  "endpoint": "/api/avi/chat",
  "status": 200,
  "riskLevel": "low",
  "module": "ai"
}
```

### 12.4 Auditoria de Ações Críticas

- alteração de perfil
- reset de senha
- aumento de privilégio
- logout forçado
- bloqueio de IA
- bloqueio por suspicious behavior

---

## 13. Monitoramento

### 13.1 Stack Open Source / Grátis

- Prometheus
- Grafana
- Loki
- OpenTelemetry
- Uptime Kuma
- Alertmanager

### 13.2 O que monitorar

- disponibilidade
- erros HTTP
- auth failures
- rate limiting
- p95/p99 de latência
- uso do modelo IA
- falhas de banco
- spikes de uso

### 13.3 Alertas

- login em massa falhando
- spike de 429
- token inválido em larga escala
- resposta de IA bloqueada repetidamente
- disponibilidade abaixo de SLA

---

## 14. Backups e Recuperação

### 14.1 Política Recomendada

- backup diário
- backup semanal
- backup mensal
- teste de restauração
- versionamento
- criptografia

### 14.2 Regras

- backup em armazenamento protegido
- criptografia no backup
- controles de acesso por ambiente
- retenção por ciclo de negócio
- restore test periódico

### 14.3 Recuperação

- RPO: 24h
- RTO: < 4h para ambiente crítico
- restore controlado em staging antes de produção

---

## 15. Banco de Dados — Regras de Segurança

### 15.1 Princípio do Menor Privilégio

- usuário de app com acesso limitado
- service account específico por módulo
- acesso direto de admin apenas por break-glass controlado

### 15.2 Conexões Seguras

- TLS obrigatório
- SSL mode obrigatório
- secret manager
- pool configurado por carga

### 15.3 Criptografia

- hashes com Argon2
- secrets em ambiente protegido
- dados sensíveis criptografados por necessidade

### 15.4 Auditoria

- log de mudanças por usuário
- histórico de versão de registros críticos
- registros e metadados sem senha

### 15.5 Migrações Seguras

- pipeline de validação
- staging antes de produção
- rollback definido
- migration test em CI

### 15.6 Proteção contra SQL Injection

- Prisma obrigatório
- prepared statements
- blocos de queries tipadas
- nenhum `raw` sem necessidade e sem concatenação de entrada

---

## 16. Testes de Segurança

### 16.1 Testes Unitários

- schema validation
- auth guards
- permission check
- hash verification
- error mapping

### 16.2 Testes de Integração

- login e refresh
- permissão por role
- acesso de rota protegida
- token inválido

### 16.3 Testes de Segurança

- XSS attempt
- SQL injection attempt
- path traversal
- rate limit verification
- CSRF attempt

### 16.4 OWASP e Pen-tests

- broken access control
- authentication flaws
- SSRF
- prompt injection
- secret leakage
- insecure deserialization

### 16.5 CI/CD

Pipeline recomendada:

```text
commit
  ↓
lint
  ↓
unit tests
  ↓
integration tests
  ↓
security tests
  ↓
build
  ↓
deploy to staging
  ↓
OWASP checks
  ↓
deploy to production
```

---

## 17. Documentação por Módulo

Todo módulo precisa possuir documentação obrigatória.

Estrutura mínima:

- objetivo
- responsabilidade
- dependências
- fluxo
- exemplo
- boas práticas
- riscos
- melhorias futuras

Exemplo:

```md
# Módulo Auth

## Objetivo
Autenticar usuários e validar sessão.

## Responsabilidade
Emitir tokens, manter sessão e controlar refresh.

## Dependências
JWT, Prisma, Redis, cookies.

## Fluxo
Login → validar → gerar tokens → cookie → redirect.

## Exemplo
... payload ...

## Boas práticas
... regras ...

## Riscos
... risco ...

## Melhorias futuras
MFA, device binding, session management.
```

---

## 18. Escalabilidade

A arquitetura foi pensada para crescimento sem reestruturação.

### 18.1 Componentes de Escala

- CDN para assets públicos
- load balancer
- cluster de frontend
- cluster de API
- Redis para cache e rate limit
- filas para jobs assíncronos
- banco replicado ou sharded por necessidade
- containerização com Docker
- orquestração com Kubernetes

### 18.2 Modelo Futuro

```text
User
  ↓
CDN / Edge
  ↓
Load Balancer
  ↓
Frontend Cluster
  ↓
API Cluster
  ↓
Security Layer
  ↓
Service Cluster
  ↓
PostgreSQL
  ↓
Redis
```

---

## 19. Decisão Arquitetural Central

A arquitetura segura do Avante deve operar com:

- Security Layer central obrigatória
- AI Security Layer isolada
- Prisma + PostgreSQL
- Redis para cache e throttling
- JWT + Refresh Token + HttpOnly cookies
- observabilidade open source
- documentação obrigatória por módulo

Essa combinação torna o sistema:

- modular
- escalável
- auditável
- resiliente
- preparado para crescimento em longa maturidade

---

## 20. Plano de Evolução da Segurança para os Próximos Anos

### Fase 1 — MVP Seguro

- cookies HttpOnly
- JWT curta duração
- rate limit por endpoint
- Helmet + CSP
- Prisma com query validation
- logs estruturados

### Fase 2 — Operação Segura

- refresh token rotativo
- MFA para usuários críticos
- logs de auditoria por ação administrativa
- backup testado e criptografado
- alertas com Grafana/Loki

### Fase 3 — Compliance e Resiliência

- RBAC/ABAC sofisticado
- WAF
- policy engine
- segregação por domínio
- sessões com device binding

### Fase 4 — Escala Industrial

- microserviços por módulos
- filas para eventos e jobs
- cache distribuído
- observabilidade global
- recuperação de desastre com simulação periódica

---

## 21. Conclusão

A arquitetura de segurança do Avante deve ser tratada como um pilar de engenharia do produto e não apenas como um componente transversal leve. A adoção de uma Security Layer obrigatória, a segregação de módulos, a proteção da IA com uma AI Security Layer, a autenticação com JWT e refresh rotativo, e o uso de banco e observabilidade com controle e auditoria são fundamentos que permitem o projeto crescer sem perder segurança.

Nesse desenho, a segurança não é um adorno. Ela é a base do produto.
