import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  it('deve retornar valor inicial se não houver no localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('chave-teste', 'valor'))
    expect(result.current[0]).toBe('valor')
  })

  it('deve salvar e recuperar valor', () => {
    const { result } = renderHook(() => useLocalStorage('chave-teste', 'valor'))
    act(() => {
      result.current[1]('novo')
    })
    expect(result.current[0]).toBe('novo')
    expect(window.localStorage.getItem('chave-teste')).toBe(
      JSON.stringify('novo')
    )
  })
})
