import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { cadastrar, limparErro } from '../../store/reducers/tarefas'
import { RootReducer } from '../../store'
import * as enums from '../../utils/enums/Tarefa'
import * as S from './styles'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const erro = useSelector((state: RootReducer) => state.tarefas.erro)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prazo, setPrazo] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)
  const [submetido, setSubmetido] = useState(false)

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
        status: enums.Status.PENDENTE
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
      <S.BotaoSalvar type="submit">Cadastrar</S.BotaoSalvar>
    </S.Form>
  )
}

export default Formulario
