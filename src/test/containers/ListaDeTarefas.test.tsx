import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import tarefasReducer from '../../store/reducers/tarefas'
import filtrosReducer from '../../store/reducers/filtros'
import ListaDeTarefas from '../../containers/ListaDeTarefas'
import * as enums from '../../utils/enums/Tarefa'

const tarefasIniciais = [
  {
    id: 1,
    titulo: 'Fazer compras',
    descricao: 'Mercado da semana',
    prioridade: enums.Prioridade.NORMAL,
    status: enums.Status.PENDENTE
  },
  {
    id: 2,
    titulo: 'Estudar TypeScript',
    descricao: 'Avançar no módulo de generics',
    prioridade: enums.Prioridade.URGENTE,
    status: enums.Status.PENDENTE
  },
  {
    id: 3,
    titulo: 'Reunião de equipe',
    descricao: 'Alinhamento weekly',
    prioridade: enums.Prioridade.IMPORTANTE,
    status: enums.Status.CONCLUIDA
  }
]

function renderComStore(
  filtrosPreloaded?: Partial<ReturnType<typeof filtrosReducer>>
) {
  const store = configureStore({
    reducer: { tarefas: tarefasReducer, filtros: filtrosReducer },
    preloadedState: {
      tarefas: { itens: tarefasIniciais, erro: null },
      filtros: {
        termo: '',
        criterio: 'todas' as const,
        ordenacao: 'padrao' as const,
        ...filtrosPreloaded
      }
    }
  })
  render(
    <Provider store={store}>
      <ListaDeTarefas />
    </Provider>
  )
  return { store }
}

describe('ListaDeTarefas — integração', () => {
  it('exibe todas as tarefas por padrão', () => {
    renderComStore()
    expect(screen.getByText('Fazer compras')).toBeTruthy()
    expect(screen.getByText('Estudar TypeScript')).toBeTruthy()
    expect(screen.getByText('Reunião de equipe')).toBeTruthy()
  })

  it('exibe estado vazio quando filtro não retorna tarefas', () => {
    renderComStore({ termo: 'xyzabc' })
    expect(screen.getByText('Nenhuma tarefa encontrada')).toBeTruthy()
  })

  it('filtra tarefas por termo de busca', () => {
    renderComStore({ termo: 'TypeScript' })
    expect(screen.getByText('Estudar TypeScript')).toBeTruthy()
    expect(screen.queryByText('Fazer compras')).toBeNull()
  })

  it('filtra somente tarefas pendentes', () => {
    renderComStore({
      criterio: 'status',
      valor: enums.Status.PENDENTE
    })
    expect(screen.getByText('Fazer compras')).toBeTruthy()
    expect(screen.getByText('Estudar TypeScript')).toBeTruthy()
    expect(screen.queryByText('Reunião de equipe')).toBeNull()
  })

  it('filtra somente tarefas concluídas', () => {
    renderComStore({
      criterio: 'status',
      valor: enums.Status.CONCLUIDA
    })
    expect(screen.queryByText('Fazer compras')).toBeNull()
    expect(screen.getByText('Reunião de equipe')).toBeTruthy()
  })

  it('filtra por prioridade urgente', () => {
    renderComStore({
      criterio: 'prioridade',
      valor: enums.Prioridade.URGENTE
    })
    expect(screen.getByText('Estudar TypeScript')).toBeTruthy()
    expect(screen.queryByText('Fazer compras')).toBeNull()
  })

  it('exibe mensagem com contagem correta', () => {
    renderComStore()
    expect(screen.getByText(/3 tarefa\(s\) encontrada\(s\)/)).toBeTruthy()
  })

  it('ordena por prioridade colocando urgente primeiro', () => {
    renderComStore({ ordenacao: 'prioridade' })
    const titulos = screen
      .getAllByRole('article')
      .map((el) => el.querySelector('h3')?.textContent)
    expect(titulos[0]).toBe('Estudar TypeScript') // URGENTE
    expect(titulos[1]).toBe('Reunião de equipe') // IMPORTANTE
    expect(titulos[2]).toBe('Fazer compras') // NORMAL
  })
})
