import { einrichtungenModels } from './testData/einrichtungen'
import c from './testData/assertionConstants'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'
import type EinrichtungModelType from '$lib/models/dataTypes/Einrichtung/EinrichtungModelType'

describe('Einrichtungen Model', function () {
	describe('constructor', function () {
		it('should construct a store with a map of Einrichtung', function () {
			const einrichtungenModel = new EinrichtungenModel(einrichtungenModels)

			expect(einrichtungenModel).toHaveProperty('subscribe')

			const testItemStoredValue: Map<string, EinrichtungModelType> = einrichtungenModel.get()

			expect(testItemStoredValue.size).toBe(c.EINRICHTUNGEN_ANZAHL)
			expect(testItemStoredValue.get('1').name).toBe('GB IT')
			expect(testItemStoredValue.get('0')).toBeFalsy()

			expect(testItemStoredValue.get('120').name).toBe(
				'CC05 - Institut für Laboratoriumsmedizin, klinische Chemie und Pathobiochemie - CBF/CCM/CVK'
			)
		})
	})
})
