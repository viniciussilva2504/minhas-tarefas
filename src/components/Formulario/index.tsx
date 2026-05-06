import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { cadastrar, limparErro } from '../../store/reducers/tarefas'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import * as S from './styles'

const PONTOS_FIBONACCI = [1, 2, 3, 5, 8, 13]

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const erro = useSelector((state: RootReducer) => state.tarefas.erro)
  const { itens: sprints } = useSelector((state: RootReducer) => state.sprints)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prazo, setPrazo] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)
  const [pontos, setPontos] = useState<number | undefined>(undefined)
  const [sprintId, setSprintId] = useState<string>('')
  const [submetido, setSubmetido] = useState(false)

  const sprintsDisponiveis = sprints.filter(
    (s) => s.status === 'planejamento' || s.status === 'ativo'
  )

  const formatarPrioridade = (p: string) =>
    p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    setSubmetido(true)
    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        prazo: prazo || undefined,
        status: enums.Status.PENDENTE,
        pontos: pontos,
        sprintId: sprintId || undefined,
        colunaKanban: sprintId ? enums.ColunaKanban.TODO : undefined
      })
    )
  }

  useEffect(() => {
    if (!submetido) return
    if (erro === null) {
      setTitulo('')
      setDescricao('')
      setPrazo('')
      setPrioridade(enums.Prioridade.NORMAL)
      setPontos(undefined)
      setSprintId('')
      setSubmetido(false)
      navigate('/')
    } else {
      setSubmetido(false)
    }
  }, [submetido, erro, navigate])

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
      <S.BotaoSalvar type="submit">Cadastrar</S.BotaoSalvar>
    </S.Form>
  )
}

export default Formulario
