import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import EstiloGlobal from './styles'
import Home from './pages/Home'
import NovaTarefa from './pages/NovaTarefa'
import store from './store'

// Removido Layout duplicado. O controle de Layout e diaSelecionado está em App.tsx

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/nova-tarefa',
    element: <NovaTarefa />
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
