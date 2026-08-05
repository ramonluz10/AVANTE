# APIs — Avante (MVP)

Base URL sugerida: `/api/v1`. Formato: REST + JSON. Autenticação via Bearer token (JWT ou sessão, a definir em `backend/`).

## Autenticação

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/registro` | Cadastro por e-mail e senha |
| POST | `/auth/login` | Login por e-mail e senha |
| GET | `/auth/google` | Início do fluxo OAuth Google |
| GET | `/auth/google/callback` | Callback do OAuth Google |
| POST | `/auth/verificar-email` | Confirma verificação de e-mail via token |
| POST | `/auth/esqueci-senha` | Solicita e-mail de recuperação de senha |
| POST | `/auth/redefinir-senha` | Redefine senha com token de recuperação |
| POST | `/auth/logout` | Encerra sessão |

## Perfil

| Método | Rota | Descrição |
|---|---|---|
| GET | `/perfil` | Retorna dados do perfil do usuário autenticado |
| PATCH | `/perfil` | Atualiza nome, faculdade, curso, semestre, objetivo |
| GET | `/perfil/horarios` | Lista horários disponíveis cadastrados |
| PUT | `/perfil/horarios` | Substitui os horários disponíveis cadastrados |

## Plano de estudos

| Método | Rota | Descrição |
|---|---|---|
| POST | `/planos` | Cria um novo plano (curso, matérias, horários, dias livres, objetivos) e dispara geração automática de cronograma |
| GET | `/planos/ativo` | Retorna o plano de estudos ativo com suas sessões |
| PATCH | `/planos/:id` | Atualiza parâmetros do plano |
| POST | `/planos/:id/reorganizar` | Solicita reorganização do cronograma (manual ou via Avi) |

## Sessões de estudo

| Método | Rota | Descrição |
|---|---|---|
| GET | `/sessoes?data=YYYY-MM-DD` | Lista sessões de um dia específico |
| PATCH | `/sessoes/:id/concluir` | Marca uma sessão como concluída |
| PATCH | `/sessoes/:id/reagendar` | Reagenda uma sessão específica |

## Dashboard

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard` | Retorna próxima sessão, meta diária, tempo estudado hoje e progresso semanal em uma única resposta agregada |

## IA / Avi

| Método | Rota | Descrição |
|---|---|---|
| POST | `/avi/explicar` | Envia dúvida sobre conteúdo e recebe explicação |
| POST | `/avi/incentivo` | Solicita mensagem de incentivo contextual (também pode ser gerado proativamente pelo backend) |
| GET | `/avi/dificuldades` | Retorna dificuldades identificadas com base no histórico |

## Histórico

| Método | Rota | Descrição |
|---|---|---|
| GET | `/historico` | Retorna horas estudadas, dias consecutivos, evolução e matérias concluídas |

## Convenções

- Todas as rotas autenticadas exigem header `Authorization: Bearer <token>`.
- Erros seguem o formato:
```json
{
  "erro": {
    "codigo": "SESSAO_NAO_ENCONTRADA",
    "mensagem": "A sessão de estudo informada não existe."
  }
}
```
- Datas em ISO 8601, sempre com timezone explícito.
- Este documento deve evoluir junto com a implementação real em `backend/` e `api/` — tratá-lo como contrato vivo, não como especificação congelada.
