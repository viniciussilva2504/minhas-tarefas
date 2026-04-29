# ✅ Minhas Tarefas

> Gerenciador de tarefas pessoal com autenticação Google, sincronização em nuvem, drag & drop, notificações de prazo e modo escuro.

[![CI](https://github.com/viniciussilva2504/minhas-tarefas/actions/workflows/ci.yml/badge.svg)](https://github.com/viniciussilva2504/minhas-tarefas/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white&style=flat-square)
![Firebase](https://img.shields.io/badge/Firebase-10-FFCA28?logo=firebase&logoColor=black&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square)
![Styled Components](https://img.shields.io/badge/Styled_Components-6-DB7093?logo=styled-components&logoColor=white&style=flat-square)
[![Deploy](https://img.shields.io/badge/Vercel-deployed-000?logo=vercel&style=flat-square)](https://minhas-tarefas-ivory.vercel.app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)

---

## 🚀 Demo

**[minhas-tarefas-ivory.vercel.app](https://minhas-tarefas-ivory.vercel.app)**

---

## 📸 Screenshots

| Tema Claro | Tema Escuro |
|---|---|
| ![Home — claro](docs/screenshots/desktop_home-light.png) | ![Home — escuro](docs/screenshots/desktop_home-dark.png) |
| ![Nova Tarefa — claro](docs/screenshots/desktop_nova-tarefa-light.png) | ![Nova Tarefa — escuro](docs/screenshots/desktop_nova-tarefa-dark.png) |

| Mobile | Tablet |
|---|---|
| ![Mobile](docs/screenshots/mobile_home-dark.png) | ![Tablet](docs/screenshots/tablet_home-dark.png) |

> Gerar screenshots: `npm run screenshot` (requer Puppeteer e deploy activo)

---

## ✨ Funcionalidades

- 🔑 **Autenticação Google** — login/logout com Firebase Auth; dados isolados por utilizador
- ☁️ **Sincronização em nuvem** — tarefas guardadas no Firestore em tempo real (bidireccional Redux ↔ Firestore)
- 📝 **CRUD completo** — criar, editar, concluir e remover tarefas com título, descrição, prioridade e prazo
- 🔍 **Busca e filtros** — busca por texto em tempo real; filtro por status, prioridade e tarefas atrasadas
- 📊 **Ordenação** — padrão, prazo (mais urgente) ou prioridade
- 🖱️ **Drag & drop** — reordenar tarefas por arrastar (dnd-kit, eixo vertical)
- 🔔 **Notificações de prazo** — Web Notifications API para tarefas atrasadas
- 📋 **Histórico de actividade** — registo de acções (cadastrou / editou / concluiu / removeu) em `/historico`
- 🔗 **Partilhar lista** — copia URL com tarefas codificadas em base64 para a área de transferência
- 🌙 **Modo escuro** — alternância com persistência; paleta azul profunda
- 📱 **Layout responsivo** — mobile-first com adesivo no topo em ecrãs pequenos
- 📲 **PWA** — instalável; workbox caching para fontes e assets
- ♿ **Acessibilidade** — `role`, `aria-label`, `aria-expanded`, navegação por teclado

---

## 🛠️ Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 + TypeScript 5 |
| Estado global | Redux Toolkit 2 + redux-persist |
| Autenticação | Firebase Auth (Google) |
| Base de dados | Cloud Firestore (europe-west1) |
| Roteamento | React Router DOM v7 |
| Estilização | Styled-Components v6 + CSS custom properties |
| Drag & drop | @dnd-kit/core + @dnd-kit/sortable |
| Build + PWA | Vite 5 + vite-plugin-pwa |
| Testes unitários | Vitest + Testing Library |
| Testes E2E | Playwright 1.59 |
| Component explorer | Storybook 9 (React-Vite) |
| CI/CD | GitHub Actions → Vercel |

---

## 📁 Estrutura de pastas

```
src/
├── components/
│   ├── ErrorBoundary/     # Captura erros React em produção
│   ├── FiltroCard/        # Card de filtro na barra lateral
│   ├── Formulario/        # Formulário de nova tarefa
│   ├── Loading/           # Spinner de carregamento
│   ├── PrivateRoute/      # Redirecciona para /login se não autenticado
│   └── Tarefa/            # Card de tarefa com ações inline
├── containers/
│   ├── BarraLateral/      # Sidebar: busca, filtros, navegação, partilha
│   └── ListaDeTarefas/    # Lista com DnD, empty state e notificações
├── contexts/
│   └── AuthContext.tsx    # Contexto Firebase Auth (user, signIn, logout)
├── hooks/
│   ├── useDarkMode.ts     # Tema: localStorage + prefers-color-scheme
│   ├── useFirestoreSync.ts# Sync Redux ↔ Firestore bidireccional
│   ├── useHistorico.ts    # Regista acções no Firestore
│   ├── useNotificacoesPrazo.ts # Web Notifications para prazos vencidos
│   └── usePartilhar.ts    # Gera / importa links de partilha base64
├── models/
│   └── Tarefa.ts          # Classe de domínio
├── pages/
│   ├── Historico/         # Página de histórico de actividade
│   ├── Home/              # Listagem principal
│   ├── Login/             # Página de login Google
│   └── NovaTarefa/        # Criar nova tarefa
├── store/
│   ├── index.ts           # Configuração Redux + redux-persist
│   └── reducers/
│       ├── tarefas.ts     # Slice: CRUD + reordenar + carregarTarefas
│       └── filtros.ts     # Slice: busca, filtros e ordenação
├── stories/               # Storybook: FiltroCard, Tarefa, Formulario
├── styles/
│   ├── index.ts           # Estilos globais + CSS vars (light/dark)
│   └── variaveis.ts       # Tokens de design
└── utils/
    └── enums/Tarefa.ts    # Enums de Prioridade e Status
e2e/
└── app.spec.ts            # Testes E2E com Playwright (7 specs)
.github/
└── workflows/ci.yml       # CI: lint → tsc → vitest → build → e2e → deploy
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js ≥ 18
- Conta Firebase com projecto configurado (Auth Google + Firestore)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/viniciussilva2504/minhas-tarefas.git
cd minhas-tarefas

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Preencha VITE_FIREBASE_* com as chaves do seu projecto Firebase

# 4. Inicie o servidor de desenvolvimento
npm run dev
# Acesse http://localhost:3000
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Vite (porta 3000) |
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Preview do build de produção |
| `npm test` | Testes unitários com Vitest em modo watch |
| `npm run test:coverage` | Relatório de cobertura de testes |
| `npm run storybook` | Storybook em `http://localhost:6006` |
| `npm run build-storybook` | Build estático do Storybook |
| `npm run screenshot` | Gera screenshots em `docs/screenshots/` (Puppeteer) |
| `npm run lint` | Lint com ESLint |

### Variáveis de ambiente

Crie um ficheiro `.env` na raiz com:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

> ⚠️ Nunca commite o `.env` com credenciais reais. Use `.env.example` para documentar as chaves necessárias.

---

## 🗺️ Roadmap

- [x] Migração para Vite (CRA removido)
- [x] Modo escuro com alternância e persistência
- [x] Filtro de tarefas atrasadas
- [x] Ordenação por prazo e prioridade
- [x] ErrorBoundary + Loading spinner
- [x] Testes unitários com Vitest
- [x] Autenticação Google com Firebase Auth
- [x] Sincronização Firestore multi-utilizador
- [x] Drag & drop para reordenar tarefas (@dnd-kit)
- [x] Notificações de prazo (Web Notifications API)
- [x] Histórico de actividade
- [x] Partilha de lista por URL
- [x] PWA instalável (workbox)
- [x] Testes E2E com Playwright
- [x] CI/CD com GitHub Actions + Vercel
- [x] Storybook para componentes
- [ ] Categorias / etiquetas personalizadas
- [ ] Sub-tarefas (checklists)
- [ ] Colaboração em tempo real

---

## 👤 Autor

**Vinícius Silva**
- GitHub: [@viniciussilva2504](https://github.com/viniciussilva2504)
- Deploy: [minhas-tarefas-ivory.vercel.app](https://minhas-tarefas-ivory.vercel.app)

