import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'

import { remover, editar } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'

type Props = TarefaClass

function formatarPrazo(prazo?: string): string | null {
  if (!prazo) return null
  const [year, month, day] = prazo.split('-')
  return `${day}/${month}/${year}`
}

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id,
  prazo
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [estaConfirmandoRemocao, setEstaConfirmandoRemocao] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alternarStatus() {
    const novoStatus =
      status === enums.Status.PENDENTE
        ? enums.Status.CONCLUIDA
        : enums.Status.PENDENTE

    dispatch(
      editar({
        descricao,
        prioridade,
        status: novoStatus,
        titulo,
        id
      })
    )
  }

  const prazoFormatado = formatarPrazo(prazo)
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const atrasada =
    prazo &&
    status === enums.Status.PENDENTE &&
    new Date(prazo + 'T00:00:00') < hoje

  return (
    <S.Card role="article" aria-label={`Tarefa: ${titulo}`}>
      <S.Titulo>{titulo}</S.Titulo>
      <S.TagsRow>
        <S.Tag parametro="prioridade" prioridade={prioridade}>
          {prioridade}
        </S.Tag>
        <S.Tag parametro="status" status={status}>
          {status}
        </S.Tag>
        {prazoFormatado && (
          <S.Prazo atrasada={!!atrasada}>📅 {prazoFormatado}</S.Prazo>
        )}
      </S.TagsRow>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
        aria-label="Descrição da tarefa"
        aria-multiline="true"
      />
      <S.BarraAcoes aria-label="Ações da tarefa">
        {estaEditando ? (
          <>
            <S.BotaoSalvar
              aria-label="Salvar edição"
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id,
                    prazo
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </S.BotaoSalvar>
            <S.BotaoCancelarRemover
              aria-label="Cancelar edição"
              onClick={cancelarEdicao}
            >
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <S.Botao
              aria-label="Editar tarefa"
              onClick={() => setEstaEditando(true)}
            >
              Editar
            </S.Botao>
            <S.BotaoSalvar
              aria-label={
                status === enums.Status.PENDENTE
                  ? 'Concluir tarefa'
                  : 'Reabrir tarefa'
              }
              onClick={alternarStatus}
            >
              {status === enums.Status.PENDENTE ? 'Concluir' : 'Reabrir'}
            </S.BotaoSalvar>
            <S.BotaoCancelarRemover
              aria-label="Remover tarefa"
              onClick={() => setEstaConfirmandoRemocao(true)}
            >
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
        {estaConfirmandoRemocao && (
          <S.ConfirmacaoRemover>
            <span>Confirmar remoção?</span>
            <S.BotaoCancelarRemover
              aria-label="Confirmar remoção da tarefa"
              onClick={() => dispatch(remover(id))}
            >
              Sim
            </S.BotaoCancelarRemover>
            <S.Botao
              aria-label="Cancelar remoção"
              onClick={() => setEstaConfirmandoRemocao(false)}
            >
              Não
            </S.Botao>
          </S.ConfirmacaoRemover>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
