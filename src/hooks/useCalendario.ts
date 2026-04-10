import { useState } from 'react'

export interface CalendarioState {
  mesAtual: number
  anoAtual: number
  diaSelecionado: Date
  setMesAtual: (mes: number) => void
  setAnoAtual: (ano: number) => void
  setDiaSelecionado: (data: Date) => void
  irParaMesAnterior: () => void
  irParaProximoMes: () => void
}

export function useCalendario(diaInicial?: Date): CalendarioState {
  const hoje = new Date()
  const [mesAtual, setMesAtual] = useState((diaInicial || hoje).getMonth())
  const [anoAtual, setAnoAtual] = useState((diaInicial || hoje).getFullYear())
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(diaInicial || hoje)

  const irParaMesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
  }

  const irParaProximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
  }

  return {
    mesAtual,
    anoAtual,
    diaSelecionado,
    setMesAtual,
    setAnoAtual,
    setDiaSelecionado,
    irParaMesAnterior,
    irParaProximoMes
  }
}
