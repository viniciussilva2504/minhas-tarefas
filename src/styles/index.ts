import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  list-style: none;
}
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
`

export const BotaoAdicionar = styled.button`
  height: 64px;
  position: fixed;
  top: 80px;
  right: 40px;
  background-color: #44bd32;
  border-radius: 50px;
  padding: 0 16px;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border: none;
  cursor: pointer;
`

export default EstiloGlobal
