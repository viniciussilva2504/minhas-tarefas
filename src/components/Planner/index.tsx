import { useState, useEffect } from 'react'
import {
  salvarDadosPorData,
  carregarDadosPorData
} from '../../services/localStorageService'
import * as S from './styles'
const diasSemanaAbrev = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

const diasSemanaNomes = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

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

const horariosPlanner = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00'
]

type TodoPlanner = {
  id: number
  texto: string
  concluido: boolean
}

type HabitItem = {
  id: number
  nome: string
  dias: boolean[] // 7 dias da semana
}

interface PlannerProps {
  diaSelecionado: Date
}

const Planner = ({ diaSelecionado }: PlannerProps) => {
  const hoje = diaSelecionado

  // Carregar dados do localStorage ao trocar de dia
  const [plannerItems, setPlannerItems] = useState<Record<string, string>>({})
  const [todos, setTodos] = useState<TodoPlanner[]>([])
  const [habits, setHabits] = useState<HabitItem[]>([])

  useEffect(() => {
    const valorPadrao = {
      plannerItems: (() => {
        const items: Record<string, string> = {}
        horariosPlanner.forEach((h) => (items[h] = ''))
        return items
      })(),
      todos: [
        {
          id: 1,
          texto: '',
          concluido: false
        },
        {
          id: 2,
          texto: '',
          concluido: false
        },
        {
          id: 3,
          texto: '',
          concluido: false
        }
      ],
      habits: [
        {
          id: 1,
          nome: '',
          dias: [false, false, false, false, false, false, false]
        },
        {
          id: 2,
          nome: '',
          dias: [false, false, false, false, false, false, false]
        },
        {
          id: 3,
          nome: '',
          dias: [false, false, false, false, false, false, false]
        }
      ]
    }
    const dados = carregarDadosPorData(diaSelecionado, valorPadrao)
    setPlannerItems(dados.plannerItems)
    setTodos(dados.todos)
    setHabits(dados.habits)
  }, [diaSelecionado])

  useEffect(() => {
    salvarDadosPorData(diaSelecionado, { plannerItems, todos, habits })
  }, [plannerItems, todos, habits, diaSelecionado])

  const atualizarPlanner = (hora: string, valor: string) => {
    setPlannerItems((prev) => ({ ...prev, [hora]: valor }))
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluido: !t.concluido } : t))
    )
  }

  const atualizarTodoTexto = (id: number, texto: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, texto } : t)))
  }

  const adicionarTodo = () => {
    const novoId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1
    setTodos([...todos, { id: novoId, texto: '', concluido: false }])
  }

  const toggleHabitDia = (habitId: number, diaIndex: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const novosDias = [...h.dias]
          novosDias[diaIndex] = !novosDias[diaIndex]
          return { ...h, dias: novosDias }
        }
        return h
      })
    )
  }

  const atualizarHabitNome = (id: number, nome: string) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, nome } : h)))
  }

  const adicionarHabit = () => {
    const novoId =
      habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1
    setHabits([
      ...habits,
      {
        id: novoId,
        nome: '',
        dias: [false, false, false, false, false, false, false]
      }
    ])
  }

  return (
    <S.PlannerContainer>
      {/* Data atual */}
      <S.Secao>
        <S.DataAtual>
          <div className="dia-numero">{hoje.getDate()}</div>
          <div className="dia-semana">{diasSemanaNomes[hoje.getDay()]}</div>
          <div className="mes-ano">
            {meses[hoje.getMonth()]} {hoje.getFullYear()}
          </div>
        </S.DataAtual>
      </S.Secao>

      {/* Planner diÃ¡rio */}
      <S.Secao>
        <S.TituloSecao>Planner do Dia</S.TituloSecao>
        {horariosPlanner.map((hora) => (
          <S.HorarioItem key={hora}>
            <S.Hora>{hora}</S.Hora>
            <S.InputPlanner
              value={plannerItems[hora]}
              onChange={(e) => atualizarPlanner(hora, e.target.value)}
              placeholder="..."
            />
          </S.HorarioItem>
        ))}
      </S.Secao>

      {/* Lista de tarefas */}
      <S.Secao>
        <S.TituloSecao>Tarefas do Dia</S.TituloSecao>
        {todos.map((todo) => (
          <S.TodoItem key={todo.id}>
            <S.Checkbox
              type="checkbox"
              checked={todo.concluido}
              onChange={() => toggleTodo(todo.id)}
            />
            <S.TodoTexto
              concluido={todo.concluido}
              value={todo.texto}
              onChange={(e) => atualizarTodoTexto(todo.id, e.target.value)}
              placeholder="Nova tarefa..."
            />
          </S.TodoItem>
        ))}
        <S.BotaoAdicionar onClick={adicionarTodo}>+ Adicionar</S.BotaoAdicionar>
      </S.Secao>

      {/* Habit Tracker */}
      <S.Secao>
        <S.TituloSecao>Habit Tracker</S.TituloSecao>
        <S.HabitRow>
          <S.HabitNome as="span" style={{ color: 'transparent' }}>
            .
          </S.HabitNome>
          <S.HabitDiasHeader>
            {diasSemanaAbrev.map((dia) => (
              <S.DiaSemanaLabel key={dia}>{dia}</S.DiaSemanaLabel>
            ))}
          </S.HabitDiasHeader>
        </S.HabitRow>
        {habits.map((habit) => (
          <S.HabitRow key={habit.id}>
            <S.HabitNome
              value={habit.nome}
              onChange={(e) => atualizarHabitNome(habit.id, e.target.value)}
              placeholder="Hábito"
            />
            <S.HabitDiasHeader>
              {habit.dias.map((marcado, index) => (
                <S.HabitCheck
                  key={index}
                  marcado={marcado}
                  onClick={() => toggleHabitDia(habit.id, index)}
                >
                  {marcado ? 'âœ“' : ''}
                </S.HabitCheck>
              ))}
            </S.HabitDiasHeader>
          </S.HabitRow>
        ))}
        <S.BotaoAdicionar onClick={adicionarHabit}>
          + Adicionar hÃ¡bito
        </S.BotaoAdicionar>
      </S.Secao>
    </S.PlannerContainer>
  )
}

export default Planner
