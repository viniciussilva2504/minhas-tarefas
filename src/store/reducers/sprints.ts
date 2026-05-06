import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Sprint, { StatusSprint } from '../../models/Sprint'

type SprintsState = {
  itens: Sprint[]
}

const initialState: SprintsState = {
  itens: []
}

const sprintsSlice = createSlice({
  name: 'sprints',
  initialState,
  reducers: {
    cadastrarSprint: (state, action: PayloadAction<Omit<Sprint, 'id'>>) => {
      const id = `sprint-${Date.now()}`
      state.itens.push({ ...action.payload, id })
    },
    editarSprint: (state, action: PayloadAction<Sprint>) => {
      const idx = state.itens.findIndex((s) => s.id === action.payload.id)
      if (idx >= 0) {
        state.itens[idx] = action.payload
      }
    },
    removerSprint: (state, action: PayloadAction<string>) => {
      state.itens = state.itens.filter((s) => s.id !== action.payload)
    },
    alterarStatusSprint: (
      state,
      action: PayloadAction<{ id: string; status: StatusSprint; velocidade?: number }>
    ) => {
      const sprint = state.itens.find((s) => s.id === action.payload.id)
      if (sprint) {
        sprint.status = action.payload.status
        if (action.payload.velocidade !== undefined) {
          sprint.velocidade = action.payload.velocidade
        }
      }
    },
    carregarSprints: (state, action: PayloadAction<Sprint[]>) => {
      state.itens = action.payload
    }
  }
})

export const {
  cadastrarSprint,
  editarSprint,
  removerSprint,
  alterarStatusSprint,
  carregarSprints
} = sprintsSlice.actions

export default sprintsSlice.reducer
