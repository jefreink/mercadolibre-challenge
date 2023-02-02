import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			include: ['**/*.js', '**/*.jsx'],
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	server: {
		port: 3000,
		hmr: {
			protocol: 'ws',
			host: 'localhost',
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
