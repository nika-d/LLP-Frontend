import { get } from 'svelte/store'
import { ModelsByIdStore } from '$lib/models/common/ModelsByIdStore'
import { PersonModelType } from '$lib/models/dataTypes/PersonModelType'
import PersonenModel from '$lib/models/PersonenModel'
import EinrichtungModelType from '$lib/models/dataTypes/EinrichtungModelType'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'
import { ItemStore } from '$lib/common/ItemStore'
import PersonModel from '$lib/models/PersonModel'
import EinrichtungModel from '$lib/models/EinrichtungModel'
import a from '../testData/assertionConstants'
import jsonArray from '../testData/fakePersonen1.json'

describe('Abstract ModelsById Store', function () {
	test('should not be able to set a new value', function () {
		class MyModel extends ItemStore<string> {}

		class MyModelsByIdStore extends ModelsByIdStore<string, MyModel> {}

		const storeInstance = new MyModelsByIdStore(
			new Map([
				['2', new MyModel('Test')],
				['5', new MyModel('2')]
			])
		)
		try {
			storeInstance.set()
		} catch (e) {
			expect(e.message).toBe('Darf nie gesetzt werden')
		}
	})

	describe('fromJson', function () {
		test('should create a ModelsByIdStore from a propper JSON array', function () {
			const personenModel = ModelsByIdStore.fromJson(
					jsonArray,
					PersonModelType,
					PersonModel,
					PersonenModel
				),
				personenModelValue = get(personenModel),
				personModel = personenModelValue.get(a.PERSON_A_GUID),
				personModelType: PersonModelType = get(personModel)
			expect(personModelType.nachname).toBe(a.PERSON_A_NACHNAME)
		})

		test('should throw when called with malformed JSON array', function () {
			const otherJsonArray = JSON.parse(JSON.stringify(jsonArray))
			otherJsonArray[0].id = undefined
			expect(() =>
				ModelsByIdStore.fromJson(otherJsonArray, PersonModelType, PersonModel, PersonenModel)
			).toThrow()
		})

		test('should produce ids with type string', function () {
			const testData = [
				{ id: 5, name: '...' },
				{ id: 0o15, name: '...' },
				{ id: 0x16, name: '...' },
				{ id: '18', name: '...' }
			]
			const store = ModelsByIdStore.fromJson(
				testData,
				EinrichtungModelType,
				EinrichtungModel,
				EinrichtungenModel
			)
			const result = get(store)
			for (const k of result.keys()) expect(typeof k).toBe('string')
		})
	})

	describe('getMapFromJsonArray', () => {
		test('should create a map of models by id from a propper JSON array', function () {
			const personenModelsById = ModelsByIdStore.getMapFromJsonArray(
					jsonArray,
					PersonModelType,
					PersonModel
				),
				personModel = personenModelsById.get(a.PERSON_A_GUID),
				personModelType: PersonModelType = get(personModel)
			expect(personModelType.nachname).toBe(a.PERSON_A_NACHNAME)
		})
	})
})
