import styled from 'styled-components'
import { Props } from '.'

type PropsSemLegendaEContados = Omit<Props, 'contador' | 'legenda' | 'criterio'>

export const Card = styled.div<PropsSemLegendaEContados>`
  padding: 4px 8px;
  border: 1px solid
    ${(props) => (props.ativo ? 'var(--color-accent)' : 'var(--color-text)')};
  background-color: var(--color-bg);
  color: ${(props) =>
    props.ativo ? 'var(--color-accent)' : 'var(--color-text)'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not([data-ativo='true']) {
    opacity: 0.7;
  }
`

export const Contador = styled.span`
  font-weight: 700;
  font-size: 14px;
  display: block;
  line-height: 1.2;
`

export const Label = styled.span`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`
