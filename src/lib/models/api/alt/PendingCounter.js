import { writable } from 'svelte/store'

export function createPendingCounter_store() {
	const counterStore = writable(0)
	counterStore.increase = function () {
		counterStore.update((currentValue) => currentValue + 1)
	}
	counterStore.decrease = function () {
		counterStore.update((currentValue) => currentValue - 1)
	}
	return counterStore
}
