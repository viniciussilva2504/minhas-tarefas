import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import FiltroCard from '../../components/FiltroCard'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'

import * as S from './styles'
import { alterarTermo, alterarFiltro } from '../../store/reducers/filtros'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { termo, criterio } = useSelector((state: RootReducer) => state.filtros)
  const { itens } = useSelector((state: RootReducer) => state.tarefas)

  const estaExibindoFormulario = location.pathname === '/nova-tarefa'

  const getContador = (criterio: string) => {
    if (criterio === 'todas') return itens.length
    if (criterio === 'pendentes')
      return itens.filter((item) => item.status === enums.Status.PENDENTE)
        .length
    if (criterio === 'concluidas')
      return itens.filter((item) => item.status === enums.Status.CONCLUIDA)
        .length
    if (criterio === 'urgentes')
      return itens.filter(
        (item) => item.prioridade === enums.Prioridade.URGENTE
      ).length
    if (criterio === 'importantes')
      return itens.filter(
        (item) => item.prioridade === enums.Prioridade.IMPORTANTE
      ).length
    if (criterio === 'normais')
      return itens.filter((item) => item.prioridade === enums.Prioridade.NORMAL)
        .length

    return 0
  }

  const filtrarCards = (filtro: string) => {
    switch (filtro) {
      case 'pendentes':
        dispatch(
          alterarFiltro({
            criterio: 'status',
            valor: enums.Status.PENDENTE,
            termo
          })
        )
        break
      case 'concluidas':
        dispatch(
          alterarFiltro({
            criterio: 'status',
            valor: enums.Status.CONCLUIDA,
            termo
          })
        )
        break
      case 'urgentes':
        dispatch(
          alterarFiltro({
            criterio: 'prioridade',
            valor: enums.Prioridade.URGENTE,
            termo
          })
        )
        break
      case 'importantes':
        dispatch(
          alterarFiltro({
            criterio: 'prioridade',
            valor: enums.Prioridade.IMPORTANTE,
            termo
          })
        )
        break
      case 'normais':
        dispatch(
          alterarFiltro({
            criterio: 'prioridade',
            valor: enums.Prioridade.NORMAL,
            termo
          })
        )
        break
      default:
        dispatch(alterarFiltro({ criterio: 'todas', termo }))
    }
  }

  return (
    <S.Aside>
      <div>
        {mostrarFiltros && (
          <>
            <S.Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alterarTermo(evento.target.value))}
            />
            <S.Filtros>
              <FiltroCard
                ativo={criterio === 'todas'}
                legenda="Todas"
                contador={getContador('todas')}
                onClick={() => filtrarCards('todas')}
              />
              <FiltroCard
                ativo={criterio === 'status' && termo === ''}
                legenda="Pendentes"
                contador={getContador('pendentes')}
                onClick={() => filtrarCards('pendentes')}
              />
              <FiltroCard
                ativo={criterio === 'status' && termo === ''}
                legenda="Concluídas"
                contador={getContador('concluidas')}
                onClick={() => filtrarCards('concluidas')}
              />
              <FiltroCard
                ativo={criterio === 'prioridade' && termo === ''}
                legenda="Urgentes"
                contador={getContador('urgentes')}
                onClick={() => filtrarCards('urgentes')}
              />
              <FiltroCard
                ativo={criterio === 'prioridade' && termo === ''}
                legenda="Importantes"
                contador={getContador('importantes')}
                onClick={() => filtrarCards('importantes')}
              />
              <FiltroCard
                ativo={criterio === 'prioridade' && termo === ''}
                legenda="Normais"
                contador={getContador('normais')}
                onClick={() => filtrarCards('normais')}
              />
            </S.Filtros>
            <S.BotaoAdicionar
              onClick={() =>
                estaExibindoFormulario
                  ? navigate('/')
                  : navigate('/nova-tarefa')
              }
              type="button"
            >
              {estaExibindoFormulario
                ? 'Voltar à lista de tarefas'
                : 'Cadastrar nova tarefa'}
            </S.BotaoAdicionar>
          </>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
