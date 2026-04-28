import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  :root {
    --color-bg: #ffffff;
    --color-sidebar: #f5f5f5;
    --color-card: #ffffff;
    --color-text: #0a0a0a;
    --color-text-muted: #6b6b6b;
    --color-text-label: #0a0a0a;
    --color-border: #e5e5e5;
    --color-input-bg: #ffffff;
    --color-shadow: rgba(0, 0, 0, 0.04);
    --color-accent: #ff5f1f;
    --color-accent-hover: #e04e0e;
    --color-danger: #d72638;
  }

  [data-theme='dark'] {
    --color-bg: #131c2b;
    --color-sidebar: #0f1722;
    --color-card: #1a2535;
    --color-text: #e8f1ff;
    --color-text-muted: #7a9dbf;
    --color-text-label: #c8dff0;
    --color-border: #253652;
    --color-input-bg: #0f1722;
    --color-shadow: rgba(0, 0, 0, 0.5);
    --color-accent: #ff5f1f;
    --color-accent-hover: #e04e0e;
    --color-danger: #d72638;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif;
    list-style: none;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-size: 16px;
    line-height: 1.6;
    transition: background-color 0.15s, color 0.15s;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`

export default EstiloGlobal
