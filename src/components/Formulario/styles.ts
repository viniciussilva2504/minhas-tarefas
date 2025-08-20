import styled from 'styled-components'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: #666;
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
  color: #999;
`

export const Campo = styled.input`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  font-weight: bold;
  color: #666;
  border: 1px solid #666;
  margin-bottom: 16px;
  width: 100%;
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
