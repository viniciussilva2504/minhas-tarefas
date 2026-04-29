import type { Meta, StoryObj } from '@storybook/react'
import FiltroCard from '../components/FiltroCard'

const meta: Meta<typeof FiltroCard> = {
  title: 'Components/FiltroCard',
  component: FiltroCard,
  tags: ['autodocs'],
  args: {
    contador: 5,
    legenda: 'Pendentes',
    ativo: false
  }
}

export default meta
type Story = StoryObj<typeof FiltroCard>

export const Inativo: Story = {}

export const Ativo: Story = {
  args: {
    ativo: true
  }
}

export const ZeroItens: Story = {
  args: {
    contador: 0,
    legenda: 'Concluídas'
  }
}

export const MuitosItens: Story = {
  args: {
    contador: 42,
    legenda: 'Todas',
    ativo: true
  }
}
