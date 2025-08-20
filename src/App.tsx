import { useState } from 'react'
import { Provider } from 'react-redux'

import EstiloGlobal, { Container } from './styles'
import BarraLateral from './containers/BarraLateral'
import ListaDeTarefas from './containers/ListaDeTarefas'
import Formulario from './components/Formulario'

import store from './store'

function App() {
  const [estaExibindoFormulario, setEstaExibindoFormulario] = useState(false)

  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <BarraLateral
          mostrarFiltros={true}
          mostrarFormulario={() => setEstaExibindoFormulario(true)}
          estaExibindoFormulario={estaExibindoFormulario}
          voltarParaLista={() => setEstaExibindoFormulario(false)}
        />
        <main>
          {estaExibindoFormulario ? <Formulario /> : <ListaDeTarefas />}
        </main>
      </Container>
    </Provider>
  )
}

export default App
