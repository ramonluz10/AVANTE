# Mobile — Avante

Aplicativo mobile (iOS/Android) do Avante.

## Stack

- Flutter

## Estrutura sugerida

```
mobile/
├── lib/
│   ├── screens/       # telas (dashboard, plano de estudos, perfil, histórico)
│   ├── widgets/        # componentes reutilizáveis (ver docs/componentes.md como referência conceitual)
│   ├── services/       # integração com a API (ver docs/apis.md)
│   ├── models/         # modelos de dados
│   └── theme/          # tokens de cor/tipografia (ver docs/design-system.md)
├── pubspec.yaml
└── android/ ios/        # projetos nativos gerados pelo Flutter
```

## Como rodar (a preencher conforme o setup real)

```bash
flutter pub get
flutter run
```

## Prioridade

O mobile entra em desenvolvimento após o frontend web e o backend estarem estáveis no MVP (ver [Roadmap](../docs/roadmap.md)) — os fluxos e a API já validados no web são a base para a implementação mobile, evitando retrabalho.

## Referências

- [Design System](../docs/design-system.md)
- [APIs](../docs/apis.md)
