import { WritableStore } from './WritableStore'

export abstract class ItemsByIdStore<T> extends WritableStore<Map<string, T>> {
	public constructor(itemsById: Map<string, T>) {
		itemsById.forEach((value, key) => {
			if (typeof key != 'string') {
				itemsById.set(new String(key).toString(), value)
				itemsById.delete(key)
			}
		})
		super(itemsById)
	}
}
