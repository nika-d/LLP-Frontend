import type { Readable } from 'svelte/store'
import type { Invalidator, Subscriber, Unsubscriber } from './SvelteStoreTypeDeclarations'

export abstract class ReadableStore<T> implements Readable<T> {
	public static LOADING = 'LOADING'

	private store: Readable<T>

	subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber {
		return this.store.subscribe(run, invalidate)
	}
}
