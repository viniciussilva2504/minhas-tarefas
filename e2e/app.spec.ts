import { test, expect, Page } from '@playwright/test'

/**
 * Injeta um utilizador mock no localStorage para simular sessão Firebase
 * sem passar pelo fluxo OAuth real.
 */
async function mockAuthState(page: Page) {
  await page.addInitScript(() => {
    // Simula o persist do redux-persist com tarefas de teste
    const reduxState = {
      tarefas: {
        itens: [
          {
            id: 1,
            titulo: 'Tarefa E2E Teste',
            descricao: 'Criada pelo Playwright',
            prioridade: 'URGENTE',
            status: 'PENDENTE'
          },
          {
            id: 2,
            titulo: 'Tarefa Concluída',
            descricao: 'Já terminei',
            prioridade: 'NORMAL',
            status: 'CONCLUIDA'
          }
        ],
        erro: null
      },
      filtros: {
        termo: '',
        criterio: 'todas',
        valor: undefined,
        ordenacao: 'padrao'
      }
    }
    localStorage.setItem(
      'persist:root',
      JSON.stringify({
        tarefas: JSON.stringify(reduxState.tarefas),
        filtros: JSON.stringify(reduxState.filtros),
        _persist: JSON.stringify({ version: -1, rehydrated: true })
      })
    )

    // Mock Firebase Auth — simula user já autenticado
    const fakeUser = {
      uid: 'test-uid-e2e',
      email: 'test@playwright.dev',
      displayName: 'Playwright Test'
    }
    localStorage.setItem(
      'firebase:authUser:minhas-tarefas-1b9f2:[DEFAULT]',
      JSON.stringify(fakeUser)
    )
  })
}

test.describe('Página de Login', () => {
  test('exibe botão de login com Google', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Entrar com Google')).toBeVisible()
    await expect(page.getByText('Minhas Tarefas')).toBeVisible()
  })
})

test.describe('Lista de Tarefas', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthState(page)
  })

  test('exibe tarefas da lista', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Tarefa E2E Teste')).toBeVisible({
      timeout: 10000
    })
    await expect(page.getByText('Tarefa Concluída')).toBeVisible()
  })

  test('filtra por pendentes ao clicar no card', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Pendentes').click()
    await expect(page.getByText('Tarefa E2E Teste')).toBeVisible()
    await expect(page.getByText('Tarefa Concluída')).not.toBeVisible()
  })

  test('filtra por concluídas ao clicar no card', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Concluídas').click()
    await expect(page.getByText('Tarefa Concluída')).toBeVisible()
    await expect(page.getByText('Tarefa E2E Teste')).not.toBeVisible()
  })

  test('busca por termo filtra tarefas', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Buscar').fill('E2E')
    await expect(page.getByText('Tarefa E2E Teste')).toBeVisible()
    await expect(page.getByText('Tarefa Concluída')).not.toBeVisible()
  })

  test('exibe estado vazio com mensagem humorística quando sem resultados', async ({
    page
  }) => {
    await page.goto('/')
    await page.getByPlaceholder('Buscar').fill('xyzabc_inexistente')
    await expect(page.getByText(/Nenhum resultado para/)).toBeVisible()
  })

  test('navega para página de nova tarefa', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Cadastrar nova tarefa').click()
    await expect(page).toHaveURL('/nova-tarefa')
    await expect(page.getByText('Nova tarefa')).toBeVisible()
  })
})

test.describe('Formulário de Nova Tarefa', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthState(page)
  })

  test('exibe campos do formulário', async ({ page }) => {
    await page.goto('/nova-tarefa')
    await expect(page.getByPlaceholder('Título')).toBeVisible({
      timeout: 10000
    })
  })

  test('valida título obrigatório', async ({ page }) => {
    await page.goto('/nova-tarefa')
    await page.getByRole('button', { name: /Salvar/i }).click()
    await expect(
      page.getByText(/título.*obrigatório|obrigatório/i)
    ).toBeVisible()
  })
})
