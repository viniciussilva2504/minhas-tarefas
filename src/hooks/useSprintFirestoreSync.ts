import { useEffect, useRef } from 'react'
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc
} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { RootReducer } from '../store'
import { carregarSprints } from '../store/reducers/sprints'
import Sprint from '../models/Sprint'

const useSprintFirestoreSync = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { itens } = useSelector((state: RootReducer) => state.sprints)
  const isRemoteUpdate = useRef(false)
  const prevItens = useRef<Sprint[]>([])

  useEffect(() => {
    if (!user) return

    const colRef = collection(db, 'users', user.uid, 'sprints')
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const sprints: Sprint[] = snapshot.docs.map((d) => d.data() as Sprint)
      isRemoteUpdate.current = true
      dispatch(carregarSprints(sprints))
    })

    return unsubscribe
  }, [user, dispatch])

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

    const colRef = collection(db, 'users', user.uid, 'sprints')

    const removidos = prev.filter((p) => !curr.find((c) => c.id === p.id))
    removidos.forEach((s) => deleteDoc(doc(colRef, s.id)))

    const adicionadosOuEditados = curr.filter((c) => {
      const anterior = prev.find((p) => p.id === c.id)
      return !anterior || JSON.stringify(anterior) !== JSON.stringify(c)
    })
    adicionadosOuEditados.forEach((s) => {
      // Firestore não aceita campos com valor undefined — removê-los antes de guardar
      const dados = Object.fromEntries(
        Object.entries({ ...s }).filter(([, v]) => v !== undefined)
      )
      setDoc(doc(colRef, s.id), dados)
    })
  }, [itens, user])
}

export default useSprintFirestoreSync
