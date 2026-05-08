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
  errorMessage?: string
  errorStack?: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
      errorStack: error.stack
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('=== ErrorBoundary ====================================')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    console.error('Component stack:', info.componentStack)
    console.error('=====================================================')
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Titulo>Algo deu errado</Titulo>
          <Mensagem>{this.state.errorMessage ?? 'Erro desconhecido.'}</Mensagem>
          {this.state.errorStack && (
            <pre
              style={{
                background: '#1a1a2e',
                color: '#e94560',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '11px',
                textAlign: 'left',
                overflowX: 'auto',
                maxWidth: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                marginBottom: '12px'
              }}
            >
              {this.state.errorStack}
            </pre>
          )}
          <Botao onClick={() => window.location.reload()}>Recarregar</Botao>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
