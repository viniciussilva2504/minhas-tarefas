import { useCalendario } from '../../hooks/useCalendario'
import * as S from './styles'
const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

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

interface CalendarioProps {
  onDiaSelecionado?: (data: Date) => void
  diaSelecionado?: Date
}

const Calendario = ({ onDiaSelecionado, diaSelecionado }: CalendarioProps) => {
  const {
    mesAtual,
    anoAtual,
    diaSelecionado: diaSel,
    setDiaSelecionado,
    irParaMesAnterior,
    irParaProximoMes
  } = useCalendario(diaSelecionado)

  const hoje = new Date()
  const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay()
  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate()
  const diasNoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate()

  const renderizarDias = () => {
    const dias = []

    // Dias do mês anterior
    for (let i = primeiroDiaDoMes - 1; i >= 0; i--) {
      const diaNum = diasNoMesAnterior - i
      const data = new Date(anoAtual, mesAtual - 1, diaNum)
      dias.push(
        <S.Dia
          key={`prev-${i}`}
          foraDoMes
          selecionado={diaSel && data.toDateString() === diaSel.toDateString()}
          onClick={() => {
            setDiaSelecionado(data)
            onDiaSelecionado && onDiaSelecionado(data)
          }}
        >
          {diaNum}
        </S.Dia>
      )
    }

    // Dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
      const data = new Date(anoAtual, mesAtual, dia)
      const eHoje =
        dia === hoje.getDate() &&
        mesAtual === hoje.getMonth() &&
        anoAtual === hoje.getFullYear()
      const selecionado =
        diaSel && data.toDateString() === diaSel.toDateString()
      dias.push(
        <S.Dia
          key={`cur-${dia}`}
          hoje={eHoje}
          selecionado={selecionado}
          onClick={() => {
            setDiaSelecionado(data)
            onDiaSelecionado && onDiaSelecionado(data)
          }}
        >
          {dia}
        </S.Dia>
      )
    }

    // Dias do próximo mês para completar a grade
    const totalCells = dias.length
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
    for (let i = 1; i <= remaining; i++) {
      const data = new Date(anoAtual, mesAtual + 1, i)
      dias.push(
        <S.Dia
          key={`next-${i}`}
          foraDoMes
          selecionado={diaSel && data.toDateString() === diaSel.toDateString()}
          onClick={() => {
            setDiaSelecionado(data)
            onDiaSelecionado && onDiaSelecionado(data)
          }}
        >
          {i}
        </S.Dia>
      )
    }

    return dias
  }

  return (
    <S.CalendarioContainer>
      <S.Header>
        <S.BotaoNav onClick={irParaMesAnterior}>←</S.BotaoNav>
        <S.MesAno>
          {meses[mesAtual]} {anoAtual}
        </S.MesAno>
        <S.BotaoNav onClick={irParaProximoMes}>→</S.BotaoNav>
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
