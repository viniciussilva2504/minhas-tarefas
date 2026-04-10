# Minhas Tarefas

## Descrição
Aplicação de organização pessoal para planejamento diário, tarefas e hábitos, com persistência local e interface responsiva.

## Tecnologias Utilizadas
- React + TypeScript
- Redux
- styled-components
- localStorage
- ESLint + Prettier
- (Sugestão) Jest + React Testing Library

## Estrutura de Pastas
```
src/
  components/      # Componentes reutilizáveis (Calendario, Planner, etc)
  containers/      # Containers de página (BarraLateral, ListaDeTarefas)
  pages/           # Páginas principais (Home, NovaTarefa)
  store/           # Redux store e reducers
  styles/          # Estilos globais e variáveis
  utils/           # Funções utilitárias e enums
  hooks/           # (Sugestão) Hooks customizados
  services/        # (Sugestão) Serviços de API/localStorage
  tests/           # (Sugestão) Testes automatizados
```

## Como rodar localmente
```bash
git clone <repo-url>
cd minhas-tarefas
npm install
npm start
```

## Scripts úteis
- `npm run lint` — Checa padrões de código
- `npm run format` — Formata o código
- `npm run build` — Gera build de produção
- `npm test` — (Sugestão) Executa testes

## Como fazer deploy
1. Gere o build: `npm run build`
2. Faça deploy da pasta `build/` no Vercel, Netlify ou GitHub Pages

## Roadmap de Melhorias
- [ ] Testes automatizados (Jest/RTL)
- [ ] Hooks customizados (ex: useLocalStorage)
- [ ] Service Worker/PWA
- [ ] Temas (dark/light)
- [ ] Login/sincronização
- [ ] Exportação/importação de dados
- [ ] Notificações

## Prints
(Adicione aqui imagens ou GIFs do app funcionando)

## Contribuição
Pull requests são bem-vindos! Siga o padrão de commits semânticos.

## Licença
MIT

---
Desenvolvido por Vinicius
