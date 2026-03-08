import styled from 'styled-components'

export const CalendarioContainer = styled.div`
  margin-top: 16px;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const MesAno = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #333;
  text-transform: capitalize;
`

export const BotaoNav = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eee;
  }
`

export const GradeDias = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  text-align: center;
`

export const DiaSemana = styled.span`
  font-size: 9px;
  font-weight: bold;
  color: #999;
  padding: 2px 0;
`

export const Dia = styled.span<{ hoje?: boolean; foraDoMes?: boolean }>`
  font-size: 10px;
  padding: 3px 0;
  border-radius: 50%;
  color: ${(props) =>
    props.foraDoMes ? '#ccc' : props.hoje ? '#fff' : '#555'};
  background-color: ${(props) => (props.hoje ? '#44bd32' : 'transparent')};
  font-weight: ${(props) => (props.hoje ? 'bold' : 'normal')};
  cursor: default;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`
