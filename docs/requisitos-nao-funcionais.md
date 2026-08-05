# Requisitos Não Funcionais — Avante (MVP)

Convenção: `RNF-XX` = Requisito Não Funcional.

## Desempenho

- **RNF-01** — O dashboard deve carregar em até 2 segundos em conexão 4G padrão.
- **RNF-02** — A geração do cronograma inicial deve ocorrer em até 5 segundos.

## Segurança

- **RNF-03** — Senhas devem ser armazenadas com hash seguro (bcrypt ou equivalente), nunca em texto puro.
- **RNF-04** — Toda comunicação cliente-servidor deve ocorrer via HTTPS.
- **RNF-05** — Tokens de autenticação devem ter expiração definida e mecanismo de renovação seguro.
- **RNF-06** — Dados sensíveis (senha, tokens) nunca devem aparecer em logs.

## Privacidade e conformidade

- **RNF-07** — O tratamento de dados pessoais deve seguir a LGPD (Lei Geral de Proteção de Dados).
- **RNF-08** — O estudante deve poder solicitar exportação e exclusão dos seus dados.
- **RNF-09** — Dados usados para treinar/ajustar funcionalidades de IA devem respeitar consentimento explícito do estudante.

## Usabilidade

- **RNF-10** — A interface deve seguir o princípio de "sempre mostrar o próximo passo" — nunca deixar o estudante sem saber o que fazer em seguida.
- **RNF-11** — Notificações devem ser infrequentes e relevantes; nenhuma notificação deve usar linguagem de culpa ou pressão.
- **RNF-12** — A aplicação deve ser utilizável por estudantes com conhecimento técnico variado, sem jargão desnecessário na interface.

## Disponibilidade e confiabilidade

- **RNF-13** — O sistema deve ter disponibilidade compatível com uso diário (meta inicial de MVP: 99% uptime mensal).
- **RNF-14** — Falhas na IA (ex.: indisponibilidade do provedor) não devem impedir o uso das funcionalidades essenciais (dashboard, cronograma, histórico).

## Escalabilidade

- **RNF-15** — A arquitetura deve permitir crescimento de usuários sem reescrita do núcleo do domínio (ver [Arquitetura](arquitetura.md)).

## Manutenibilidade

- **RNF-16** — O código deve seguir Clean Architecture e princípios SOLID onde fizer sentido, priorizando a solução mais simples que resolva o problema.
- **RNF-17** — Toda funcionalidade nova deve ser documentada nas pastas correspondentes de `docs/`.

## Acessibilidade

- **RNF-18** — A interface deve seguir contraste mínimo adequado (WCAG AA) entre texto e fundo, especialmente considerando a paleta clara definida no [Design System](design-system.md).
