import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
  itens: Tarefa[]
  erro: string | null
}

const initialState: TarefasState = {
  erro: null,
  itens: [
    {
      id: 1,
      descricao: 'Descrição da tarefa 1',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.CONCLUIDA,
      titulo: 'Título da tarefa 1'
    },
    {
      id: 2,
      descricao: 'Descrição da tarefa 2',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'Título da tarefa 2'
    },
    {
      id: 3,
      descricao: 'Descrição da tarefa 3',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      titulo: 'Título da tarefa 3'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        state.erro = 'Já existe uma tarefa com esse título'
      } else {
        const maiorId =
          state.itens.length > 0 ? Math.max(...state.itens.map((t) => t.id)) : 0
        state.itens.push({ ...action.payload, id: maiorId + 1 })
        state.erro = null
      }
    },
    limparErro: (state) => {
      state.erro = null
    }
  }
})

export const { remover, editar, cadastrar, limparErro } = tarefasSlice.actions
export default tarefasSlice.reducer
