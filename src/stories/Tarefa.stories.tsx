import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tarefasReducer from '../store/reducers/tarefas'
import filtrosReducer from '../store/reducers/filtros'
import { AuthContext } from '../contexts/AuthContext'
import Tarefa from '../components/Tarefa'
import * as enums from '../utils/enums/Tarefa'

function makeStore() {
  return configureStore({
    reducer: combineReducers({
      tarefas: tarefasReducer,
      filtros: filtrosReducer
    })
  })
}

const mockAuth = {
  user: null,
  loading: false,
  signInWithGoogle: async () => {},
  logout: async () => {}
}

const meta: Meta<typeof Tarefa> = {
  title: 'Components/Tarefa',
  component: Tarefa,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <AuthContext.Provider value={mockAuth}>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </AuthContext.Provider>
      </Provider>
    )
  ],
  args: {
    id: 1,
    titulo: 'Estudar TypeScript',
    descricao: 'Revisar generics e tipos condicionais.',
    prioridade: enums.Prioridade.IMPORTANTE,
    status: enums.Status.PENDENTE
  }
}

export default meta
type Story = StoryObj<typeof Tarefa>

export const Pendente: Story = {}

export const Concluida: Story = {
  args: {
    status: enums.Status.CONCLUIDA
  }
}

export const Urgente: Story = {
  args: {
    prioridade: enums.Prioridade.URGENTE,
    titulo: 'Deploy em produção',
    descricao: 'Subir versão 2.0 para o servidor.'
  }
}

export const ComPrazo: Story = {
  args: {
    prazo: new Date().toISOString().slice(0, 10),
    titulo: 'Entregar relatório',
    descricao: 'Prazo de hoje.'
  }
}

export const Atrasada: Story = {
  args: {
    prazo: '2024-01-01',
    titulo: 'Tarefa atrasada',
    descricao: 'Esta tarefa já passou do prazo.'
  }
}
