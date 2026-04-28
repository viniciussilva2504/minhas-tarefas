import styled from 'styled-components'

export const Container = styled.main`
  padding: 24px 40px;
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const Mensagem = styled.p`
  text-align: center;
  margin-top: 5px;
  font-size: 13px;
  color: var(--color-text-muted);
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  color: var(--color-text-muted);
  text-align: center;

  svg {
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }

  span {
    font-size: 13px;
    margin-top: 4px;
  }
`
