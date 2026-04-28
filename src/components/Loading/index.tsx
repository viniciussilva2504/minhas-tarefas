import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-bg);
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #1e90ff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`

const Loading = () => (
  <Wrapper role="status" aria-label="Carregando">
    <Spinner />
  </Wrapper>
)

export default Loading
