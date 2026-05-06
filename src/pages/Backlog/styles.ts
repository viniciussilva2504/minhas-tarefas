import styled from 'styled-components'

export const Container = styled.div`
  padding: 24px 20px;
  max-width: 760px;
`

export const Cabecalho = styled.div`
  margin-bottom: 24px;
`

export const Titulo = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 4px;
`

export const Subtitulo = styled.p`
  font-size: 13px;
  color: var(--color-text-muted);
`

export const TarefaItem = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 14px 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  transition: border-color 0.15s;

  &:hover {
    border-color: var(--color-accent);
  }
`

export const TarefaInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const TarefaTitulo = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

export const Tag = styled.span<{ cor?: string }>`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 7px;
  border-radius: 3px;
  color: #fff;
  background: ${({ cor }) => cor ?? 'var(--color-border)'};
`

export const PontosTag = styled.span`
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 3px;
  background: #3b82f6;
  color: #fff;
`

export const BotoesAcao = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

export const Select = styled.select`
  padding: 5px 8px;
  font-size: 12px;
  background: var(--color-input-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 0;
  }
`

export const BotaoAtribuir = styled.button`
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: var(--color-accent);
  color: #fff;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-accent-hover);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const EstadoVazio = styled.div`
  padding: 40px 20px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
`
