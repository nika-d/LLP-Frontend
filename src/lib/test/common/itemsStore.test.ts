import { get } from 'svelte/store'
import { WritableStore } from '$lib/common/WritableStore'
import { ItemsStore } from '$lib/common/ItemsStore'

class MyItemsStore extends ItemsStore<string> {}

describe('Abstract Items Store', function () {
	let storeInstance: MyItemsStore

	const myValue1 = 'Test'
	const myValue2 = '2'
	beforeEach(function () {
		storeInstance = new MyItemsStore([myValue1, myValue2])
	})

	test('should construct a store with an array of a typed value', function () {
		expect(storeInstance).toHaveProperty('subscribe')
		expect(storeInstance).toBeInstanceOf(MyItemsStore)
		expect(storeInstance).toBeInstanceOf(ItemsStore)
		expect(storeInstance).toBeInstanceOf(WritableStore)
		expect(storeInstance.subscribe).toBeInstanceOf(Function)

		const storeValue: string[] = get(storeInstance)
		expect(storeValue).toBeInstanceOf(Array)
		expect(storeValue.length).toBe(2)
		expect(storeValue[0]).toBe(myValue1)
		expect(storeValue[1]).toBe(myValue2)
	})

	test('should be able to set a value', function () {
		const newValue = 'Test2'
		storeInstance.set([newValue])
		expect(get(storeInstance)[0]).toBe(newValue)
	})

	test('should be able to update a value by providing an update function', function () {
		storeInstance.update((value) => {
			value.push('3')
			return value
		})
		expect(get(storeInstance)[2]).toBe('3')
	})
})
