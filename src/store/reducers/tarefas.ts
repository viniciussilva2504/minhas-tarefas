import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

type TarefasState = {
  itens: Tarefa[]
  erro: string | null
}

const initialState: TarefasState = {
  erro: null,
  itens: []
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
    },
    carregarTarefas: (state, action: PayloadAction<Tarefa[]>) => {
      state.itens = action.payload
    },
    reordenar: (
      state,
      action: PayloadAction<{ ativo: number; sobre: number }>
    ) => {
      const { ativo, sobre } = action.payload
      const de = state.itens.findIndex((t) => t.id === ativo)
      const para = state.itens.findIndex((t) => t.id === sobre)
      if (de !== -1 && para !== -1) {
        const copia = [...state.itens]
        const [item] = copia.splice(de, 1)
        copia.splice(para, 0, item)
        state.itens = copia
      }
    },
    moverKanban: (
      state,
      action: PayloadAction<{ id: number; coluna: enums.ColunaKanban }>
    ) => {
      const tarefa = state.itens.find((t) => t.id === action.payload.id)
      if (tarefa) {
        tarefa.colunaKanban = action.payload.coluna
        if (action.payload.coluna === enums.ColunaKanban.CONCLUIDA) {
          tarefa.status = enums.Status.CONCLUIDA
        } else if (tarefa.status === enums.Status.CONCLUIDA) {
          tarefa.status = enums.Status.PENDENTE
        }
      }
    },
    atribuirSprint: (
      state,
      action: PayloadAction<{ id: number; sprintId: string | undefined }>
    ) => {
      const tarefa = state.itens.find((t) => t.id === action.payload.id)
      if (tarefa) {
        tarefa.sprintId = action.payload.sprintId
        if (!action.payload.sprintId) {
          tarefa.colunaKanban = undefined
        } else if (!tarefa.colunaKanban) {
          tarefa.colunaKanban = enums.ColunaKanban.TODO
        }
      }
    }
  }
})

export const {
  remover,
  editar,
  cadastrar,
  limparErro,
  carregarTarefas,
  reordenar,
  moverKanban,
  atribuirSprint
} = tarefasSlice.actions
tarefasSlice.actions
export default tarefasSlice.reducer
