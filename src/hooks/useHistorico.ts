import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

type TipoAcao = 'cadastrou' | 'concluiu' | 'editou' | 'removeu'

const useHistorico = () => {
  const { user } = useAuth()

  const registrar = async (acao: TipoAcao, tituloTarefa: string) => {
    if (!user) return
    try {
      await addDoc(collection(db, 'users', user.uid, 'historico'), {
        acao,
        tarefa: tituloTarefa,
        criadoEm: serverTimestamp()
      })
    } catch {
      // histórico é best-effort, não bloqueia o fluxo principal
    }
  }

  return { registrar }
}

export default useHistorico
