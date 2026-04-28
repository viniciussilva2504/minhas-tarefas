import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefa'
import { Container, Mensagem, EmptyState } from './styles'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import TarefaModel from '../../models/Tarefa'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor, ordenacao } = useSelector(
    (state: RootReducer) => state.filtros
  )

  const filtrarTarefas = () => {
    let tarefasFiltradas = itens

    if (termo !== '') {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
    }

    if (criterio === 'prioridade') {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.prioridade === valor
      )
    } else if (criterio === 'status') {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.status === valor
      )
    } else if (criterio === 'atrasadas') {
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) =>
          item.prazo &&
          item.status === enums.Status.PENDENTE &&
          new Date(item.prazo + 'T00:00:00') < hoje
      )
    }

    return tarefasFiltradas
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complemento =
      termo !== '' && termo !== undefined ? ` e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas${complemento}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${valor}"${complemento}`
    }

    return mensagem
  }

  const ordenarTarefas = (lista: TarefaModel[]) => {
    const prioridadeOrdem: Record<string, number> = {
      [enums.Prioridade.URGENTE]: 0,
      [enums.Prioridade.IMPORTANTE]: 1,
      [enums.Prioridade.NORMAL]: 2
    }
    if (ordenacao === 'prazo-asc') {
      return [...lista].sort((a, b) => {
        if (!a.prazo && !b.prazo) return 0
        if (!a.prazo) return 1
        if (!b.prazo) return -1
        return a.prazo.localeCompare(b.prazo)
      })
    }
    if (ordenacao === 'prioridade') {
      return [...lista].sort(
        (a, b) => prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade]
      )
    }
    return lista
  }

  const tarefas = ordenarTarefas(filtrarTarefas())
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <Container>
      <Mensagem aria-live="polite" aria-atomic="true">
        {mensagem}
      </Mensagem>
      {tarefas.length === 0 ? (
        <EmptyState role="status" aria-live="polite">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="1.5"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <p>Nenhuma tarefa encontrada</p>
          <span>Tente ajustar os filtros ou cadastre uma nova tarefa</span>
        </EmptyState>
      ) : (
        <ul aria-label="Lista de tarefas">
          {tarefas.map((t) => (
            <li key={t.id}>
              <Tarefa
                id={t.id}
                descricao={t.descricao}
                titulo={t.titulo}
                status={t.status}
                prioridade={t.prioridade}
                prazo={t.prazo}
              />
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}

export default ListaDeTarefas
