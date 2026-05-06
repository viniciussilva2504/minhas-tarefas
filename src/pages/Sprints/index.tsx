import { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import {
  cadastrarSprint,
  removerSprint,
  alterarStatusSprint
} from '../../store/reducers/sprints'
import { atribuirSprint } from '../../store/reducers/tarefas'
import { usePageTitle } from '../../hooks/usePageTitle'
import * as S from './styles'

const STATUS_COR: Record<string, string> = {
  planejamento: '#52525B',
  ativo: '#FF5F1F',
  concluido: '#16a34a'
}

const STATUS_LABEL: Record<string, string> = {
  planejamento: 'Planeamento',
  ativo: 'Ativo',
  concluido: 'Concluído'
}

const Sprints = () => {
  usePageTitle('Sprints')
  const dispatch = useDispatch()
  const { itens: sprints } = useSelector((state: RootReducer) => state.sprints)
  const { itens: tarefas } = useSelector((state: RootReducer) => state.tarefas)

  const [nome, setNome] = useState('')
  const [inicio, setInicio] = useState('')
  const [fim, setFim] = useState('')
  const [meta, setMeta] = useState('')

  const hoje = new Date().toISOString().split('T')[0]

  const criarSprint = (e: FormEvent) => {
    e.preventDefault()
    if (!nome || !inicio || !fim) return
    dispatch(
      cadastrarSprint({
        nome,
        inicio,
        fim,
        meta: meta || undefined,
        status: 'planejamento'
      })
    )
    setNome('')
    setInicio('')
    setFim('')
    setMeta('')
  }

  const ativarSprint = (id: string) => {
    // Só um sprint pode estar ativo — arquivar o atual antes
    const sprintAtual = sprints.find((s) => s.status === 'ativo')
    if (sprintAtual) {
      alert(
        `Já existe um sprint ativo: ${sprintAtual.nome}. Conclua-o antes de ativar outro.`
      )
      return
    }
    dispatch(alterarStatusSprint({ id, status: 'ativo' }))
  }

  const concluirSprint = (id: string) => {
    const tarefasDoSprint = tarefas.filter((t) => t.sprintId === id)
    const velocidade = tarefasDoSprint
      .filter((t) => t.status === 'CONCLUIDA')
      .reduce((acc, t) => acc + (t.pontos ?? 0), 0)

    dispatch(alterarStatusSprint({ id, status: 'concluido', velocidade }))
  }

  const excluirSprint = (id: string) => {
    const tarefasNoSprint = tarefas.filter((t) => t.sprintId === id)
    if (tarefasNoSprint.length > 0) {
      const confirmar = window.confirm(
        `Este sprint tem ${tarefasNoSprint.length} tarefa(s). Ao remover, elas voltam ao backlog. Confirmar?`
      )
      if (!confirmar) return
      tarefasNoSprint.forEach((t) =>
        dispatch(atribuirSprint({ id: t.id, sprintId: undefined }))
      )
    }
    dispatch(removerSprint(id))
  }

  const formatarData = (d: string) => {
    const [y, m, dia] = d.split('-')
    return `${dia}/${m}/${y}`
  }

  const sprintsOrdenados = [...sprints].sort((a, b) => {
    const ordem: Record<string, number> = { ativo: 0, planejamento: 1, concluido: 2 }
    return (ordem[a.status] ?? 3) - (ordem[b.status] ?? 3)
  })

  return (
    <S.Container>
      <S.Titulo>Gestão de Sprints</S.Titulo>

      {sprintsOrdenados.length === 0 ? (
        <S.EstadoVazio>Nenhum sprint criado ainda.</S.EstadoVazio>
      ) : (
        sprintsOrdenados.map((s) => (
          <S.SprintCard key={s.id} status={s.status}>
            <S.SprintNome>{s.nome}</S.SprintNome>
            {s.meta && <S.SprintMeta>🎯 {s.meta}</S.SprintMeta>}
            <S.SprintInfo>
              <S.Badge cor={STATUS_COR[s.status] ?? '#52525B'}>
                {STATUS_LABEL[s.status]}
              </S.Badge>
              <S.SprintDatas>
                {formatarData(s.inicio)} → {formatarData(s.fim)}
              </S.SprintDatas>
              {s.velocidade !== undefined && (
                <S.VelocidadeTag>⚡ {s.velocidade} pts velocidade</S.VelocidadeTag>
              )}
            </S.SprintInfo>
            <S.BotoesAcao>
              {s.status === 'planejamento' && (
                <S.Botao variante="primario" onClick={() => ativarSprint(s.id)}>
                  ▶ Ativar Sprint
                </S.Botao>
              )}
              {s.status === 'ativo' && (
                <S.Botao variante="primario" onClick={() => concluirSprint(s.id)}>
                  ✓ Concluir Sprint
                </S.Botao>
              )}
              {s.status !== 'ativo' && (
                <S.Botao variante="perigo" onClick={() => excluirSprint(s.id)}>
                  Remover
                </S.Botao>
              )}
            </S.BotoesAcao>
          </S.SprintCard>
        ))
      )}

      <S.Separador />

      <S.FormSprint onSubmit={criarSprint}>
        <S.FormTitulo>Criar novo Sprint</S.FormTitulo>
        <S.Campo
          type="text"
          placeholder="Nome do sprint (ex: Sprint 1)"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <S.Campo
          type="text"
          placeholder="Meta do sprint (opcional)"
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
        />
        <S.DatasRow>
          <S.Campo
            type="date"
            min={hoje}
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            required
            title="Data de início"
          />
          <S.Campo
            type="date"
            min={inicio || hoje}
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            required
            title="Data de fim"
          />
        </S.DatasRow>
        <S.BotaoSalvar type="submit">Criar Sprint</S.BotaoSalvar>
      </S.FormSprint>
    </S.Container>
  )
}

export default Sprints
