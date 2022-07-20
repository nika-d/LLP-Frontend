import { ItemsStore } from '$lib/common/ItemsStore'
import type { ItemStore } from '$lib/common/ItemStore'

export abstract class ModelsStore<S, T extends ItemStore<S>> extends ItemsStore<T> {
	public set() {
		throw Error('Darf nie gesetzt werden')
	}
}
