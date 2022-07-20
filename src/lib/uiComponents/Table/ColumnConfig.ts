import type { SvelteComponentDev } from 'svelte/internal'

export default class ColumnConfig {
	valueFromRowGetterFunction: (x: unknown) => unknown
	displayName: string
	widthInPercentOfTableWidth: number
	cellComponent: typeof SvelteComponentDev
	sortFunction

	constructor(
		valueFromRowGetterFunction: (x: unknown) => unknown,
		displayName: string,
		widthInPercentOfTableWidth: number = null,
		cellComponent = null,
		sortFunction = null
	) {
		this.valueFromRowGetterFunction = valueFromRowGetterFunction
		this.displayName = displayName
		this.widthInPercentOfTableWidth = widthInPercentOfTableWidth
		this.cellComponent = cellComponent
		this.sortFunction = sortFunction
	}
}
