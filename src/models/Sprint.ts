export type StatusSprint = 'planejamento' | 'ativo' | 'concluido'

class Sprint {
  id: string
  nome: string
  inicio: string // YYYY-MM-DD
  fim: string // YYYY-MM-DD
  status: StatusSprint
  meta?: string
  velocidade?: number // story points concluídos ao fechar o sprint

  constructor(
    id: string,
    nome: string,
    inicio: string,
    fim: string,
    status: StatusSprint,
    meta?: string,
    velocidade?: number
  ) {
    this.id = id
    this.nome = nome
    this.inicio = inicio
    this.fim = fim
    this.status = status
    this.meta = meta
    this.velocidade = velocidade
  }
}

export default Sprint
