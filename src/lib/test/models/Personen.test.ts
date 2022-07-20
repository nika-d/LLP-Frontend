import PersonenModel from '$lib/models/PersonenModel'
import { personenModels } from './testData/fakePersonen2'
import type { PersonModelType } from '$lib/models/dataTypes/PersonModelType'
import a from './testData/assertionConstants'

describe('Personen Model', function () {
	describe('constructor', function () {
		test('should construct a store with a map of Person', function () {
			const personenModel = new PersonenModel(personenModels)

			expect(personenModel).toHaveProperty('subscribe')

			const testItemStoredValue: Map<string, PersonModelType> = personenModel.get()

			expect(testItemStoredValue.size).toBe(22)
			expect(testItemStoredValue.get(a.PERSON_B_GUID).nachname).toBe('Mustermann')
			expect(testItemStoredValue.get('0')).toBeFalsy()

			expect(testItemStoredValue.get('/KXI3DufuRqk/SIzfWncdAjTf5A=').vorname).toBe('Hansi')
			expect(testItemStoredValue.get('/KXI3DufuRqk/SIzfWncdAjTf5A=').titel).toBeFalsy()
		})
	})
})
