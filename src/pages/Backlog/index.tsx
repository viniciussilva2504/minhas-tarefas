import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import { atribuirSprint } from '../../store/reducers/tarefas'
import { usePageTitle } from '../../hooks/usePageTitle'
import * as S from './styles'

function corPrioridade(p: enums.Prioridade): string {
  if (p === enums.Prioridade.URGENTE) return '#FF5F1F'
  if (p === enums.Prioridade.IMPORTANTE) return '#52525B'
  return '#A1A1AA'
}

const Backlog = () => {
  usePageTitle('Product Backlog')
  const dispatch = useDispatch()
  const { itens: tarefas } = useSelector((state: RootReducer) => state.tarefas)
  const { itens: sprints } = useSelector((state: RootReducer) => state.sprints)
  const [sprintSelecionado, setSprintSelecionado] = useState<
    Record<number, string>
  >({})

  const tarefasBacklog = tarefas.filter((t) => !t.sprintId)
  const sprintsDisponiveis = sprints.filter(
    (s) => s.status === 'planejamento' || s.status === 'ativo'
  )

  const atribuir = (tarefaId: number) => {
    const sid = sprintSelecionado[tarefaId]
    if (!sid) return
    dispatch(atribuirSprint({ id: tarefaId, sprintId: sid }))
    setSprintSelecionado((prev) => {
      const copia = { ...prev }
      delete copia[tarefaId]
      return copia
    })
  }

  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>Product Backlog</S.Titulo>
        <S.Subtitulo>
          {tarefasBacklog.length} tarefa
          {tarefasBacklog.length !== 1 ? 's' : ''} sem sprint atribuído
        </S.Subtitulo>
      </S.Cabecalho>

      {tarefasBacklog.length === 0 ? (
        <S.EstadoVazio>Todas as tarefas estão num sprint 🎉</S.EstadoVazio>
      ) : (
        tarefasBacklog.map((t) => (
          <S.TarefaItem key={t.id}>
            <S.TarefaInfo>
              <S.TarefaTitulo>{t.titulo}</S.TarefaTitulo>
              <S.Tags>
                <S.Tag cor={corPrioridade(t.prioridade)}>{t.prioridade}</S.Tag>
                <S.Tag
                  cor={
                    t.status === enums.Status.PENDENTE ? '#52525B' : '#A1A1AA'
                  }
                >
                  {t.status}
                </S.Tag>
                {t.pontos && <S.PontosTag>{t.pontos} pts</S.PontosTag>}
              </S.Tags>
            </S.TarefaInfo>
            {sprintsDisponiveis.length > 0 && (
              <S.BotoesAcao>
                <S.Select
                  value={sprintSelecionado[t.id] ?? ''}
                  onChange={(e) =>
                    setSprintSelecionado((prev) => ({
                      ...prev,
                      [t.id]: e.target.value
                    }))
                  }
                >
                  <option value="">Escolher sprint...</option>
                  {sprintsDisponiveis.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </S.Select>
                <S.BotaoAtribuir
                  onClick={() => atribuir(t.id)}
                  disabled={!sprintSelecionado[t.id]}
                >
                  Adicionar
                </S.BotaoAtribuir>
              </S.BotoesAcao>
            )}
          </S.TarefaItem>
        ))
      )}
    </S.Container>
  )
}

export default Backlog
