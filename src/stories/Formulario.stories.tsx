import type { Meta, StoryObj } from '@storybook/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tarefasReducer from '../store/reducers/tarefas'
import filtrosReducer from '../store/reducers/filtros'
import { AuthContext } from '../contexts/AuthContext'
import Formulario from '../components/Formulario'

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

const meta: Meta<typeof Formulario> = {
  title: 'Components/Formulario',
  component: Formulario,
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
  ]
}

export default meta
type Story = StoryObj<typeof Formulario>

export const Vazio: Story = {}
