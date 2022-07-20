import { get } from 'svelte/store'
import { ItemStore } from '$lib/common/ItemStore'
import { WritableStore } from '$lib/common/WritableStore'

class MyItemStore extends ItemStore<string> {}

describe('Abstract Item Store', function () {
	let storeInstance: MyItemStore
	const myValue = 'Test'
	beforeEach(function () {
		storeInstance = new MyItemStore(myValue)
	})

	test('should construct a store with a typed value', function () {
		expect(storeInstance).toHaveProperty('subscribe')
		expect(storeInstance).toBeInstanceOf(MyItemStore)
		expect(storeInstance).toBeInstanceOf(ItemStore)
		expect(storeInstance).toBeInstanceOf(WritableStore)
		expect(storeInstance.subscribe).toBeInstanceOf(Function)

		expect(get(storeInstance)).toBe(myValue)
	})

	test('should be able to set a value', function () {
		storeInstance.set('Test2')
		expect(get(storeInstance)).toBe('Test2')
	})

	test('should be able to update a value by providing an update function', function () {
		storeInstance.update((value) => value + '3')
		expect(get(storeInstance)).toBe(myValue + '3')
	})
})
