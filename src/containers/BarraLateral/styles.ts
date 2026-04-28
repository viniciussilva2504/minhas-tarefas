import styled from 'styled-components'

export const Aside = styled.aside`
  padding: 16px;
  background-color: var(--color-sidebar);
  min-height: 100vh;
  transition: background-color 0.2s;

  @media (max-width: 768px) {
    min-height: auto;
    position: sticky;
    top: 0;
    z-index: 10;
  }
`

export const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const TituloApp = styled.h1`
  font-size: 15px;
  font-weight: bold;
  color: var(--color-text);
`

export const BotaoTema = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  color: var(--color-text);
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-border);
  }
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;
`

export const Campo = styled.input`
  padding: 8px;
  background-color: var(--color-input-bg);
  border-radius: 8px;
  font-weight: bold;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  width: 100%;

  &:focus {
    outline: 2px solid #1e90ff;
    outline-offset: 1px;
  }
`

export const SelectOrdenacao = styled.select`
  margin-top: 12px;
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-input-bg);
  color: var(--color-text);
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;

  &:focus {
    outline: 2px solid #1e90ff;
    outline-offset: 1px;
  }
`

export const BotaoAdicionar = styled.button`
  padding: 12px 16px;
  margin-top: 16px;
  background-color: #44bd32;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d8d1b;
  }

  &:focus-visible {
    outline: 2px solid #1e90ff;
    outline-offset: 2px;
  }
`
