import styled from 'styled-components'

export const Form = styled.form`
  max-width: 540px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-label);
  margin-left: 10px;

  textarea {
    resize: none;
    margin: 16px 0;
  }
`

export const Titulo = styled.h2`
  display: block;
  margin-bottom: 20px;
  padding-top: 16px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
`

export const Campo = styled.input`
  padding: 10px 12px;
  background-color: var(--color-input-bg);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  margin-bottom: 12px;
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

export const BotaoSalvar = styled.button`
  background-color: var(--color-accent);
  border-radius: 4px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  border: none;
  transition: background-color 0.15s;

  &:hover {
    background-color: var(--color-accent-hover);
  }
`

export const MensagemErro = styled.p`
  color: var(--color-danger);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
`

export const Opcoes = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-muted);
  }

  label {
    margin-right: 6px;
  }
`

export const Opcao = styled.div`
  display: inline;
  text-transform: capitalize;
`
