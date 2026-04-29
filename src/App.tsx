import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import EstiloGlobal, { Container } from './styles'
import BarraLateral from './containers/BarraLateral'
import Home from './pages/Home'
import NovaTarefa from './pages/NovaTarefa'
import Login from './pages/Login'
import Historico from './pages/Historico'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import useFirestoreSync from './hooks/useFirestoreSync'
import store, { persistor } from './store'

const AppSync = ({ children }: { children: React.ReactNode }) => {
  useFirestoreSync()
  return <>{children}</>
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Container>
    <BarraLateral mostrarFiltros={true} />
    <main>{children}</main>
  </Container>
)

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/nova-tarefa',
    element: (
      <PrivateRoute>
        <Layout>
          <NovaTarefa />
        </Layout>
      </PrivateRoute>
    )
  },
  {
    path: '/historico',
    element: (
      <PrivateRoute>
        <Layout>
          <Historico />
        </Layout>
      </PrivateRoute>
    )
  }
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AuthProvider>
          <AppSync>
            <ErrorBoundary>
              <EstiloGlobal />
              <RouterProvider router={router} />
            </ErrorBoundary>
          </AppSync>
        </AuthProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
