import { renderHook, act } from '@testing-library/react'
import { useCalendario } from '../hooks/useCalendario'

describe('useCalendario', () => {
  it('deve inicializar com o mês e ano corretos', () => {
    const data = new Date(2022, 5, 15)
    const { result } = renderHook(() => useCalendario(data))
    expect(result.current.mesAtual).toBe(5)
    expect(result.current.anoAtual).toBe(2022)
    expect(result.current.diaSelecionado.getDate()).toBe(15)
  })

  it('deve avançar e retroceder mês corretamente', () => {
    const data = new Date(2022, 0, 1)
    const { result } = renderHook(() => useCalendario(data))
    act(() => {
      result.current.irParaProximoMes()
    })
    expect(result.current.mesAtual).toBe(1)
    act(() => {
      result.current.irParaMesAnterior()
    })
    expect(result.current.mesAtual).toBe(0)
  })

  it('deve alterar o dia selecionado', () => {
    const data = new Date(2022, 5, 15)
    const { result } = renderHook(() => useCalendario(data))
    act(() => {
      result.current.setDiaSelecionado(new Date(2022, 5, 20))
    })
    expect(result.current.diaSelecionado.getDate()).toBe(20)
  })
})
