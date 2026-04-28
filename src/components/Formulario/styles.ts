import styled from 'styled-components'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: var(--color-text-label);
  margin-left: 10px;

  textarea {
    resize: none;
    margin: 16px 0;
  }
`

export const Titulo = styled.h2`
  display: block;
  margin-bottom: 10px;
  padding-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text-muted);
`

export const Campo = styled.input`
  padding: 8px;
  background-color: var(--color-input-bg);
  border-radius: 8px;
  font-weight: bold;
  color: var(--color-text-label);
  border: 1px solid var(--color-border);
  margin-bottom: 16px;
  width: 100%;

  &:focus {
    outline: 2px solid #1e90ff;
    outline-offset: 1px;
  }
`

export const BotaoSalvar = styled.button`
  background-color: #2f3640;
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  border: none;
`

export const MensagemErro = styled.p`
  color: #c23616;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
`

export const Opcoes = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 6px;
  }

  label {
    margin-right: 6px;
  }
`

export const Opcao = styled.div`
  display: inline;
  text-transform: capitalize;
`
