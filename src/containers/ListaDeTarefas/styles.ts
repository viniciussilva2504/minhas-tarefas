import styled from 'styled-components'

export const Container = styled.main`
  padding: 32px 40px;
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`

export const BannerOffline = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-muted);
  border-left: 2px solid var(--color-accent);
  padding: 6px 12px;
  margin-bottom: 20px;
  font-style: italic;
`

export const Mensagem = styled.p`
  margin-bottom: 24px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 0 0;
  color: var(--color-text-muted);

  p {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--color-text);
    line-height: 1.2;
    margin-bottom: 8px;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-muted);
  }
`
