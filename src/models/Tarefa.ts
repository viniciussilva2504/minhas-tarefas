import * as enums from '../utils/enums/Tarefa'

export type Subtarefa = {
  id: string
  texto: string
  concluida: boolean
}

class Tarefa {
  titulo: string
  prioridade: enums.Prioridade
  status: enums.Status
  descricao: string
  id: number
  prazo?: string
  pontos?: number
  sprintId?: string
  colunaKanban?: enums.ColunaKanban
  tags?: string[]
  subtarefas?: Subtarefa[]

  constructor(
    titulo: string,
    prioridade: enums.Prioridade,
    status: enums.Status,
    descricao: string,
    id: number,
    prazo?: string,
    pontos?: number,
    sprintId?: string,
    colunaKanban?: enums.ColunaKanban,
    tags?: string[],
    subtarefas?: Subtarefa[]
  ) {
    this.titulo = titulo
    this.prioridade = prioridade
    this.status = status
    this.descricao = descricao
    this.id = id
    this.prazo = prazo
    this.pontos = pontos
    this.sprintId = sprintId
    this.colunaKanban = colunaKanban
    this.tags = tags
    this.subtarefas = subtarefas
  }
}

export default Tarefa
