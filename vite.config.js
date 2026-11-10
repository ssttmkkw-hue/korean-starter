import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' 让构建产物用相对路径，放在 GitHub Pages 子路径（/仓库名/）或 Netlify 根路径都能用
export default defineConfig({
  base: './',
  plugins: [react()],
})
