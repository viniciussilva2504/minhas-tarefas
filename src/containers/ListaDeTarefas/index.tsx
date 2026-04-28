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

  const getMensagemVazia = (): { titulo: string; subtitulo: string } => {
    if (termo)
      return {
        titulo: `Nenhum resultado para "${termo}".`,
        subtitulo: 'Vai ler um livro enquanto pensa nisso.'
      }
    if (criterio === 'atrasadas')
      return {
        titulo: 'Nenhuma tarefa atrasada.',
        subtitulo: 'Você é disciplinado, ou deletou tudo. Respeito.'
      }
    if (criterio === 'status' && valor === enums.Status.PENDENTE)
      return {
        titulo: 'Zero pendências.',
        subtitulo: 'Vai caminhar no parque. Você merece.'
      }
    if (criterio === 'status' && valor === enums.Status.CONCLUIDA)
      return {
        titulo: 'Nada concluído ainda.',
        subtitulo: 'O dia é longo. Possivelmente.'
      }
    if (criterio === 'prioridade' && valor === enums.Prioridade.URGENTE)
      return {
        titulo: 'Nenhuma urgência.',
        subtitulo: 'Seu coração e seu cortisol agradecem.'
      }
    if (criterio === 'prioridade' && valor === enums.Prioridade.IMPORTANTE)
      return {
        titulo: 'Nada importante por aqui.',
        subtitulo: 'Possivelmente você está de férias?'
      }
    if (criterio === 'prioridade' && valor === enums.Prioridade.NORMAL)
      return {
        titulo: 'Nenhuma tarefa normal.',
        subtitulo: 'Normal é o que há de mais raro.'
      }
    return {
      titulo: 'Nenhuma tarefa por aqui.',
      subtitulo: 'Cadastre uma antes que o caos chegue.'
    }
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
          <p>{getMensagemVazia().titulo}</p>
          <span>{getMensagemVazia().subtitulo}</span>
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
