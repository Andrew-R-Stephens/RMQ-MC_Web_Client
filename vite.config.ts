import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'
import {promisify} from "util";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: true
  },
  plugins: [
      react(),
      nodePolyfills({
      })
  ],
  base: '',
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill(),
        nodePolyfills({
          // To exclude specific polyfills, add them to this list.
          exclude: [
            'fs', // Excludes the polyfill for `fs` and `node:fs`.
          ],
          // Whether to polyfill specific globals.
          globals: {
            Buffer: true, // can also be 'build', 'dev', or false
            global: true,
            process: true,
          },
          // Whether to polyfill `node:` protocol imports.
          protocolImports: true,
        })
      ]
    },
  }
})
