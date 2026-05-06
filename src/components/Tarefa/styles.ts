import styled, { keyframes } from 'styled-components'
import * as enums from '../../utils/enums/Tarefa'

type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  parametro: 'status' | 'prioridade'
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.parametro === 'prioridade') {
    if (props.prioridade === enums.Prioridade.URGENTE) return '#FF5F1F'
    if (props.prioridade === enums.Prioridade.IMPORTANTE) return '#52525B'
  } else {
    if (props.status === enums.Status.PENDENTE) return '#52525B'
    if (props.status === enums.Status.CONCLUIDA) return '#A1A1AA'
  }
  return '#A1A1AA'
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Card = styled.div`
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 6px;
  transition: background-color 0.15s, border-color 0.15s;
  animation: ${fadeInUp} 0.25s ease-out;
  position: relative;
`

export const DragHandle = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  cursor: grab;
  color: var(--color-text-muted);
  font-size: 18px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0.4;
  transition: opacity 0.15s;
  touch-action: none;

  &:hover {
    opacity: 1;
  }

  &:active {
    cursor: grabbing;
  }
`

export const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
`

export const Prazo = styled.span<{ atrasada: boolean }>`
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  border-radius: 4px;
  display: inline-block;
  background-color: ${({ atrasada }) =>
    atrasada ? 'var(--color-danger)' : 'var(--color-border)'};
  color: ${({ atrasada }) => (atrasada ? '#fff' : 'var(--color-text-muted)')};
`

export const Titulo = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
`

export const Tag = styled.span<TagProps>`
  padding: 3px 8px;
  color: #fff;
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background-color: ${(props) => retornaCorDeFundo(props)};
  border-radius: 4px;
  display: inline-block;
`

export const PontosTag = styled.span`
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 800;
  border-radius: 4px;
  display: inline-block;
  background-color: #3b82f6;
  color: #fff;
  letter-spacing: 0.04em;
`

export const SprintTag = styled.span`
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  display: inline-block;
  background-color: var(--color-border);
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
  border: 1px solid var(--color-accent);
`

export const Descricao = styled.textarea`
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.6;
  font-family: inherit;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 12px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const Botao = styled.button`
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text);
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  background-color: transparent;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background-color: var(--color-border);
  }
`

export const BotaoSalvar = styled(Botao)`
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;

  &:hover {
    background-color: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }
`

export const BotaoCancelarRemover = styled(Botao)`
  border-color: var(--color-danger);
  color: var(--color-danger);

  &:hover {
    background-color: var(--color-danger);
    color: #fff;
  }
`

export const ConfirmacaoRemover = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);

  span {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-right: 4px;
  }
`
