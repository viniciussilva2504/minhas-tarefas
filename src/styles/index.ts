import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  :root {
    --color-bg: #f5f5f5;
    --color-sidebar: #e8e8e8;
    --color-card: #fcfcfc;
    --color-text: #333;
    --color-text-muted: #8b8b8b;
    --color-text-label: #666;
    --color-border: #d0d0d0;
    --color-input-bg: #fff;
    --color-shadow: rgba(0, 0, 0, 0.25);
  }

  [data-theme='dark'] {
    --color-bg: #12121f;
    --color-sidebar: #1a1a2e;
    --color-card: #1e1e30;
    --color-text: #e2e2e2;
    --color-text-muted: #9a9a9a;
    --color-text-label: #bbb;
    --color-border: #383850;
    --color-input-bg: #252538;
    --color-shadow: rgba(0, 0, 0, 0.6);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    list-style: none;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    transition: background-color 0.2s, color 0.2s;
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
