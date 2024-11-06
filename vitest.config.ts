import { defineConfig } from 'vitest/config'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
  }),
)
