// Serviço centralizado para manipulação de dados no localStorage

export function salvarDadosPorData<T>(data: Date, dados: T) {
  const key = gerarChavePorData(data)
  localStorage.setItem(key, JSON.stringify(dados))
}

export function carregarDadosPorData<T>(data: Date, valorPadrao: T): T {
  const key = gerarChavePorData(data)
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : valorPadrao
}

export function gerarChavePorData(data: Date) {
  return `planner-data-${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
}
