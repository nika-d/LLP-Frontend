import { jsonArray as dtJsonArray } from '../testData/createLehrTaetigkeitenModel'
import termineJsonArray from '../testData/studienstrukturJsons/termine_zu_veranstaltung_74476.json'
import modelsFromJson from '$lib/models/common/modelsFromJson'
import { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { get } from 'svelte/store'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { TerminModel } from '$lib/models/TerminModel'
import a from '../testData/assertionConstants'
import type { JSONValue } from '$lib/models/api/JSON'

describe('modelsFromJson', function () {
	test('should create an array of models from Json', function () {
		const models = modelsFromJson(dtJsonArray, LehrTaetigkeitModelType, LehrTaetigkeitModel)
		expect(models[2]).toHaveProperty('einrichtungSetzen')
		expect(get(models[2]).personId).toBe(a.PERSON_C_GUID)
	})
	test('should deal with property of type ModelsStore', function () {
		const models = modelsFromJson(
			termineJsonArray as unknown as Array<JSONValue>,
			TerminModelType,
			TerminModel
		)
		expect(models[2]).toBeInstanceOf(TerminModel)
		expect(get(models[2]).gruppenBezeichnung).toBe('1a-3b')
	})
})
