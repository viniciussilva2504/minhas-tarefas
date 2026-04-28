# ✅ Minhas Tarefas

> Gerenciador de tarefas pessoais com filtros, ordenação, modo escuro e persistência local.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?logo=styled-components&logoColor=white&style=flat-square)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)

---

## 🚀 Demo

> Deploy: [minhas-tarefas-ivory.vercel.app](https://minhas-tarefas-ivory.vercel.app)

---

## 📸 Screenshots

| Tema Claro | Tema Escuro |
|---|---|
| ![Home — claro](docs/screenshots/desktop_home-light.png) | ![Home — escuro](docs/screenshots/desktop_home-dark.png) |
| ![Nova Tarefa — claro](docs/screenshots/desktop_nova-tarefa-light.png) | ![Nova Tarefa — escuro](docs/screenshots/desktop_nova-tarefa-dark.png) |

| Mobile | Tablet |
|---|---|
| ![Mobile](docs/screenshots/mobile_home-dark.png) | ![Tablet](docs/screenshots/tablet_home-dark.png) |

---

## ✨ Funcionalidades

- 📝 Criar tarefas com título, descrição, prioridade e prazo
- ✅ Concluir e reabrir tarefas
- ✏️ Editar descrição de tarefas existentes
- 🗑️ Remover tarefas
- 🔍 Buscar tarefas por texto em tempo real
- 🏷️ Filtrar por status (pendentes / concluídas), prioridade (urgente / importante / normal) e tarefas atrasadas
- 📅 Indicador visual de prazo vencido
- 📊 Ordenar por padrão, prazo (mais urgente) ou prioridade
- 🌙 Modo escuro com alternância rápida e persistência no `localStorage`
- 💾 Persistência automática no `localStorage` com `redux-persist`
- 📱 Layout responsivo (mobile-first)

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 + TypeScript 5 |
| Estado global | Redux Toolkit 2 |
| Persistência | redux-persist → localStorage |
| Roteamento | React Router DOM v7 |
| Estilização | Styled-Components v6 |
| Build | Vite 5 |
| Testes | Vitest + Testing Library |

---

## 📁 Estrutura de pastas

```
src/
├── components/
│   ├── ErrorBoundary/     # Captura erros React em produção
│   ├── FiltroCard/        # Card de filtro na barra lateral
│   ├── Formulario/        # Formulário de nova tarefa
│   ├── Loading/           # Spinner de carregamento
│   └── Tarefa/            # Card de tarefa com ações
├── containers/
│   ├── BarraLateral/      # Sidebar com busca, filtros e navegação
│   └── ListaDeTarefas/    # Lista filtrada e ordenada de tarefas
├── hooks/
│   └── useDarkMode.ts     # Hook de tema (localStorage + prefers-color-scheme)
├── models/
│   └── Tarefa.ts          # Classe de domínio
├── pages/
│   ├── Home/              # Listagem principal
│   └── NovaTarefa/        # Criar nova tarefa
├── store/
│   ├── index.ts           # Configuração Redux + redux-persist
│   └── reducers/
│       ├── tarefas.ts     # Slice: CRUD + estado de erro
│       └── filtros.ts     # Slice: busca, filtros e ordenação
├── styles/
│   ├── index.ts           # Estilos globais, CSS vars (light/dark) e layout
│   └── variaveis.ts       # Tokens de design (cores)
├── test/
│   └── reducers/          # Testes unitários dos reducers
└── utils/
    └── enums/Tarefa.ts    # Enums de Prioridade e Status
```

---

## ⚙️ Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/viniciussilva2504/minhas-tarefas.git
cd minhas-tarefas

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
# Acesse http://localhost:3000
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Vite na porta 3000 |
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Preview do build de produção |
| `npm test` | Testes com Vitest em modo watch |
| `npm run test:coverage` | Relatório de cobertura de testes |
| `npm run screenshot` | Gera screenshots do deploy em `docs/screenshots/` |
| `npm run lint` | Lint com ESLint |

---

## 🗺️ Roadmap

- [x] Migração para Vite (CRA removido)
- [x] Modo escuro com alternância e persistência
- [x] Filtro de tarefas atrasadas
- [x] Ordenação por prazo e prioridade
- [x] ErrorBoundary + Loading spinner
- [x] Testes unitários com Vitest
- [ ] Integração com Supabase (autenticação + tarefas por usuário)
- [ ] Drag-and-drop para reordenar tarefas
- [ ] Notificações de prazo vencido (Service Worker)
- [ ] PWA (instalação offline)

---

## 👤 Autor

**Vinícius Silva**
- GitHub: [@viniciussilva2504](https://github.com/viniciussilva2504)
