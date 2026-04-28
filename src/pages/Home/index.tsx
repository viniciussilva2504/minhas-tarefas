import ListaDeTarefas from '../../containers/ListaDeTarefas'
import { usePageTitle } from '../../hooks/usePageTitle'

const Home = () => {
  usePageTitle('')
  return <ListaDeTarefas />
}

export default Home
