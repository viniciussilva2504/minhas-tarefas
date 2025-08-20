import { FormEvent, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { cadastrar } from '../../store/reducers/tarefas'
import * as enums from '../../utils/enums/Tarefa'
import * as S from './styles'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const formatarPrioridade = (prioridade: string) => {
    return (
      prioridade.charAt(0).toUpperCase() + prioridade.slice(1).toLowerCase()
    )
  }

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE
      })
    )
    setTitulo('')
    setDescricao('')
    setPrioridade(enums.Prioridade.NORMAL)
    navigate('/')
  }

  return (
    <S.Form onSubmit={cadastrarTarefa}>
      <S.Titulo>Nova tarefa</S.Titulo>
      <S.Campo
        value={titulo}
        onChange={(evento: { target: { value: SetStateAction<string> } }) =>
          setTitulo(evento.target.value)
        }
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
      <S.Opcoes>
        <p>Prioridade</p>
        {Object.values(enums.Prioridade).map((prioridade) => (
          <S.Opcao key={prioridade}>
            <input
              value={prioridade}
              name="prioridade"
              type="radio"
              onChange={(evento) =>
                setPrioridade(evento.target.value as enums.Prioridade)
              }
              id={prioridade}
              defaultChecked={prioridade === enums.Prioridade.NORMAL}
            />{' '}
            <label htmlFor={prioridade}>{formatarPrioridade(prioridade)}</label>
          </S.Opcao>
        ))}
      </S.Opcoes>
      <S.BotaoSalvar type="submit">Cadastrar</S.BotaoSalvar>
    </S.Form>
  )
}

export default Formulario
