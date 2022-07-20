import { derived } from 'svelte/store'
import type { Readable } from 'svelte/store'
import type { Stores } from './SvelteStoreTypeDeclarations'

export abstract class DerivedStore<T> implements Readable<T> {
	private __debugUpdateCounter = { value: 0 }
	private store: Readable<T>

	public constructor(stores: Stores, derivingFunction) {
		const _debugUpdateCounter = this.__debugUpdateCounter
		function derivingFunctionWithCounter(...params) {
			_debugUpdateCounter.value++
			return derivingFunction(...params)
		}
		this.store = derived(stores, derivingFunctionWithCounter)
	}

	subscribe(run: (value: T) => void, invalidate?: (value?: T) => void): () => void {
		return this.store.subscribe(run, invalidate)
	}

	// eslint-disable-next-line
	protected static create(...any: any): unknown {
		throw Error('Not implemented!')

		// Kann bei Bedarf von der Kindklasse implementiert werden, nach dem Muster:
		// return new KindKlasse(
		//     this.createDerivedStore(
		//         [store1, store2, store3 ...],
		//         derivingFunction
		//     )
		// )
	}

	get _debugUpdateCounter(): number {
		return this.__debugUpdateCounter.value
	}
}
