import { describe, it, expect } from 'vitest'
import filtrosReducer, {
  alterarTermo,
  alterarFiltro,
  alterarOrdenacao
} from '../../store/reducers/filtros'
import * as enums from '../../utils/enums/Tarefa'

const initialState = { termo: '', criterio: 'todas' as const, ordenacao: 'padrao' as const }

describe('filtrosReducer', () => {
  it('alterarTermo atualiza o termo de busca', () => {
    const state = filtrosReducer(initialState, alterarTermo('reunião'))
    expect(state.termo).toBe('reunião')
  })

  it('alterarFiltro define criterio e valor', () => {
    const state = filtrosReducer(
      initialState,
      alterarFiltro({ criterio: 'status', valor: enums.Status.PENDENTE, termo: '' })
    )
    expect(state.criterio).toBe('status')
    expect(state.valor).toBe(enums.Status.PENDENTE)
  })

  it('alterarFiltro com criterio todas limpa o valor', () => {
    const state = filtrosReducer(
      initialState,
      alterarFiltro({ criterio: 'todas', termo: '' })
    )
    expect(state.criterio).toBe('todas')
    expect(state.valor).toBeUndefined()
  })

  it('alterarOrdenacao atualiza o campo ordenacao', () => {
    const state = filtrosReducer(initialState, alterarOrdenacao('prazo-asc'))
    expect(state.ordenacao).toBe('prazo-asc')
  })

  it('alterarOrdenacao aceita valor prioridade', () => {
    const state = filtrosReducer(initialState, alterarOrdenacao('prioridade'))
    expect(state.ordenacao).toBe('prioridade')
  })

  it('alterarFiltro preserva ordenacao existente', () => {
    const stateComOrdenacao = { ...initialState, ordenacao: 'prazo-asc' as const }
    const state = filtrosReducer(
      stateComOrdenacao,
      alterarFiltro({ criterio: 'atrasadas', termo: '' })
    )
    expect(state.criterio).toBe('atrasadas')
    expect(state.ordenacao).toBe('prazo-asc')
  })
})
