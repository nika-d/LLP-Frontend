import { WritableStore } from './WritableStore'

export abstract class ItemsStore<T> extends WritableStore<Array<T>> {
	public constructor(items: Array<T>) {
		super(items)
	}
}
