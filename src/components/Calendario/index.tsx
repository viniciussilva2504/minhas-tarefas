import { useState } from 'react'
import * as S from './styles'

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'SÃ¡b']

const meses = [
  'Janeiro',
  'Fevereiro',
  'MarÃ§o',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const Calendario = () => {
  const hoje = new Date()
  const [mesAtual, setMesAtual] = useState(hoje.getMonth())
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear())

  const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay()
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate()
  const diasNoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate()

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
  }

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
  }

  const renderizarDias = () => {
    const dias = []

    // Dias do mÃªs anterior
    for (let i = primeiroDiaDoMes - 1; i >= 0; i--) {
      dias.push(
        <S.Dia key={`prev-${i}`} foraDoMes>
          {diasNoMesAnterior - i}
        </S.Dia>
      )
    }

    // Dias do mÃªs atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const eHoje =
        dia === hoje.getDate() &&
        mesAtual === hoje.getMonth() &&
        anoAtual === hoje.getFullYear()

      dias.push(
        <S.Dia key={`cur-${dia}`} hoje={eHoje}>
          {dia}
        </S.Dia>
      )
    }

    // Dias do prÃ³ximo mÃªs para completar a grade
    const totalCells = dias.length
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
    for (let i = 1; i <= remaining; i++) {
      dias.push(
        <S.Dia key={`next-${i}`} foraDoMes>
          {i}
        </S.Dia>
      )
    }

    return dias
  }

  return (
    <S.CalendarioContainer>
      <S.Header>
        <S.BotaoNav onClick={mesAnterior}>â—€</S.BotaoNav>
        <S.MesAno>
          {meses[mesAtual]} {anoAtual}
        </S.MesAno>
        <S.BotaoNav onClick={proximoMes}>â–¶</S.BotaoNav>
      </S.Header>
      <S.GradeDias>
        {diasSemana.map((dia) => (
          <S.DiaSemana key={dia}>{dia}</S.DiaSemana>
        ))}
        {renderizarDias()}
      </S.GradeDias>
    </S.CalendarioContainer>
  )
}

export default Calendario
