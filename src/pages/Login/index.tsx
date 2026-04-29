import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg);
  gap: 24px;
`

const Titulo = styled.h1`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--color-text);
`

const Subtitulo = styled.p`
  font-size: 14px;
  color: var(--color-text-muted);
  margin-top: -16px;
`

const BotaoGoogle = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-card);
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: var(--color-text-muted);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
)

const ErroLogin = styled.p`
  font-size: 13px;
  color: #d72638;
  background: rgba(215, 38, 56, 0.08);
  border: 1px solid rgba(215, 38, 56, 0.3);
  border-radius: 4px;
  padding: 8px 14px;
  max-width: 320px;
  text-align: center;
  line-height: 1.5;
`

const Login = () => {
  const { user, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const handleLogin = async () => {
    setErro(null)
    setCarregando(true)
    try {
      await signInWithGoogle()
    } catch (e: unknown) {
      const code = (e as { code?: string }).code ?? ''
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        // utilizador fechou a popup — sem mensagem de erro
      } else if (code === 'auth/unauthorized-domain') {
        setErro('Domínio não autorizado no Firebase. Adicione este domínio em Firebase Console → Authentication → Authorized domains.')
      } else if (code === 'auth/popup-blocked') {
        setErro('A popup foi bloqueada pelo browser. Permita popups para este site e tente novamente.')
      } else {
        setErro(`Erro ao autenticar: ${code || 'desconhecido'}`)
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Wrapper>
      <Titulo>Minhas Tarefas</Titulo>
      <Subtitulo>Entre para acessar suas tarefas</Subtitulo>
      <BotaoGoogle onClick={handleLogin} disabled={carregando}>
        <GoogleIcon />
        {carregando ? 'A autenticar...' : 'Entrar com Google'}
      </BotaoGoogle>
      {erro && <ErroLogin>{erro}</ErroLogin>}
    </Wrapper>
  )
}

export default Login
