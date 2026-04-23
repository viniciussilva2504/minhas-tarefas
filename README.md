# Minhas Tarefas — Personal Task Manager

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=flat-square&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)

A personal task management app built with React and TypeScript. Create, organise, filter and track tasks by priority level and status — all persisted in `localStorage` so data survives page reloads.

**[🔗 Live Demo](https://minhas-tarefas-qbvq6g7hg-vinicius-silvas-projects-6f23ba6d.vercel.app/)**

## Screenshots

| Task List | Add Task | Filters |
|:---:|:---:|:---:|
| ![Task list view](docs/screenshot-list.png) | ![Add task form](docs/screenshot-form.png) | ![Filter sidebar](docs/screenshot-filters.png) |

## Features

- **Create tasks** — title, description and priority level selection
- **Priority levels** — `URGENTE`, `IMPORTANTE`, `NORMAL` with visual differentiation
- **Status tracking** — toggle tasks between `PENDENTE` and `CONCLUÍDA`
- **Filter by priority** — quickly view only Urgent, Important or Normal tasks
- **Filter by status** — view Pending or Completed tasks separately
- **Text search** — live search across task titles and descriptions
- **Calendar view** — built-in calendar component for date-based task planning
- **Planner** — sidebar planner for daily organisation
- **localStorage persistence** — state survives browser refresh via custom `useLocalStorage` hook
- **Responsive layout** — adapted for desktop and mobile screens

## Tech Stack

| Category | Technology |
|---|---|
| **UI** | React 18 + styled-components 6 |
| **Language** | TypeScript 4.9 |
| **State Management** | Redux Toolkit (slices: `tarefas` + `filtros`) |
| **Routing** | React Router DOM |
| **Persistence** | localStorage via custom hook |
| **Code Quality** | ESLint + Prettier |
| **Build** | Create React App |

## Getting Started

**Prerequisites:** Node.js 16+ and npm

```bash
# Clone the repository
git clone https://github.com/viniciussilva2504/minhas-tarefas.git
cd minhas-tarefas

# Install dependencies
npm install

# Start the development server
npm start
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── Calendario/      # Calendar component for date-based planning
│   ├── FiltroCard/      # Individual filter chip component
│   ├── Formulario/      # Task creation form
│   ├── Planner/         # Daily planner sidebar
│   └── Tarefa/          # Single task card (title, priority, status, actions)
├── containers/
│   ├── BarraLateral/    # Sidebar with filters and planner
│   └── ListaDeTarefas/  # Main task list with search and grid
├── hooks/
│   ├── useCalendario.ts  # Custom hook for calendar state
│   └── useLocalStorage.ts # Persistence hook (read/write localStorage)
├── models/
│   └── Tarefa.ts        # Task class (titulo, prioridade, status, descricao, id)
├── store/
│   └── reducers/
│       ├── tarefas.ts   # CRUD slice (add, edit, remove, toggle status)
│       └── filtros.ts   # Filter slice (termo, criterio, valor)
├── utils/
│   └── enums/
│       └── Tarefa.ts    # Prioridade (URGENTE|IMPORTANTE|NORMAL) + Status (PENDENTE|CONCLUIDA)
└── App.tsx
```

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the development server at `localhost:3000` |
| `npm test` | Run unit tests |
| `npm run build` | Create a production build |
| `npm run lint` | Check code quality with ESLint |
| `npm run format` | Auto-format code with Prettier |

## Roadmap

- [x] Task CRUD (create, read, edit, delete)
- [x] Priority levels (Urgent, Important, Normal)
- [x] Status toggle (Pending → Completed)
- [x] Filter by priority and status
- [x] Text search across tasks
- [x] localStorage persistence via custom hook
- [x] Calendar and daily planner components
- [ ] Automated tests with Jest + React Testing Library
- [ ] Drag & drop reordering
- [ ] Due dates with reminders
- [ ] Dark / light theme toggle

## Author

**Vinicius Silva** — Frontend Developer · React + TypeScript

[![GitHub](https://img.shields.io/badge/GitHub-viniciussilva2504-181717?style=flat-square&logo=github)](https://github.com/viniciussilva2504)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vjsilva2504-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/vjsilva2504/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-00e5ff?style=flat-square&logo=vercel&logoColor=black)](https://portfolio-ebon-nine-95.vercel.app)

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
