import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import EstiloGlobal, { Container } from './styles'
import BarraLateral from './containers/BarraLateral'
import Home from './pages/Home'
import NovaTarefa from './pages/NovaTarefa'
import Planner from './components/Planner'
import store from './store'
import { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(new Date())
  return (
    <Container>
      <BarraLateral
        mostrarFiltros={true}
        diaSelecionado={diaSelecionado}
        onDiaSelecionado={setDiaSelecionado}
      />
      <main>{children}</main>
      <Planner diaSelecionado={diaSelecionado} />
    </Container>
  )
}

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
