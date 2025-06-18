import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.js$/, // treat all .js in src as JSX
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	resolve: {
		alias: {
			'@root': path.resolve(__dirname, 'src'),
			'@config': path.resolve(__dirname, 'src/config'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@utils': path.resolve(__dirname, 'src/utils'),
		},
	},
	server: {
		proxy: {
			'/api': 'http://localhost:4000',
		},
	},
});
