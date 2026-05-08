<h1 align="center">✅ Minhas Tarefas</h1>

<p align="center">
  Gerenciador de tarefas pessoal com autenticação Google, sincronização em nuvem, drag & drop e modo escuro.
</p>

<p align="center">
  <a href="https://github.com/viniciussilva2504/minhas-tarefas/actions/workflows/ci.yml">
    <img src="https://github.com/viniciussilva2504/minhas-tarefas/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white&style=flat-square" alt="Redux" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black&style=flat-square" alt="Firebase" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite" />
  <img src="https://img.shields.io/badge/Styled_Components-6-DB7093?logo=styled-components&logoColor=white&style=flat-square" alt="Styled Components" />
  <a href="https://minhas-tarefas-ivory.vercel.app">
    <img src="https://img.shields.io/badge/Vercel-deployed-000?logo=vercel&style=flat-square" alt="Deploy" />
  </a>
</p>

---

## 🚀 Demo ao vivo

**[minhas-tarefas-ivory.vercel.app](https://minhas-tarefas-ivory.vercel.app)**

> Login com conta Google. Dados isolados por utilizador no Firestore (europe-west1).

---

## 📸 Screenshots

| Ecrã de Login | Home — Tema Claro |
|:---:|:---:|
| ![Login](docs/screenshots/login.png) | ![Home claro](docs/screenshots/desktop_home-light.png) |

| Home — Tema Escuro | Nova Tarefa |
|:---:|:---:|
| ![Home escuro](docs/screenshots/desktop_home-dark.png) | ![Nova Tarefa](docs/screenshots/desktop_nova-tarefa-light.png) |

| Histórico de Actividade | Vista Mobile |
|:---:|:---:|
| ![Histórico](docs/screenshots/historico.png) | ![Mobile](docs/screenshots/mobile_home-dark.png) |

> **Gerar screenshots automaticamente:** `npm run screenshot` (requer Puppeteer + deploy activo)

---

## ✨ Funcionalidades

### 🔐 Autenticação & Multi-utilizador
- Login com conta **Google** via Firebase Auth (`signInWithRedirect`)
- Logout com um clique na barra lateral
- **PrivateRoute** — rotas protegidas redirecionam para `/login` se não autenticado
- Dados **isolados por utilizador** — cada conta tem a sua própria coleção no Firestore

### ☁️ Sincronização em Tempo Real
- Tarefas guardadas em `users/{uid}/tarefas` no **Cloud Firestore**
- Sincronização **bidirecional Redux ↔ Firestore** via `onSnapshot` e diff de estado
- Funciona em múltiplos separadores/dispositivos em simultâneo

### 📝 Gestão de Tarefas (CRUD)
- **Criar** tarefa com: título (obrigatório), descrição, prioridade e prazo (data)
- **Editar** descrição inline, sem sair do card
- **Concluir / Reabrir** tarefa com toggle de status
- **Remover** com diálogo de confirmação antes da remoção
- Validação: título duplicado bloqueado com mensagem de erro

### 🔍 Busca, Filtros e Ordenação
- **Busca por texto** em tempo real no título das tarefas
- **7 filtros visuais** na barra lateral com contador em tempo real:
  - Todas · Pendentes · Concluídas
  - Urgentes · Importantes · Normais
  - Atrasadas (prazo vencido + status pendente)
- **3 modos de ordenação** via dropdown:
  - Padrão (ordem de criação/reordenação manual)
  - Prazo — mais urgente primeiro
  - Prioridade (Urgente → Importante → Normal)

### 🖱️ Drag & Drop
- Reordenar tarefas arrastando pelo handle `⠿` no canto do card
- Implementado com `@dnd-kit/sortable` + `restrictToVerticalAxis`
- Card fica semi-transparente (`opacity: 0.4`) durante o arrastamento
- Ordem persistida no Redux e sincronizada no Firestore

### 📋 Histórico de Actividade (`/historico`)
- Registo de todas as acções: **cadastrou / editou / concluiu / removeu**
- Guardado em `users/{uid}/historico` com `serverTimestamp()`
- Página com lista em tempo real (últimas 50 acções), ícone, data/hora formatada

### 🔗 Partilha de Lista
- Botão "Partilhar lista" na barra lateral
- Serializa tarefas em **base64** e copia link para a área de transferência (Clipboard API)
- Link no formato `/partilhar?dados=<base64>` — importável por qualquer utilizador

### 🔔 Notificações de Prazo
- **Web Notifications API** — solicita permissão ao carregar a lista
- Dispara notificação para cada tarefa com prazo vencido (uma vez por sessão por tarefa)
- IDs notificados guardados em `localStorage('notificacoes_enviadas')` para evitar repetição

### 🌙 Modo Escuro / Claro
- Toggle ☀️/🌙 na barra lateral; estado persistido em `localStorage`
- Respeita `prefers-color-scheme` na primeira visita
- Implementado via `data-theme` no `<html>` e CSS custom properties
- **Paleta light:** bg `#ffffff` · sidebar `#f5f5f5` · accent `#ff5f1f`
- **Paleta dark:** bg `#131c2b` · cards `#1a2535` · texto `#e8f1ff`

### 📱 Responsividade & PWA
- Layout **mobile-first** — sidebar torna-se header sticky em ecrãs ≤ 768px
- **PWA instalável** com vite-plugin-pwa — service worker workbox, caching de fontes
- `theme-color: #ff5f1f` exibido na barra de navegação do browser

### ♿ Acessibilidade
- Atributos `role`, `aria-label`, `aria-live="polite"`, `aria-atomic`, `aria-expanded`
- Navegação por teclado em todos os controlos interactivos
- `focus-visible` com outline a `#ff5f1f` para utilizadores de teclado
- Auditoria por componente via **@storybook/addon-a11y**

---

## 🛠️ Stack Tecnológica

### Core Frontend
| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 18 | Renderização declarativa e gestão do ciclo de vida |
| TypeScript | 5 | Tipagem estática em todo o projecto |
| Redux Toolkit | 2 | Estado global com slices, `createSlice` e `createAction` |
| redux-persist | 6 | Persistência automática do estado em `localStorage` |
| React Router DOM | 7 | Roteamento SPA (`/`, `/nova-tarefa`, `/historico`, `/login`) |
| styled-components | 6 | CSS-in-JS com CSS custom properties e ThemeProvider |

### Backend / Cloud
| Tecnologia | Versão | Finalidade |
|---|---|---|
| Firebase Auth | 12 | Autenticação OAuth2 com Google (`signInWithRedirect`) |
| Cloud Firestore | 12 | Base de dados NoSQL em tempo real (região europe-west1) |

### Build & Qualidade
| Tecnologia | Versão | Finalidade |
|---|---|---|
| Vite | 5 | Bundler ESM, HMR e servidor de desenvolvimento |
| vite-plugin-pwa | 1 | Geração de service worker (workbox) e web manifest |
| TypeScript ESLint | 5 | Linting com regras `@typescript-eslint` |
| Prettier | 2 | Formatação automática de código |

### UI & Interacção
| Tecnologia | Versão | Finalidade |
|---|---|---|
| @dnd-kit/core | 6 | Motor de drag & drop acessível |
| @dnd-kit/sortable | 10 | `useSortable` — listas reordenáveis |
| @dnd-kit/modifiers | 9 | `restrictToVerticalAxis` |
| @dnd-kit/utilities | 3 | `CSS.Transform.toString` |
| Inter (Google Fonts) | — | Tipografia (weights 300, 400, 500, 600, 700, 800) |
| Web Notifications API | — | Notificações nativas do sistema operativo |
| Clipboard API | — | Copiar link de partilha |

### Testes & Documentação
| Tecnologia | Versão | Finalidade |
|---|---|---|
| Vitest | 4 | Testes unitários rápidos (jsdom) |
| @testing-library/react | 16 | Render e queries de componentes |
| @testing-library/user-event | 14 | Simulação realista de interacções |
| Playwright | 1.59 | Testes E2E em Chromium |
| Storybook | 10 | Documentação e exploração de componentes |
| @storybook/addon-a11y | 10 | Auditoria de acessibilidade por story |
| @storybook/addon-docs | 10 | Documentação automática via JSDoc |
| Puppeteer | 24 | Geração automática de screenshots |

### CI/CD & Deploy
| Serviço | Finalidade |
|---|---|
| GitHub Actions | Pipeline: `lint → tsc → vitest → build → playwright → deploy` |
| Vercel | Hosting e deploy automático a partir da branch `main` |

---

## 🏗️ Arquitectura

```
minhas-tarefas/
├── .github/workflows/ci.yml       # Pipeline CI/CD completo
├── .storybook/                    # Configuração Storybook (main.ts, preview.ts)
├── e2e/app.spec.ts                # 7 testes E2E Playwright com mock Firebase
├── public/index.html              # HTML base: Inter, og:tags, theme-color #ff5f1f
├── src/
│   ├── components/
│   │   ├── ErrorBoundary/         # Class component — captura erros em produção
│   │   ├── FiltroCard/            # Card de filtro: contador + legenda + estado ativo
│   │   ├── Formulario/            # Form controlado: título, descrição, prioridade, prazo
│   │   ├── Loading/               # Spinner (exibido pelo PersistGate durante hidratação)
│   │   ├── PrivateRoute/          # Redirecciona para /login se !user
│   │   └── Tarefa/                # Card: drag handle (useSortable), inline edit, toggle
│   ├── containers/
│   │   ├── BarraLateral/          # Sidebar: busca, 7 filtros, ordenação, nav, logout
│   │   └── ListaDeTarefas/        # DndContext + SortableContext + empty states + banner
│   ├── contexts/
│   │   └── AuthContext.tsx        # user, loading, signInWithGoogle, logout
│   ├── hooks/
│   │   ├── useDarkMode.ts         # data-theme no <html> + localStorage
│   │   ├── useFirestoreSync.ts    # onSnapshot → Redux; diff Redux → Firestore
│   │   ├── useHistorico.ts        # addDoc em users/{uid}/historico
│   │   ├── useNotificacoesPrazo.ts# Notification.requestPermission + dedup localStorage
│   │   └── usePartilhar.ts        # btoa/atob + Clipboard API
│   ├── models/Tarefa.ts           # Classe de domínio (id, titulo, descricao, prazo, ...)
│   ├── pages/
│   │   ├── Historico/             # onSnapshot últimas 50 acções + formatação datetime
│   │   ├── Home/                  # Renderiza ListaDeTarefas
│   │   ├── Login/                 # signInWithRedirect + useEffect de redirect pós-auth
│   │   └── NovaTarefa/            # Renderiza Formulario
│   ├── store/
│   │   ├── index.ts               # configureStore + persistReducer (whitelist: tarefas, filtros)
│   │   └── reducers/
│   │       ├── tarefas.ts         # remover, editar, cadastrar, carregarTarefas, reordenar
│   │       └── filtros.ts         # alterarTermo, alterarFiltro, alterarOrdenacao
│   ├── stories/                   # FiltroCard, Tarefa, Formulario stories
│   ├── styles/
│   │   ├── index.ts               # createGlobalStyle + CSS custom properties light/dark
│   │   └── variaveis.ts           # Tokens de cor
│   └── utils/enums/Tarefa.ts      # Prioridade · Status
├── .env.example                   # Template de variáveis de ambiente
├── playwright.config.ts           # baseURL :3000, webServer, Chromium
├── vite.config.ts                 # plugin-react + VitePWA (workbox, manifest)
└── vitest.config.ts               # jsdom, setupFiles, coverage v8
```

### Fluxo de dados

```
Acção do utilizador
       │
       ▼
  React Component
       │  dispatch(remover | editar | cadastrar | reordenar)
       ▼
Redux Toolkit Slice  ←──────────────── onSnapshot (Firestore)
       │                                       ▲
       │  useFirestoreSync detecta diff         │
       ▼                                       │
 setDoc / deleteDoc  ────────────────────────►─┘
       │
       ▼
Cloud Firestore (europe-west1)
       │
       ▼
 Todos os dispositivos do mesmo utilizador
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js ≥ 18
- Projecto Firebase com **Authentication (Google)** e **Firestore** activados

### Passos

```bash
# 1. Clone
git clone https://github.com/viniciussilva2504/minhas-tarefas.git
cd minhas-tarefas

# 2. Instale dependências
npm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# edite o .env com as chaves do seu projecto Firebase

# 4. Inicie
npm run dev
# → http://localhost:3000
```

### Variáveis de ambiente necessárias

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> ⚠️ Nunca commite o `.env` com credenciais reais. O ficheiro está em `.gitignore`.

---

## 🧪 Testes

### Unitários

```bash
npm test               # modo watch
npm run test:run       # execução única
npm run test:coverage  # relatório de cobertura HTML
```

Cobertura: `src/test/reducers/tarefas.test.ts`, `filtros.test.ts`, `ListaDeTarefas.test.tsx`

### E2E

```bash
npm run test:e2e       # headless Chromium
npm run test:e2e:ui    # interface visual Playwright
```

7 specs em `e2e/app.spec.ts` — inclui mock de estado Firebase/Redux via `localStorage`.

### Storybook

```bash
npm run storybook
# → http://localhost:6006
```

Stories: `FiltroCard` (4 variantes) · `Tarefa` (5 variantes) · `Formulario` (1 variante)

---

## 🔐 Regras Firestore (produção)

Aplique em **Firebase Console → Firestore → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 🚢 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção (`dist/`) |
| `npm run preview` | Preview local do build |
| `npm test` | Testes unitários em modo watch |
| `npm run test:run` | Testes unitários — execução única |
| `npm run test:coverage` | Relatório de cobertura |
| `npm run test:e2e` | Testes E2E Playwright |
| `npm run test:e2e:ui` | Playwright com UI |
| `npm run storybook` | Storybook (porta 6006) |
| `npm run build-storybook` | Build estático do Storybook |
| `npm run screenshot` | Gera screenshots automáticos |
| `npm run lint` | ESLint |

---

## 🗺️ Roadmap

| | Funcionalidade |
|---|---|
| ✅ | Migração Vite (CRA removido) · Redux Toolkit · redux-persist |
| ✅ | CRUD completo de tarefas com validação |
| ✅ | 7 filtros + 3 ordenações + busca em tempo real |
| ✅ | Modo escuro (CSS vars + localStorage + prefers-color-scheme) |
| ✅ | Firebase Auth — Google (`signInWithRedirect`) |
| ✅ | Firestore sync bidirecional em tempo real |
| ✅ | Drag & drop com @dnd-kit |
| ✅ | Notificações Web Notifications API |
| ✅ | Histórico de actividade |
| ✅ | Partilha de lista por URL (base64) |
| ✅ | PWA instalável (workbox) |
| ✅ | Testes E2E (Playwright, 7 specs) |
| ✅ | CI/CD GitHub Actions → Vercel |
| ✅ | Storybook com addon-a11y |
| ✅ | Etiquetas personalizadas (tags) por tarefa |
| ✅ | Sub-tarefas (checklists com barra de progresso) |
| ⬜ | Migração para Next.js App Router |
| ⬜ | Colaboração em tempo real |

---

## 👤 Autor

**Vinícius Silva** — Frontend Developer · React · TypeScript · Porto, Portugal

[![GitHub](https://img.shields.io/badge/GitHub-viniciussilva2504-181717?logo=github&style=flat-square)](https://github.com/viniciussilva2504)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vjsilva2504-ff5f1f?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/vjsilva2504/)
[![Portfolio](https://img.shields.io/badge/Portfolio-portfolio--ebon--nine--95.vercel.app-ff5f1f?style=flat-square)](https://portfolio-ebon-nine-95.vercel.app)
[![Email](https://img.shields.io/badge/Email-vinicius.silva2504@gmail.com-EA4335?logo=gmail&logoColor=white&style=flat-square)](mailto:vinicius.silva2504@gmail.com)
