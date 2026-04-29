import { useEffect, useState } from 'react'
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import styled from 'styled-components'

type Evento = {
  id: string
  acao: 'cadastrou' | 'concluiu' | 'editou' | 'removeu'
  tarefa: string
  criadoEm: Timestamp | null
}

const ICONE: Record<Evento['acao'], string> = {
  cadastrou: '➕',
  concluiu: '✅',
  editou: '✏️',
  removeu: '🗑️'
}

const Wrapper = styled.div`
  padding: 32px 40px;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`

const Titulo = styled.h1`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 24px;
`

const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Item = styled.li`
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 14px;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
`

const Hora = styled.span`
  font-size: 11px;
  color: var(--color-text-muted);
  min-width: 120px;
`

const Vazio = styled.p`
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: 40px;
`

const formatarData = (ts: Timestamp | null): string => {
  if (!ts) return '—'
  const d = ts.toDate()
  return d.toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const Historico = () => {
  const { user } = useAuth()
  const [eventos, setEventos] = useState<Evento[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!user) return
    const q = query(
      collection(db, 'users', user.uid, 'historico'),
      orderBy('criadoEm', 'desc'),
      limit(50)
    )
    const unsub = onSnapshot(q, (snap) => {
      setEventos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Evento)))
      setCarregando(false)
    })
    return unsub
  }, [user])

  return (
    <Wrapper>
      <Titulo>Histórico de atividade</Titulo>
      {carregando ? (
        <Vazio>A carregar...</Vazio>
      ) : eventos.length === 0 ? (
        <Vazio>Nenhuma atividade registada ainda.</Vazio>
      ) : (
        <Lista>
          {eventos.map((e) => (
            <Item key={e.id}>
              <span>{ICONE[e.acao]}</span>
              <span>
                Você <strong>{e.acao}</strong> &quot;{e.tarefa}&quot;
              </span>
              <Hora>{formatarData(e.criadoEm)}</Hora>
            </Item>
          ))}
        </Lista>
      )}
    </Wrapper>
  )
}

export default Historico
