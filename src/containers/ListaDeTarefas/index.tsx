import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import Tarefa from '../../components/Tarefa'
import { Container, Mensagem, EmptyState, BannerOffline } from './styles'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import TarefaModel from '../../models/Tarefa'
import { reordenar } from '../../store/reducers/tarefas'
import useNotificacoesPrazo from '../../hooks/useNotificacoesPrazo'

const FRASES_PENDENTES_VAZIO = [
  { subtitulo: 'Vai caminhar no parque. Você merece.' },
  { subtitulo: 'Feche o computador. O sol existe.' },
  { subtitulo: 'Ligue para alguém que você não fala há tempo.' },
  { subtitulo: 'Faça uma caminhada de 20 minutos. Sem podcasts.' },
  { subtitulo: 'Prepare um café devagar, sem pressa.' },
  { subtitulo: 'Leia um livro de papel. Sem notificações.' }
]

const DICAS_OFFLINE = [
  '📖 Leitura do dia: O Hobbit — Tolkien. Sai da tela por algumas horas.',
  '📖 Leitura do dia: Sapiens — Yuval Noah Harari. Vale cada página.',
  '📖 Leitura do dia: O Pequeno Príncipe — Saint-Exupéry. Releia sempre.',
  '📖 Leitura do dia: Pai Rico, Pai Pobre — Kiyosaki. Simples e direto.',
  '📖 Leitura do dia: Thinking, Fast and Slow — Kahneman. Leva tempo. Vale.',
  '📖 Leitura do dia: Deep Work — Cal Newport. Especialmente se você usa muito o celular.',
  '📖 Leitura do dia: O Monge e o Executivo — Hunter. Lê em uma tarde.',
  '🌿 Dica: 20 minutos de caminhada melhoram mais o foco do que um café.',
  '🌿 Dica: Tela para baixo, cabeça para cima. O mundo não acaba em 30 minutos.',
  '🌿 Dica: Anota num papel 3 coisas boas que aconteceram hoje. Funciona.'
]

const ListaDeTarefas = () => {
  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor, ordenacao } = useSelector(
    (state: RootReducer) => state.filtros
  )

  useNotificacoesPrazo()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      dispatch(reordenar({ ativo: Number(active.id), sobre: Number(over.id) }))
    }
  }

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
    if (criterio === 'status' && valor === enums.Status.PENDENTE) {
      const frase =
        FRASES_PENDENTES_VAZIO[
          Math.floor(Math.random() * FRASES_PENDENTES_VAZIO.length)
        ]
      return { titulo: 'Zero pendências.', subtitulo: frase.subtitulo }
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

  const dicaOffline = useMemo(
    () => DICAS_OFFLINE[Math.floor(Math.random() * DICAS_OFFLINE.length)],
    // sorteia uma vez por sessão de filtro pendentes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [criterio, valor]
  )

  const tarefas = ordenarTarefas(filtrarTarefas())
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <Container>
      {criterio === 'status' && valor === enums.Status.PENDENTE && (
        <BannerOffline>{dicaOffline}</BannerOffline>
      )}
      <Mensagem aria-live="polite" aria-atomic="true">
        {mensagem}
      </Mensagem>
      {tarefas.length === 0 ? (
        <EmptyState role="status" aria-live="polite">
          <p>{getMensagemVazia().titulo}</p>
          <span>{getMensagemVazia().subtitulo}</span>
        </EmptyState>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={tarefas.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
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
                    pontos={t.pontos}
                    sprintId={t.sprintId}
                    colunaKanban={t.colunaKanban}
                    tags={t.tags}
                    subtarefas={t.subtarefas}
                  />
                </li>
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </Container>
  )
}

export default ListaDeTarefas
