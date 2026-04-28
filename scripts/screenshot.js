// scripts/screenshot.js
// Gera screenshots automáticos do app em produção para o README
// Uso: node scripts/screenshot.js

const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

const BASE_URL = 'https://minhas-tarefas-ivory.vercel.app'
const OUTPUT_DIR = path.join(__dirname, '..', 'docs', 'screenshots')

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
]

// Rotas + estado de tema a capturar
const PAGES = [
  { name: 'home-light', path: '/', theme: 'light' },
  { name: 'home-dark', path: '/', theme: 'dark' },
  { name: 'nova-tarefa-light', path: '/nova-tarefa', theme: 'light' },
  { name: 'nova-tarefa-dark', path: '/nova-tarefa', theme: 'dark' }
]

async function applyTheme(page, theme) {
  await page.evaluate((t) => {
    localStorage.setItem('minhas-tarefas-theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }, theme)
  // aguarda transição CSS do tema (0.2s)
  await new Promise((r) => setTimeout(r, 300))
}

async function takeScreenshots() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  for (const viewport of VIEWPORTS) {
    console.log(
      `\n📐 Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`
    )

    for (const pageConfig of PAGES) {
      const page = await browser.newPage()
      await page.setViewport({ width: viewport.width, height: viewport.height })

      const url = `${BASE_URL}${pageConfig.path}`
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

      // Aplica tema via localStorage (replica o hook useDarkMode)
      await applyTheme(page, pageConfig.theme)

      const filename = `${viewport.name}_${pageConfig.name}.png`
      const filepath = path.join(OUTPUT_DIR, filename)

      await page.screenshot({ path: filepath, fullPage: false })
      console.log(`  ✅ ${filename}`)

      await page.close()
    }
  }

  await browser.close()
  console.log(`\n🎉 Screenshots salvos em: ${OUTPUT_DIR}`)
  console.log('\nArquivos gerados:')
  fs.readdirSync(OUTPUT_DIR).forEach((f) =>
    console.log(`  • docs/screenshots/${f}`)
  )
}

takeScreenshots().catch((err) => {
  console.error('❌ Erro:', err.message)
  process.exit(1)
})
