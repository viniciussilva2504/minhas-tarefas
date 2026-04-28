import { describe, it, expect } from 'vitest'
import tarefasReducer, {
  cadastrar,
  remover,
  editar,
  limparErro
} from '../../store/reducers/tarefas'
import * as enums from '../../utils/enums/Tarefa'
import Tarefa from '../../models/Tarefa'

const initialState = { itens: [], erro: null }

const tarefaBase = {
  titulo: 'Test task',
  descricao: 'Descrição',
  prioridade: enums.Prioridade.NORMAL,
  status: enums.Status.PENDENTE
}

describe('tarefasReducer', () => {
  it('cadastrar adiciona uma nova tarefa', () => {
    const state = tarefasReducer(initialState, cadastrar(tarefaBase))
    expect(state.itens).toHaveLength(1)
    expect(state.itens[0].titulo).toBe('Test task')
    expect(state.itens[0].id).toBe(1)
    expect(state.erro).toBeNull()
  })

  it('cadastrar impede título duplicado e define erro', () => {
    const stateComUma = tarefasReducer(initialState, cadastrar(tarefaBase))
    const state = tarefasReducer(stateComUma, cadastrar(tarefaBase))
    expect(state.itens).toHaveLength(1)
    expect(state.erro).toBe('Já existe uma tarefa com esse título')
  })

  it('limparErro zera o campo erro', () => {
    const stateComErro = tarefasReducer(initialState, cadastrar(tarefaBase))
    const stateComErro2 = tarefasReducer(stateComErro, cadastrar(tarefaBase))
    const state = tarefasReducer(stateComErro2, limparErro())
    expect(state.erro).toBeNull()
  })

  it('remover exclui a tarefa pelo id', () => {
    const stateComUma = tarefasReducer(initialState, cadastrar(tarefaBase))
    const id = stateComUma.itens[0].id
    const state = tarefasReducer(stateComUma, remover(id))
    expect(state.itens).toHaveLength(0)
  })

  it('editar atualiza a tarefa existente', () => {
    const stateComUma = tarefasReducer(initialState, cadastrar(tarefaBase))
    const tarefa = stateComUma.itens[0]
    const tarefaEditada: Tarefa = { ...tarefa, descricao: 'Nova descrição' }
    const state = tarefasReducer(stateComUma, editar(tarefaEditada))
    expect(state.itens[0].descricao).toBe('Nova descrição')
  })

  it('gera IDs crescentes sem colisão após remoção', () => {
    let state = tarefasReducer(
      initialState,
      cadastrar({ ...tarefaBase, titulo: 'A' })
    )
    state = tarefasReducer(state, cadastrar({ ...tarefaBase, titulo: 'B' }))
    const idB = state.itens[1].id
    state = tarefasReducer(state, remover(state.itens[0].id))
    state = tarefasReducer(state, cadastrar({ ...tarefaBase, titulo: 'C' }))
    const idC = state.itens[state.itens.length - 1].id
    expect(idC).toBeGreaterThan(idB)
  })
})
