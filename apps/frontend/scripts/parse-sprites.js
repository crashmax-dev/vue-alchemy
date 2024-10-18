import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const assetsFolder = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  '..',
  'src',
  'assets',
)

const sprites = await fs.readdir(path.resolve(assetsFolder, 'sprites'), {
  encoding: 'utf-8',
  recursive: true,
})

const code = [
  ...sprites.map((sprite) => `import ${sprite.replace('.webp', '')} from './sprites/${sprite}'`),
  `\nexport const sprites: Record<string, string> = {
  ${sprites.map((asset) => asset.replace('.webp', '')).join(',\n  ')}
}\n`,
].join('\n')

await fs.writeFile(
  path.resolve(assetsFolder, 'sprites.ts'),
  code,
  { encoding: 'utf-8' },
)
