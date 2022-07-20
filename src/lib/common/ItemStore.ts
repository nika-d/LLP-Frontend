import { WritableStore } from './WritableStore'

export abstract class ItemStore<T> extends WritableStore<T> {
	public constructor(item: T) {
		super(item)
	}
}
