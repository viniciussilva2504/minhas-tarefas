import styled from 'styled-components'

export const PlannerContainer = styled.aside`
  padding: 16px;
  background-color: #f5f5f5;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Secao = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

export const TituloSecao = styled.h3`
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
`

export const DataAtual = styled.div`
  text-align: center;

  .dia-numero {
    font-size: 32px;
    font-weight: bold;
    color: #44bd32;
    line-height: 1.2;
  }

  .dia-semana {
    font-size: 13px;
    color: #666;
    text-transform: capitalize;
    font-weight: 500;
  }

  .mes-ano {
    font-size: 11px;
    color: #999;
    text-transform: capitalize;
  }
`

export const HorarioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`

export const Hora = styled.span`
  font-size: 10px;
  color: #999;
  min-width: 36px;
  font-weight: 500;
`

export const InputPlanner = styled.input`
  border: none;
  outline: none;
  font-size: 11px;
  color: #555;
  width: 100%;
  background: transparent;
  padding: 2px 0;

  &::placeholder {
    color: #ccc;
  }
`

export const TodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
`

export const Checkbox = styled.input`
  accent-color: #44bd32;
  cursor: pointer;
`

export const TodoTexto = styled.input<{ concluido?: boolean }>`
  border: none;
  outline: none;
  font-size: 11px;
  color: ${(props) => (props.concluido ? '#bbb' : '#555')};
  text-decoration: ${(props) => (props.concluido ? 'line-through' : 'none')};
  width: 100%;
  background: transparent;
  padding: 2px 0;

  &::placeholder {
    color: #ccc;
  }
`

export const BotaoAdicionar = styled.button`
  background: none;
  border: 1px dashed #ccc;
  border-radius: 4px;
  padding: 4px;
  color: #aaa;
  font-size: 11px;
  cursor: pointer;
  width: 100%;
  margin-top: 4px;
  transition: all 0.2s;

  &:hover {
    border-color: #44bd32;
    color: #44bd32;
  }
`

export const HabitRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 0;
`

export const HabitNome = styled.input`
  border: none;
  outline: none;
  font-size: 10px;
  color: #555;
  min-width: 50px;
  max-width: 60px;
  background: transparent;
  padding: 2px 0;

  &::placeholder {
    color: #ccc;
    font-size: 9px;
  }
`

export const HabitCheck = styled.div<{ marcado: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1.5px solid ${(props) => (props.marcado ? '#44bd32' : '#ddd')};
  background-color: ${(props) => (props.marcado ? '#44bd32' : 'transparent')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  color: #fff;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: #44bd32;
  }
`

export const DiaSemanaLabel = styled.span`
  font-size: 8px;
  color: #aaa;
  text-align: center;
  width: 16px;
  flex-shrink: 0;
`

export const HabitDiasHeader = styled.div`
  display: flex;
  gap: 4px;
  margin-left: auto;
  align-items: center;
`
