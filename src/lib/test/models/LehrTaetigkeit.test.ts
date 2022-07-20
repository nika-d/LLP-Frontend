import { get } from 'svelte/store'
import { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import { delay } from '../utils'

describe('LehrTaetigkeit Model', function () {
	describe('constructor', function () {
		it('should construct a store with a LehrTaetigkeitModelType', function () {
			const lehrtaetigkeit = new LehrTaetigkeitModel(
				new LehrTaetigkeitModelType({
					id: '1',
					personId: '123',
					einrichtungsId: '20'
				})
			)

			expect(lehrtaetigkeit).toHaveProperty('einrichtungSetzen')
			expect(lehrtaetigkeit).toHaveProperty('subscribe')

			const testItemStoredValue: LehrTaetigkeitModelType = get(lehrtaetigkeit)

			expect(testItemStoredValue.personId).toBe('123')
			expect(testItemStoredValue.einrichtungsId).toBe('20')
		})
	})
	describe('Einrichtung setzen', function () {
		it('should change the content of the store', async function () {
			const lehrtaetigkeit = new LehrTaetigkeitModel(
				new LehrTaetigkeitModelType({
					id: '1',
					personId: '123',
					einrichtungsId: '20'
				})
			)
			lehrtaetigkeit.einrichtungSetzen('7n')
			await delay(20) // warten auf die API
			const lehrtaetigkeitObject: LehrTaetigkeitModelType = get(lehrtaetigkeit)
			expect(lehrtaetigkeitObject.einrichtungsId).toBe('7n')
		})
	})
})
