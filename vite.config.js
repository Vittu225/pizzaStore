import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pizzaStore/',
  css: {
    modules: {
      // Это добавит имя файла и локальное имя в итоговый класс
      generateScopedName: '[name]_[local]_[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        // Это отключит предупреждения о функциях цвета (color-functions)
        silenceDeprecations: ['color-functions'],
        // Рекомендуется также включить современный API компилятора
        api: 'modern-compiler' 
      },
    },
  }
  
})
