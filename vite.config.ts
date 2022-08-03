/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const mode = process.env.APP_ENV

export default defineConfig({
	mode: mode,
	plugins: [
		svelte({
			hot: !process.env.VITEST
		})
	]
})
