import TarefaModel from '../models/Tarefa'

/**
 * Serializa as tarefas em base64 para partilha por URL.
 * URL resultante: /partilhar?dados=<base64>
 * Qualquer pessoa com o link pode importar as tarefas.
 */
const usePartilhar = () => {
  const gerarLink = (tarefas: TarefaModel[]): string => {
    const json = JSON.stringify(tarefas)
    const encoded = btoa(encodeURIComponent(json))
    return `${window.location.origin}/partilhar?dados=${encoded}`
  }

  const copiarLink = async (tarefas: TarefaModel[]): Promise<boolean> => {
    try {
      const link = gerarLink(tarefas)
      await navigator.clipboard.writeText(link)
      return true
    } catch {
      return false
    }
  }

  const importarDaURL = (): TarefaModel[] | null => {
    try {
      const params = new URLSearchParams(window.location.search)
      const dados = params.get('dados')
      if (!dados) return null
      const json = decodeURIComponent(atob(dados))
      return JSON.parse(json) as TarefaModel[]
    } catch {
      return null
    }
  }

  return { gerarLink, copiarLink, importarDaURL }
}

export default usePartilhar
