import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { cadastrar, limparErro } from '../../store/reducers/tarefas'
import { RootReducer } from '../../store'
import { Subtarefa } from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'
import * as S from './styles'

const PONTOS_FIBONACCI = [1, 2, 3, 5, 8, 13]

const Formulario = () => {
  const dispatch = useDispatch()
  const erro = useSelector((state: RootReducer) => state.tarefas.erro)
  const { itens: sprints } = useSelector(
    (state: RootReducer) => state.sprints ?? { itens: [] }
  )
  const [submetido, setSubmetido] = useState(false)

  // Se houve erro após submissão (ex: título duplicado), permite tentar de novo
  useEffect(() => {
    if (submetido && erro !== null) {
      setSubmetido(false)
    }
  }, [submetido, erro])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prazo, setPrazo] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)
  const [pontos, setPontos] = useState<number | undefined>(undefined)
  const [sprintId, setSprintId] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [subtarefas, setSubtarefas] = useState<Subtarefa[]>([])
  const [subtarefaInput, setSubtarefaInput] = useState('')

  const sprintsDisponiveis = sprints.filter(
    (s) => s.status === 'planejamento' || s.status === 'ativo'
  )

  const formatarPrioridade = (p: string) =>
    p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()

  const adicionarTag = () => {
    const tag = tagInput.trim()
    if (!tag || tags.includes(tag)) return
    setTags((prev) => [...prev, tag])
    setTagInput('')
  }

  const adicionarSubtarefa = () => {
    const texto = subtarefaInput.trim()
    if (!texto) return
    setSubtarefas((prev) => [
      ...prev,
      { id: `sub-${Date.now()}`, texto, concluida: false }
    ])
    setSubtarefaInput('')
  }

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        prazo: prazo || undefined,
        status: enums.Status.PENDENTE,
        pontos: pontos,
        sprintId: sprintId || undefined,
        colunaKanban: sprintId ? enums.ColunaKanban.TODO : undefined,
        tags: tags.length > 0 ? tags : undefined,
        subtarefas: subtarefas.length > 0 ? subtarefas : undefined
      })
    )
    setSubmetido(true)
  }

  // Navegação declarativa — depois do dispatch, se não houver erro, redireciona
  if (submetido && erro === null) {
    return <Navigate to="/" replace />
  }

  return (
    <S.Form onSubmit={cadastrarTarefa}>
      <S.Titulo>Nova tarefa</S.Titulo>
      {erro && <S.MensagemErro>{erro}</S.MensagemErro>}
      <S.Campo
        value={titulo}
        onChange={(evento: React.ChangeEvent<HTMLInputElement>) => {
          setTitulo(evento.target.value)
          if (erro) dispatch(limparErro())
        }}
        type="text"
        placeholder="Título"
        required
      />
      <S.Campo
        value={descricao}
        onChange={(
          evento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setDescricao(evento.target.value)}
        as="textarea"
        placeholder="Descrição da tarefa"
        required
      />
      <S.Campo
        value={prazo}
        onChange={(evento: React.ChangeEvent<HTMLInputElement>) =>
          setPrazo(evento.target.value)
        }
        type="date"
        min={new Date().toISOString().split('T')[0]}
      />
      <S.Opcoes>
        <p>Prioridade</p>
        {Object.values(enums.Prioridade).map((p) => (
          <S.Opcao key={p}>
            <input
              value={p}
              name="prioridade"
              type="radio"
              onChange={(evento) =>
                setPrioridade(evento.target.value as enums.Prioridade)
              }
              id={p}
              defaultChecked={p === enums.Prioridade.NORMAL}
            />{' '}
            <label htmlFor={p}>{formatarPrioridade(p)}</label>
          </S.Opcao>
        ))}
      </S.Opcoes>
      <S.Opcoes>
        <p>Story Points</p>
        <S.PontosGrid>
          <S.OpcaoPontos
            ativo={pontos === undefined}
            type="button"
            onClick={() => setPontos(undefined)}
          >
            —
          </S.OpcaoPontos>
          {PONTOS_FIBONACCI.map((p) => (
            <S.OpcaoPontos
              key={p}
              ativo={pontos === p}
              type="button"
              onClick={() => setPontos(p)}
            >
              {p}
            </S.OpcaoPontos>
          ))}
        </S.PontosGrid>
      </S.Opcoes>
      {sprintsDisponiveis.length > 0 && (
        <S.Opcoes>
          <p>Sprint</p>
          <S.SelectSprint
            value={sprintId}
            onChange={(e) => setSprintId(e.target.value)}
          >
            <option value="">Backlog (sem sprint)</option>
            {sprintsDisponiveis.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </S.SelectSprint>
        </S.Opcoes>
      )}
      <S.Opcoes>
        <p>Etiquetas</p>
        <S.CampoRow>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                adicionarTag()
              }
            }}
            placeholder="Nova etiqueta"
            aria-label="Nova etiqueta"
          />
          <S.BotaoPequeno
            type="button"
            onClick={adicionarTag}
            aria-label="Adicionar etiqueta"
          >
            +
          </S.BotaoPequeno>
        </S.CampoRow>
        {tags.length > 0 && (
          <S.TagsWrapper>
            {tags.map((tag) => (
              <S.TagChip key={tag}>
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                  }
                  aria-label={`Remover etiqueta ${tag}`}
                >
                  ×
                </button>
              </S.TagChip>
            ))}
          </S.TagsWrapper>
        )}
      </S.Opcoes>
      <S.Opcoes>
        <p>Sub-tarefas</p>
        <S.CampoRow>
          <input
            type="text"
            value={subtarefaInput}
            onChange={(e) => setSubtarefaInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                adicionarSubtarefa()
              }
            }}
            placeholder="Nova sub-tarefa"
            aria-label="Nova sub-tarefa"
          />
          <S.BotaoPequeno
            type="button"
            onClick={adicionarSubtarefa}
            aria-label="Adicionar sub-tarefa"
          >
            +
          </S.BotaoPequeno>
        </S.CampoRow>
        {subtarefas.length > 0 && (
          <S.SubtarefaLista>
            {subtarefas.map((s) => (
              <S.SubtarefaItem key={s.id}>
                <span>{s.texto}</span>
                <button
                  type="button"
                  onClick={() =>
                    setSubtarefas((prev) => prev.filter((x) => x.id !== s.id))
                  }
                  aria-label={`Remover sub-tarefa: ${s.texto}`}
                >
                  ×
                </button>
              </S.SubtarefaItem>
            ))}
          </S.SubtarefaLista>
        )}
      </S.Opcoes>
      <S.BotaoSalvar type="submit">Cadastrar</S.BotaoSalvar>
    </S.Form>
  )
}

export default Formulario
