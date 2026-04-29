import styled from 'styled-components'

export const Aside = styled.aside`
  padding: 20px 16px;
  background-color: var(--color-sidebar);
  border-right: 1px solid var(--color-border);
  min-height: 100vh;
  transition: background-color 0.15s;

  @media (max-width: 768px) {
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
  }
`

export const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const TopoAcoes = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const TituloApp = styled.h1`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
`

export const BotaoTema = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  cursor: pointer;
  line-height: 1;
  color: var(--color-text);
  transition: all 0.15s;

  &:hover {
    border-color: var(--color-text-muted);
  }
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 6px;
  margin-top: 16px;
`

export const Campo = styled.input`
  padding: 8px 10px;
  background-color: var(--color-input-bg);
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  width: 100%;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 0;
    border-color: transparent;
  }
`

export const SelectOrdenacao = styled.select`
  margin-top: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-input-bg);
  color: var(--color-text);
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 0;
  }
`

export const BotaoAdicionar = styled.button`
  padding: 10px 16px;
  margin-top: 14px;
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.03em;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-accent-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`

export const BotaoNav = styled.button`
  padding: 8px 10px;
  margin-top: 8px;
  background: none;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.15s;

  &:hover {
    color: var(--color-text);
    border-color: var(--color-text-muted);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`
