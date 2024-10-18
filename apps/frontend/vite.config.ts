import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
    replaceSvgUrl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    modulePreload: false,
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
})

interface Replacer {
  variableName: string
  regexp: RegExp
  code: string
}

function replaceSvgUrl(): Plugin {
  const urls = [
    'https://vuejs.org/error',
    'http://www.w3.org/2000/svg',
    'http://www.w3.org/1998/Math/MathML',
    'http://www.w3.org/1999/xlink',
  ]

  function createUrlReplacer(url: string): Replacer {
    const regexp = new RegExp(url, 'g')
    const base64 = btoa(url)
    const variableName = url.split('/').at(-1)!
    const code = `const __${variableName}__ = atob('${base64}');`

    return {
      variableName,
      regexp,
      code,
    }
  }

  return {
    name: 'vite:replace-svg-url',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const bundleIndex in bundle) {
        const file = bundle[bundleIndex]
        if (file.type === 'chunk') {
          const replacers: Replacer[] = []
          for (const url of urls) {
            replacers.push(createUrlReplacer(url))
          }

          let code = file.code
          for (const replacer of replacers) {
            code = code.replaceAll(
              replacer.regexp,
              `"+__${replacer.variableName}__+"`,
            )
          }

          file.code = replacers
            .map((replacer) => replacer.code)
            .join('') + code
        }
      }
    },
  }
}
