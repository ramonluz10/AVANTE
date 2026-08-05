# Banco de Dados — Avante (rascunho MVP)

PostgreSQL + Prisma. Este é um rascunho inicial de modelagem — deve evoluir junto com a implementação em `database/`.

## Entidades principais

### User

```prisma
model User {
  id            String    @id @default(uuid())
  nome          String
  email         String    @unique
  senhaHash     String?   // null se login via OAuth
  googleId      String?   @unique
  emailVerificado Boolean @default(false)
  faculdade     String?
  curso         String?
  semestre      Int?
  objetivo      String?
  criadoEm      DateTime  @default(now())
  atualizadoEm  DateTime  @updatedAt

  horariosDisponiveis  HorarioDisponivel[]
  planosDeEstudo       PlanoDeEstudo[]
  sessoesDeEstudo      SessaoDeEstudo[]
  historico            HistoricoEstudo?
}
```

### HorarioDisponivel

```prisma
model HorarioDisponivel {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  diaSemana   Int      // 0-6
  horaInicio  String   // "19:00"
  horaFim     String   // "21:00"
}
```

### Materia

```prisma
model Materia {
  id        String   @id @default(uuid())
  nome      String
  curso     String?
  sessoes   SessaoDeEstudo[]
  concluida Boolean  @default(false)
}
```

### PlanoDeEstudo

```prisma
model PlanoDeEstudo {
  id           String    @id @default(uuid())
  userId       String
  user         User      @relation(fields: [userId], references: [id])
  criadoEm     DateTime  @default(now())
  ativo        Boolean   @default(true)
  sessoes      SessaoDeEstudo[]
}
```

### SessaoDeEstudo

```prisma
model SessaoDeEstudo {
  id            String    @id @default(uuid())
  planoId       String
  plano         PlanoDeEstudo @relation(fields: [planoId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  materiaId     String
  materia       Materia   @relation(fields: [materiaId], references: [id])
  dataHoraInicio DateTime
  duracaoMin    Int
  status        StatusSessao @default(PENDENTE)
  concluidaEm   DateTime?
}

enum StatusSessao {
  PENDENTE
  CONCLUIDA
  PERDIDA
  REAGENDADA
}
```

### HistoricoEstudo

```prisma
model HistoricoEstudo {
  id                String   @id @default(uuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  horasEstudadasTotal Float  @default(0)
  diasConsecutivos    Int    @default(0)
  ultimaSessaoEm      DateTime?
}
```

## Relações (resumo)

- Um `User` tem muitos `PlanoDeEstudo`, `SessaoDeEstudo` e `HorarioDisponivel`, e um único `HistoricoEstudo`.
- Uma `SessaoDeEstudo` pertence a um `PlanoDeEstudo`, a um `User` e a uma `Materia`.
- `Materia` pode ser reaproveitada entre planos (ex.: matérias padrão de um curso).

## Índices sugeridos

- `User.email` (único, já coberto por `@unique`).
- `SessaoDeEstudo(userId, dataHoraInicio)` — consultas de dashboard ("próxima sessão").
- `SessaoDeEstudo(userId, status)` — cálculo de progresso e streak.

## Observações de evolução

- Este schema cobre apenas o MVP. Funcionalidades futuras (gamificação, comunidade, avatar) terão suas próprias entidades, adicionadas somente após validação do MVP (ver [Roadmap](roadmap.md)).
- Migrations devem ser geradas via Prisma (`prisma migrate dev`) e versionadas em `database/prisma/migrations`.
