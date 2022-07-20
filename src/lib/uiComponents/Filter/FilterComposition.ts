import type { Readable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import Filter from './Filter'
import type { FilterFunctionType } from './Filter'

export default class {
	private applyFunctions = writable<Array<FilterFunctionType<unknown>>>([])
	private nextFreeIndex: number

	constructor() {
		this.applyFunctions.subscribe((value) => (this.nextFreeIndex = value.length))
	}

	public createFilterInComposition<someType>(): Filter<someType> {
		const indexInComposition = this.nextFreeIndex

		function updateComposition(newFunction: FilterFunctionType<unknown>) {
			this.applyFunctions.update((applyFunctions: FilterFunctionType<unknown>) => {
				applyFunctions[indexInComposition] = newFunction
				return applyFunctions
			})
		}
		const filter = new Filter<someType>(updateComposition.bind(this))
		return filter
	}

	public applyComposedFilters: Readable<(u: unknown) => boolean> = derived(
		this.applyFunctions,
		($applyFunctions) => {
			return function (row) {
				return $applyFunctions.reduce(
					(rowFitsFilter, applyFilter) => rowFitsFilter && applyFilter(row),
					true
				)
			}
		}
	)
}
