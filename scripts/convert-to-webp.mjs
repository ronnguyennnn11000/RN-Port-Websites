import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INPUT_DIR = join(__dirname, '../public/ezgif-split')

const files = (await readdir(INPUT_DIR))
  .filter(f => extname(f) === '.png')
  .sort()

console.log(`Converting ${files.length} PNGs to WebP…`)

let done = 0
for (const file of files) {
  const src = join(INPUT_DIR, file)
  const dest = join(INPUT_DIR, basename(file, '.png') + '.webp')
  await sharp(src).webp({ quality: 82 }).toFile(dest)
  await unlink(src) // remove original PNG
  done++
  if (done % 20 === 0 || done === files.length) {
    process.stdout.write(`  ${done}/${files.length}\n`)
  }
}

console.log('Done! All frames converted to WebP.')
