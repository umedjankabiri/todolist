import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src/App/'),
      common: path.resolve(__dirname, 'src/common/'),
      model: path.resolve(__dirname, 'src/model/')
    }
  }
})
