import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 5173,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			},
			'/socket.io': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react(), tsconfigPaths(), tailwindcss()],
})
