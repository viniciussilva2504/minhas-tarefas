import styled from 'styled-components'

export const Container = styled.div`
  padding: 24px 20px;
  max-width: 1100px;
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
  margin-bottom: 12px;
`

export const Meta = styled.p`
  font-size: 13px;
  color: var(--color-text);
  font-style: italic;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: var(--color-input-bg);
  border-left: 3px solid var(--color-accent);
  border-radius: 4px;
`

export const Metricas = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`

export const MetricaCard = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 12px 20px;
  text-align: center;
  min-width: 110px;
`

export const MetricaValor = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: var(--color-accent);
`

export const MetricaLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-top: 4px;
`

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 400px;
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  margin-bottom: 28px;
  overflow: hidden;
`

export const ProgressFill = styled.div<{ percentual: number }>`
  height: 100%;
  width: ${({ percentual }) => percentual}%;
  background: var(--color-accent);
  border-radius: 3px;
  transition: width 0.4s ease;
`

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const Coluna = styled.div`
  background: var(--color-sidebar);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  min-height: 200px;
`

export const ColunaTitulo = styled.h3`
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ColunaBadge = styled.span`
  background: var(--color-border);
  color: var(--color-text-muted);
  border-radius: 10px;
  padding: 1px 8px;
  font-size: 11px;
  font-weight: 700;
`

export const TarefaCard = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
  transition: border-color 0.15s;

  &:hover {
    border-color: var(--color-accent);
  }
`

export const TarefaTitulo = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
`

export const TarefaTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
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
  letter-spacing: 0.04em;
`

export const BotoesAcao = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
`

export const BotaoMover = styled.button<{ destaque?: boolean }>`
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  background: ${({ destaque }) =>
    destaque ? 'var(--color-accent)' : 'var(--color-input-bg)'};
  color: ${({ destaque }) => (destaque ? '#fff' : 'var(--color-text)')};
  transition: all 0.15s;

  &:hover {
    border-color: var(--color-accent);
  }
`

export const EstadoVazio = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 24px;
`

export const AlertaSemSprint = styled.div`
  padding: 20px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 14px;
  margin-top: 20px;

  p {
    margin-bottom: 12px;
  }
`

export const BotaoPrimario = styled.button`
  background-color: var(--color-accent);
  border-radius: 4px;
  padding: 8px 16px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  border: none;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-accent-hover);
  }
`
