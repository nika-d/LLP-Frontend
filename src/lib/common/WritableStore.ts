import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Invalidator, Subscriber, Unsubscriber, Updater } from './SvelteStoreTypeDeclarations'

export abstract class WritableStore<T> implements Writable<T> {
	private store: Writable<T>

	public constructor(value: T) {
		this.store = writable(value)
	}

	set(value: T): void {
		this.store.set(value)
	}

	update(updater: Updater<T>): void {
		return this.store.update(updater)
	}

	subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber {
		return this.store.subscribe(run, invalidate)
	}
}
