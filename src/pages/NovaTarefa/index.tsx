import Formulario from '../../components/Formulario'
import { usePageTitle } from '../../hooks/usePageTitle'

const NovaTarefa = () => {
  usePageTitle('Nova Tarefa')
  return <Formulario />
}

export default NovaTarefa
