import { Component, ErrorInfo, ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  text-align: center;
`

const Titulo = styled.h2`
  color: #c23616;
  margin-bottom: 8px;
  font-size: 22px;
`

const Mensagem = styled.p`
  color: var(--color-text-muted);
  margin-bottom: 16px;
`

const Botao = styled.button`
  background-color: #2f3640;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
`

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Titulo>Algo deu errado</Titulo>
          <Mensagem>Ocorreu um erro inesperado na aplicação.</Mensagem>
          <Botao onClick={() => window.location.reload()}>Recarregar</Botao>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
