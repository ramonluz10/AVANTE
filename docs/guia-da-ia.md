# Guia da IA — Avante

Este documento trata da camada técnica de inteligência artificial que dá vida ao Avi (ver [Guia do Avi](guia-do-avi.md) para a persona; este documento é sobre implementação e limites técnicos).

## Princípio central

**A IA deve orientar, nunca substituir o estudante.** Toda decisão final (o que estudar, quando estudar, se reorganiza o plano) pertence ao estudante. A IA propõe; o estudante decide.

## Funções da IA no MVP

1. **Reorganizar cronogramas** — quando o estudante perde uma sessão ou pede ajuste, a IA propõe uma nova distribuição respeitando os horários disponíveis já cadastrados.
2. **Explicar conteúdos** — respostas a dúvidas pontuais do estudante sobre a matéria que está estudando.
3. **Identificar dificuldades** — análise de padrões (sessões não concluídas, tempo excessivo em uma matéria) para sinalizar possíveis pontos de atenção.
4. **Incentivar** — mensagens de incentivo contextualizadas ao progresso real do estudante, nunca genéricas.
5. **Acompanhar evolução** — leitura do histórico do estudante para embasar sugestões futuras.

## Limites explícitos

- **Não bombardear o estudante com informações.** Respostas devem ser objetivas; o Avi não deve gerar parágrafos longos quando uma frase resolve.
- **Não gerar sugestões sem contexto real do estudante** — toda sugestão proativa deve se basear em dados reais de uso (cronograma, histórico), nunca em heurísticas genéricas desacopladas do estudante.
- **Não tomar decisões irreversíveis sozinha** — reorganizações de cronograma geradas pela IA devem ser apresentadas como proposta, com confirmação do estudante antes de substituir o plano ativo (exceção possível: ajustes menores e claramente reversíveis, a critério de produto).

## Arquitetura da integração de IA

Seguindo a Clean Architecture descrita em [Arquitetura](arquitetura.md), a IA vive isolada em `backend/src/infrastructure/ai`, exposta ao domínio por uma porta/interface (ex.: `AiMentorPort`), com métodos como:

```typescript
interface AiMentorPort {
  reorganizarCronograma(input: ReorganizarCronogramaInput): Promise<CronogramaProposto>;
  explicarConteudo(input: ExplicarConteudoInput): Promise<ExplicacaoResposta>;
  identificarDificuldades(historico: HistoricoEstudo): Promise<Dificuldade[]>;
  gerarIncentivo(contexto: ContextoEstudante): Promise<MensagemIncentivo>;
}
```

Isso permite trocar o provedor de IA (ou usar múltiplos, por função) sem alterar o domínio ou os casos de uso.

## Prompting e tom

Todo prompt de sistema usado para gerar respostas do Avi deve incorporar as regras do [Guia do Avi](guia-do-avi.md) — especialmente: nunca linguagem agressiva, nunca culpa, sempre acolher antes de orientar. Isso deve ser tratado como parte do contrato técnico da função (testável), não apenas como diretriz de copywriting.

## Dados usados pela IA

- Cronograma atual e histórico de sessões do estudante.
- Metas e objetivos declarados pelo estudante.
- Matérias e progresso registrado.

A IA **não** deve receber dados sensíveis além do necessário para a função em questão, e o uso desses dados deve respeitar o consentimento e os direitos do estudante descritos em [Requisitos Não Funcionais](requisitos-nao-funcionais.md) (LGPD).

## Fallback

Se o provedor de IA estiver indisponível, o produto deve continuar funcional nas funções essenciais (dashboard, cronograma manual, histórico) — a IA é uma camada de valor agregado, não uma dependência crítica de uso básico (ver RNF-14).
