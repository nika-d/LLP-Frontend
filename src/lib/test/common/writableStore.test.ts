import { get } from 'svelte/store'
import { WritableStore } from '$lib/common/WritableStore'

class MyWritableStore extends WritableStore<string> {}

describe('Abstract Writable Store', function () {
	describe('constructor', function () {
		let storeInstance: MyWritableStore
		const myValue = 'Test'
		beforeEach(function () {
			storeInstance = new MyWritableStore(myValue)
		})
		test('should be a store with a typed value', function () {
			expect(storeInstance).toHaveProperty('subscribe')
			expect(storeInstance).toBeInstanceOf(MyWritableStore)
			expect(storeInstance).toBeInstanceOf(WritableStore)
			expect(storeInstance.subscribe).toBeInstanceOf(Function)
			expect(get(storeInstance)).toBe(myValue)
			expect(typeof get(storeInstance)).toBe('string')
		})

		test('should be able to set a value', function () {
			storeInstance.set('Test2')
			expect(get(storeInstance)).toBe('Test2')
		})

		test('should be able to update a value by providing an update function', function () {
			storeInstance.update((value) => value + '3')
			expect(get(storeInstance)).toBe('Test3')
		})
	})
})
