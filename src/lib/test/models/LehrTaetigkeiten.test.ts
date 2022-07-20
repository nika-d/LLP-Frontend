import { get } from 'svelte/store'
import type { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import type { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'
import { createLehrTaetigkeitenModel } from './testData/createLehrTaetigkeitenModel'
import { delay } from '../utils'
import { apiStatusContants } from '$lib/models/api/apiConstants'
import a from './testData/assertionConstants'

describe('LehrTätigkeiten Model', function () {
	describe('constructor', function () {
		test('should construct a store with an array of LehrTaetigkeit', function () {
			const lehrtaetigkeiten = createLehrTaetigkeitenModel()

			expect(lehrtaetigkeiten).toHaveProperty('subscribe')
			expect(lehrtaetigkeiten).toHaveProperty('hinzufuegen')
			expect(lehrtaetigkeiten).toHaveProperty('loeschen')

			const testItemStoredValues: LehrTaetigkeitModel[] = get(lehrtaetigkeiten)
			expect(testItemStoredValues.length).toBe(3)

			const testItemStoredValue1: LehrTaetigkeitModelType = get(testItemStoredValues[0])

			expect(testItemStoredValue1.personId).toBe(a.PERSON_B_GUID)
			expect(testItemStoredValue1.einrichtungsId).toBe('5')
		})

		test('should add a new item to the array', async function () {
			const lehrtaetigkeiten = new LehrTaetigkeitenModel([], 'SPE-456')

			const apiStatusModel = lehrtaetigkeiten.hinzufuegen('7', '40')
			await delay(20)

			expect(get(apiStatusModel).statusCode).toBe(apiStatusContants.OK)

			const lehrtaetigkeitenObject: LehrTaetigkeitModel[] = get(lehrtaetigkeiten)
			expect(lehrtaetigkeitenObject.length).toBe(1)

			const lehrendeTaetigkeitNeu: LehrTaetigkeitModel = lehrtaetigkeitenObject[0]
			const lehrtaetigkeitModelType: LehrTaetigkeitModelType = get(lehrendeTaetigkeitNeu)

			expect(lehrtaetigkeitModelType.personId).toBe('7')
			expect(lehrtaetigkeitModelType.einrichtungsId).toBe('40')
			expect(lehrtaetigkeitModelType.id).toBe('27')
		})

		test('should löschen', function () {
			const lehrtaetigkeiten = createLehrTaetigkeitenModel()
			lehrtaetigkeiten.loeschen('1')

			const lehrtaetigkeitenObject: LehrTaetigkeitModel[] = get(lehrtaetigkeiten)
			expect(lehrtaetigkeitenObject.length).toBe(2)
			const lehrTaetigkeitObject: LehrTaetigkeitModelType = get(lehrtaetigkeitenObject[0])
			expect(lehrTaetigkeitObject.id).toBe('2')
		})
	})
})
