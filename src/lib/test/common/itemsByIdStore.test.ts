import { get } from 'svelte/store'
import { WritableStore } from '$lib/common/WritableStore'
import { ItemsByIdStore } from '$lib/common/ItemsByIdStore'

class MyItemsByIdStore extends ItemsByIdStore<string> {}

describe('Abstract ItemsById Store', function () {
	let storeInstance: MyItemsByIdStore

	const myKey1 = '2'
	const myKey2 = '5'
	const myValue1 = 'Test'
	const myValue2 = '2'
	beforeEach(function () {
		storeInstance = new MyItemsByIdStore(
			new Map([
				[myKey1, myValue1],
				[myKey2, myValue2]
			])
		)
	})

	test('should be a store containing a Map<string, type>', function () {
		expect(storeInstance).toHaveProperty('subscribe')
		expect(storeInstance).toBeInstanceOf(MyItemsByIdStore)
		expect(storeInstance).toBeInstanceOf(ItemsByIdStore)
		expect(storeInstance).toBeInstanceOf(WritableStore)
		expect(storeInstance.subscribe).toBeInstanceOf(Function)

		const storeValue: Map<string, string> = get(storeInstance)
		expect(storeValue).toBeInstanceOf(Map)
		expect(storeValue.size).toBe(2)
		expect(storeValue.get(myKey1)).toBe(myValue1)
		expect(storeValue.get(myKey2)).toBe(myValue2)
	})

	test('should be able to set a value', function () {
		storeInstance.set(new Map([['1', 'Test2']]))
		let storeContent
		storeInstance.subscribe((value) => (storeContent = value))
		expect(storeContent.get('1')).toBe('Test2')
	})

	test('should be able to update a value by providing an update function', function () {
		storeInstance.update((value) => value.set('10', 'Test3'))
		let storeContent
		storeInstance.subscribe((value) => (storeContent = value))
		expect(storeContent.get('10')).toBe('Test3')
	})
})
