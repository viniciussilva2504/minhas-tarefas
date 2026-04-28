import { useEffect, useRef } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { RootReducer } from '../store'
import { carregarTarefas } from '../store/reducers/tarefas'
import Tarefa from '../models/Tarefa'

/**
 * Sincroniza o estado Redux de tarefas com a coleção Firestore
 * users/{uid}/tarefas. Ouve mudanças em tempo real e persiste
 * ações locais (cadastrar, editar, remover) no Firestore.
 */
const useFirestoreSync = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const isRemoteUpdate = useRef(false)
  const prevItens = useRef<Tarefa[]>([])

  // Escuta mudanças no Firestore e sincroniza para o Redux
  useEffect(() => {
    if (!user) return

    const colRef = collection(db, 'users', user.uid, 'tarefas')
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const tarefas: Tarefa[] = snapshot.docs.map((d) => d.data() as Tarefa)
      isRemoteUpdate.current = true
      dispatch(carregarTarefas(tarefas))
    })

    return unsubscribe
  }, [user, dispatch])

  // Quando o Redux muda (ação local), persiste no Firestore
  useEffect(() => {
    if (!user) return
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false
      prevItens.current = itens
      return
    }

    const prev = prevItens.current
    const curr = itens
    prevItens.current = curr

    const colRef = collection(db, 'users', user.uid, 'tarefas')

    // Itens removidos
    const removidos = prev.filter((p) => !curr.find((c) => c.id === p.id))
    removidos.forEach((t) => deleteDoc(doc(colRef, String(t.id))))

    // Itens adicionados ou editados
    const adicionadosOuEditados = curr.filter((c) => {
      const anterior = prev.find((p) => p.id === c.id)
      return !anterior || JSON.stringify(anterior) !== JSON.stringify(c)
    })
    adicionadosOuEditados.forEach((t) =>
      setDoc(doc(colRef, String(t.id)), { ...t })
    )
  }, [itens, user])
}

export default useFirestoreSync
