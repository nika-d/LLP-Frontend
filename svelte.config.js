// import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	onwarn(warning, defaultHandler) {
		// don't warn on <marquee> elements, cos they're cool
		if (warning.toString().includes('Unused CSS selector')) return

		// handle all other warnings normally
		defaultHandler(warning)
	},
	kit: {
		adapter: adapter(),

		vite: {
			test: {
				globals: true,
				environment: 'jsdom',
				setupFiles: 'setupTestEnvironment.ts'
			},
			server: {
				fs: {
					// Allow serving files from one level up to the project root
					allow: ['..']
				}
			}
		}
	}
}

export default config
