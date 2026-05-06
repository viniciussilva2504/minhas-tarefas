import * as enums from '../utils/enums/Tarefa'

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

  constructor(
    titulo: string,
    prioridade: enums.Prioridade,
    status: enums.Status,
    descricao: string,
    id: number,
    prazo?: string,
    pontos?: number,
    sprintId?: string,
    colunaKanban?: enums.ColunaKanban
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
  }
}

export default Tarefa
