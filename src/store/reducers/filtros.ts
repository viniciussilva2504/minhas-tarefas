import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Tarefa'

type FiltroState = {
  termo: string
  criterio: 'prioridade' | 'status' | 'todas' | 'atrasadas'
  valor?: enums.Prioridade | enums.Status
  ordenacao: 'padrao' | 'prazo-asc' | 'prioridade'
}

type AlterarFiltroPayload = {
  criterio: FiltroState['criterio']
  valor?: FiltroState['valor']
  termo: string
}

const initialState: FiltroState = {
  termo: '',
  criterio: 'todas',
  ordenacao: 'padrao'
}

const filtroSlice = createSlice({
  name: 'filtro',
  initialState,
  reducers: {
    alterarTermo: (state, action: PayloadAction<string>) => {
      state.termo = action.payload
    },
    alterarFiltro: (state, action: PayloadAction<AlterarFiltroPayload>) => {
      state.criterio = action.payload.criterio
      state.valor = action.payload.valor
      state.termo = action.payload.termo
    },
    alterarOrdenacao: (
      state,
      action: PayloadAction<FiltroState['ordenacao']>
    ) => {
      state.ordenacao = action.payload
    }
  }
})

export const { alterarTermo, alterarFiltro, alterarOrdenacao } =
  filtroSlice.actions
export default filtroSlice.reducer
