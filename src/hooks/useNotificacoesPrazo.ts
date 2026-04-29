import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from '../store'
import * as enums from '../utils/enums/Tarefa'

const NOTIFICACAO_KEY = 'notificacoes_enviadas'

const getEnviadas = (): Set<number> => {
  try {
    const raw = localStorage.getItem(NOTIFICACAO_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

const salvarEnviadas = (ids: Set<number>) => {
  localStorage.setItem(NOTIFICACAO_KEY, JSON.stringify([...ids]))
}

/**
 * Pede permissão e envia notificações para tarefas atrasadas
 * que ainda não foram notificadas nesta sessão.
 */
const useNotificacoesPrazo = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)

  useEffect(() => {
    if (!('Notification' in window)) return

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const atrasadas = itens.filter(
      (t) =>
        t.prazo &&
        t.status === enums.Status.PENDENTE &&
        new Date(t.prazo + 'T00:00:00') < hoje
    )

    if (atrasadas.length === 0) return

    const notificar = () => {
      const enviadas = getEnviadas()
      atrasadas.forEach((t) => {
        if (enviadas.has(t.id)) return
        new Notification('⚠️ Tarefa atrasada', {
          body: `"${t.titulo}" está em atraso. Hora de resolver!`,
          icon: '/favicon.ico',
          tag: `tarefa-${t.id}`
        })
        enviadas.add(t.id)
      })
      salvarEnviadas(enviadas)
    }

    if (Notification.permission === 'granted') {
      notificar()
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') notificar()
      })
    }
  }, [itens])
}

export default useNotificacoesPrazo
