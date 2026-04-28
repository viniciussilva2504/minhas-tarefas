import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import FiltroCard from '../../components/FiltroCard'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import { useDarkMode } from '../../hooks/useDarkMode'
import { useAuth } from '../../contexts/AuthContext'

import * as S from './styles'
import {
  alterarTermo,
  alterarFiltro,
  alterarOrdenacao
} from '../../store/reducers/filtros'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { user, logout } = useAuth()
  const { termo, criterio, valor, ordenacao } = useSelector(
    (state: RootReducer) => state.filtros
  )
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
    if (criterio === 'atrasadas') {
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)
      return itens.filter(
        (item) =>
          item.prazo &&
          item.status === enums.Status.PENDENTE &&
          new Date(item.prazo + 'T00:00:00') < hoje
      ).length
    }
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
      case 'atrasadas':
        dispatch(alterarFiltro({ criterio: 'atrasadas', termo }))
        break
      default:
        dispatch(alterarFiltro({ criterio: 'todas', termo }))
    }
  }

  return (
    <S.Aside>
      <div>
        <S.Topo>
          <S.TituloApp>Minhas Tarefas</S.TituloApp>
          <S.TopoAcoes>
            <S.BotaoTema
              onClick={toggleDarkMode}
              aria-label="Alternar tema"
              title={
                darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'
              }
            >
              {darkMode ? '☀️' : '🌙'}
            </S.BotaoTema>
            {user && (
              <S.BotaoTema
                onClick={logout}
                aria-label="Sair da conta"
                title={`Sair (${user.displayName ?? user.email})`}
              >
                →
              </S.BotaoTema>
            )}
          </S.TopoAcoes>
        </S.Topo>
        {mostrarFiltros && (
          <>
            <S.Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento) => dispatch(alterarTermo(evento.target.value))}
              aria-label="Buscar tarefas"
            />
            <S.Filtros>
              <FiltroCard
                ativo={criterio === 'todas'}
                legenda="Todas"
                contador={getContador('todas')}
                onClick={() => filtrarCards('todas')}
              />
              <FiltroCard
                ativo={criterio === 'status' && valor === enums.Status.PENDENTE}
                legenda="Pendentes"
                contador={getContador('pendentes')}
                onClick={() => filtrarCards('pendentes')}
              />
              <FiltroCard
                ativo={
                  criterio === 'status' && valor === enums.Status.CONCLUIDA
                }
                legenda="Concluídas"
                contador={getContador('concluidas')}
                onClick={() => filtrarCards('concluidas')}
              />
              <FiltroCard
                ativo={
                  criterio === 'prioridade' &&
                  valor === enums.Prioridade.URGENTE
                }
                legenda="Urgentes"
                contador={getContador('urgentes')}
                onClick={() => filtrarCards('urgentes')}
              />
              <FiltroCard
                ativo={
                  criterio === 'prioridade' &&
                  valor === enums.Prioridade.IMPORTANTE
                }
                legenda="Importantes"
                contador={getContador('importantes')}
                onClick={() => filtrarCards('importantes')}
              />
              <FiltroCard
                ativo={
                  criterio === 'prioridade' && valor === enums.Prioridade.NORMAL
                }
                legenda="Normais"
                contador={getContador('normais')}
                onClick={() => filtrarCards('normais')}
              />
              <FiltroCard
                ativo={criterio === 'atrasadas'}
                legenda="Atrasadas"
                contador={getContador('atrasadas')}
                onClick={() => filtrarCards('atrasadas')}
              />
            </S.Filtros>
            <S.SelectOrdenacao
              value={ordenacao}
              onChange={(e) =>
                dispatch(
                  alterarOrdenacao(
                    e.target.value as 'padrao' | 'prazo-asc' | 'prioridade'
                  )
                )
              }
              aria-label="Ordenar tarefas"
            >
              <option value="padrao">Ordenar: Padrão</option>
              <option value="prazo-asc">Ordenar: Prazo (mais urgente)</option>
              <option value="prioridade">Ordenar: Prioridade</option>
            </S.SelectOrdenacao>
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
