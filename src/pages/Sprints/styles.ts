import styled from 'styled-components'

export const Container = styled.div`
  padding: 24px 20px;
  max-width: 700px;
`

export const Titulo = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 24px;
`

export const SprintCard = styled.div<{ status: string }>`
  background: var(--color-card);
  border: 1px solid
    ${({ status }) =>
      status === 'ativo'
        ? 'var(--color-accent)'
        : 'var(--color-border)'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`

export const SprintNome = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
`

export const SprintMeta = styled.p`
  font-size: 12px;
  color: var(--color-text-muted);
  font-style: italic;
  margin-bottom: 8px;
`

export const SprintInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

export const Badge = styled.span<{ cor: string }>`
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${({ cor }) => cor};
  color: #fff;
`

export const SprintDatas = styled.span`
  font-size: 11px;
  color: var(--color-text-muted);
`

export const VelocidadeTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #3b82f6;
`

export const BotoesAcao = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const Botao = styled.button<{ variante?: 'primario' | 'perigo' | 'neutro' }>`
  font-size: 11px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 4px;
  border: 1px solid
    ${({ variante }) =>
      variante === 'perigo'
        ? 'var(--color-danger)'
        : variante === 'primario'
        ? 'var(--color-accent)'
        : 'var(--color-border)'};
  cursor: pointer;
  background: ${({ variante }) =>
    variante === 'primario'
      ? 'var(--color-accent)'
      : variante === 'perigo'
      ? 'var(--color-danger)'
      : 'var(--color-input-bg)'};
  color: ${({ variante }) =>
    variante === 'primario' || variante === 'perigo'
      ? '#fff'
      : 'var(--color-text)'};
  transition: all 0.15s;

  &:hover {
    opacity: 0.85;
  }
`

export const Separador = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 24px 0;
`

export const FormSprint = styled.form`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
`

export const FormTitulo = styled.h3`
  font-size: 14px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`

export const Campo = styled.input`
  padding: 9px 12px;
  background-color: var(--color-input-bg);
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  margin-bottom: 10px;
  width: 100%;

  &::placeholder {
    color: var(--color-text-muted);
    font-weight: 400;
  }

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 0;
    border-color: transparent;
  }
`

export const DatasRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`

export const BotaoSalvar = styled.button`
  background-color: var(--color-accent);
  border-radius: 4px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  border: none;
  margin-top: 4px;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-accent-hover);
  }
`

export const EstadoVazio = styled.div`
  padding: 24px;
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 13px;
  margin-bottom: 24px;
`
