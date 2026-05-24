import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const url = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] || ''
const scrollY = process.argv[4] ? parseInt(process.argv[4], 10) : 0

const dir = path.resolve('temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

// Auto-increment N
const existing = fs.readdirSync(dir).filter(f => f.endsWith('.png'))
const nums = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0', 10)).filter(n => !isNaN(n))
const N = nums.length ? Math.max(...nums) + 1 : 1
const filename = label ? `screenshot-${N}-${label}.png` : `screenshot-${N}.png`
const outPath = path.join(dir, filename)

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

if (scrollY > 0) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY)
  await new Promise(r => setTimeout(r, 800))
}

await page.screenshot({ path: outPath, fullPage: false })
await browser.close()

console.log(`Saved: ${outPath}`)
