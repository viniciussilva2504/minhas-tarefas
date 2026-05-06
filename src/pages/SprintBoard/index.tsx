import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import { moverKanban } from '../../store/reducers/tarefas'
import { usePageTitle } from '../../hooks/usePageTitle'
import * as S from './styles'

const COLUNAS = [
  { key: enums.ColunaKanban.TODO, label: 'A Fazer', cor: '#52525B' },
  {
    key: enums.ColunaKanban.EM_PROGRESSO,
    label: 'Em Progresso',
    cor: '#3b82f6'
  },
  { key: enums.ColunaKanban.CONCLUIDA, label: 'Concluída', cor: '#16a34a' }
]

function corPrioridade(p: enums.Prioridade): string {
  if (p === enums.Prioridade.URGENTE) return '#FF5F1F'
  if (p === enums.Prioridade.IMPORTANTE) return '#52525B'
  return '#A1A1AA'
}

const SprintBoard = () => {
  usePageTitle('Sprint Board')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { itens: tarefas } = useSelector((state: RootReducer) => state.tarefas)
  const { itens: sprints } = useSelector((state: RootReducer) => state.sprints)

  const sprintAtivo = sprints.find((s) => s.status === 'ativo')

  if (!sprintAtivo) {
    return (
      <S.Container>
        <S.Cabecalho>
          <S.Titulo>Sprint Board</S.Titulo>
        </S.Cabecalho>
        <S.AlertaSemSprint>
          <p>Nenhum sprint ativo no momento.</p>
          <S.BotaoPrimario onClick={() => navigate('/sprints')}>
            Gerir Sprints
          </S.BotaoPrimario>
        </S.AlertaSemSprint>
      </S.Container>
    )
  }

  const tarefasDoSprint = tarefas.filter(
    (t) => t.sprintId === sprintAtivo.id
  )

  const totalPontos = tarefasDoSprint.reduce((acc, t) => acc + (t.pontos ?? 0), 0)
  const pontosConcluidos = tarefasDoSprint
    .filter((t) => t.colunaKanban === enums.ColunaKanban.CONCLUIDA)
    .reduce((acc, t) => acc + (t.pontos ?? 0), 0)
  const percentual = totalPontos > 0 ? Math.round((pontosConcluidos / totalPontos) * 100) : 0

  const formatarData = (d: string) => {
    const [y, m, dia] = d.split('-')
    return `${dia}/${m}/${y}`
  }

  return (
    <S.Container>
      <S.Cabecalho>
        <S.Titulo>{sprintAtivo.nome}</S.Titulo>
        <S.Subtitulo>
          {formatarData(sprintAtivo.inicio)} → {formatarData(sprintAtivo.fim)}
        </S.Subtitulo>
        {sprintAtivo.meta && <S.Meta>🎯 {sprintAtivo.meta}</S.Meta>}
      </S.Cabecalho>

      <S.Metricas>
        <S.MetricaCard>
          <S.MetricaValor>{tarefasDoSprint.length}</S.MetricaValor>
          <S.MetricaLabel>Tarefas</S.MetricaLabel>
        </S.MetricaCard>
        <S.MetricaCard>
          <S.MetricaValor>{totalPontos}</S.MetricaValor>
          <S.MetricaLabel>Pontos Totais</S.MetricaLabel>
        </S.MetricaCard>
        <S.MetricaCard>
          <S.MetricaValor>{pontosConcluidos}</S.MetricaValor>
          <S.MetricaLabel>Concluídos</S.MetricaLabel>
        </S.MetricaCard>
        <S.MetricaCard>
          <S.MetricaValor>{percentual}%</S.MetricaValor>
          <S.MetricaLabel>Progresso</S.MetricaLabel>
        </S.MetricaCard>
      </S.Metricas>

      <S.ProgressBar>
        <S.ProgressFill percentual={percentual} />
      </S.ProgressBar>

      <S.Board>
        {COLUNAS.map((col) => {
          const tarefasColuna = tarefasDoSprint.filter(
            (t) => (t.colunaKanban ?? enums.ColunaKanban.TODO) === col.key
          )
          return (
            <S.Coluna key={col.key}>
              <S.ColunaTitulo>
                {col.label}
                <S.ColunaBadge>{tarefasColuna.length}</S.ColunaBadge>
              </S.ColunaTitulo>
              {tarefasColuna.length === 0 && (
                <S.EstadoVazio>Sem tarefas aqui</S.EstadoVazio>
              )}
              {tarefasColuna.map((t) => (
                <S.TarefaCard key={t.id}>
                  <S.TarefaTitulo>{t.titulo}</S.TarefaTitulo>
                  <S.TarefaTags>
                    <S.Tag cor={corPrioridade(t.prioridade)}>
                      {t.prioridade}
                    </S.Tag>
                    {t.pontos && (
                      <S.PontosTag>{t.pontos} pts</S.PontosTag>
                    )}
                  </S.TarefaTags>
                  <S.BotoesAcao>
                    {col.key !== enums.ColunaKanban.TODO && (
                      <S.BotaoMover
                        onClick={() =>
                          dispatch(
                            moverKanban({
                              id: t.id,
                              coluna: enums.ColunaKanban.TODO
                            })
                          )
                        }
                      >
                        ← A Fazer
                      </S.BotaoMover>
                    )}
                    {col.key !== enums.ColunaKanban.EM_PROGRESSO && (
                      <S.BotaoMover
                        destaque={col.key === enums.ColunaKanban.TODO}
                        onClick={() =>
                          dispatch(
                            moverKanban({
                              id: t.id,
                              coluna: enums.ColunaKanban.EM_PROGRESSO
                            })
                          )
                        }
                      >
                        Em Progresso
                      </S.BotaoMover>
                    )}
                    {col.key !== enums.ColunaKanban.CONCLUIDA && (
                      <S.BotaoMover
                        destaque={col.key === enums.ColunaKanban.EM_PROGRESSO}
                        onClick={() =>
                          dispatch(
                            moverKanban({
                              id: t.id,
                              coluna: enums.ColunaKanban.CONCLUIDA
                            })
                          )
                        }
                      >
                        Concluída ✓
                      </S.BotaoMover>
                    )}
                  </S.BotoesAcao>
                </S.TarefaCard>
              ))}
            </S.Coluna>
          )
        })}
      </S.Board>
    </S.Container>
  )
}

export default SprintBoard
