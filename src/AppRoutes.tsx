import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import EstiloGlobal, { Container } from './styles'
import BarraLateral from './containers/BarraLateral'
import Home from './pages/Home'
import NovaTarefa from './pages/NovaTarefa'
import store from './store'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Container>
    <BarraLateral mostrarFiltros={true} />
    <main>{children}</main>
  </Container>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    )
  },
  {
    path: '/nova-tarefa',
    element: (
      <Layout>
        <NovaTarefa />
      </Layout>
    )
  }
])

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
