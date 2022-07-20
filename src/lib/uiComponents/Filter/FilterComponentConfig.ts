import type { SvelteComponentDev } from 'svelte/internal'

export default class {
	component: typeof SvelteComponentDev
	props: Record<string, unknown>
	applied = false

	constructor(component: typeof SvelteComponentDev, props: Record<string, unknown>) {
		this.component = component
		this.props = props
	}
}
