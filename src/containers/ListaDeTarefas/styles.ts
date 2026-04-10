import styled from 'styled-components'

export const Container = styled.main`
  padding: 0 40px;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 900px) {
    padding: 16px 4vw;
    height: auto;
    min-height: 60vh;
  }
`

export const Mensagem = styled.p`
  text-align: center;
  margin-top: 5px;
`
