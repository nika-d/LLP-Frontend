import { get } from 'svelte/store'
import PersonenModel from '$lib/models/PersonenModel'
import { personenModels } from '../../../models/testData/fakePersonen2'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'
import { einrichtungenModels } from '../../../models/testData/einrichtungen'
import { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import type { LehrTaetigkeitType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/LehrTaetigkeitType'
import { createLehrTaetigkeitModel } from '../../../models/testData/createLehrTaetigkeitenModel'
import type { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
import lehrende from '../testData/lehrende'
import Lehrende from '$lib/useCases/lehrendenEintragung/viewModel/Lehrende'
import AutoCompleteItemsEinrichtungen from '../../../../useCases/lehrendenEintragung/viewModel/AutoCompleteItemsEinrichtungen'
import einrichtungen from '../testData/einrichtungen'
import { vi, describe, it, expect } from 'vitest'

describe('LehrTätigkeit ViewModel', function () {
	describe('static create method', function () {
		it('should create a derived store with combined values', function () {
			const lehrTaetigkeit = LehrTaetigkeit.create(
				createLehrTaetigkeitModel(),
				lehrende,
				einrichtungen
			)
			expect(lehrTaetigkeit).toBeInstanceOf(LehrTaetigkeit)
			expect(lehrTaetigkeit).toHaveProperty('einrichtungSetzenPerApi')

			const lehrTaetigkeitObject: LehrTaetigkeitType = get(lehrTaetigkeit)
			expect(lehrTaetigkeitObject.lehrendeName).toBe('Mustermann, Petra')
			expect(lehrTaetigkeitObject.kriteriumVerletzt).toBe(false)

			expect(lehrTaetigkeitObject.einrichtung.id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtung.label).toBe(
				'CC01, I.f. Geschichte der Medizin und Ethik in der Medizin, CBF'
			)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(1)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].label).toBe(
				'CC01, I.f. Geschichte der Medizin und Ethik in der Medizin, CBF'
			)
		})
	})
	describe('created object has derived behaviour', function () {
		it('should change when one of the source stores changes (API-response finally arrived)', function () {
			const personenModel = new PersonenModel(new Map()),
				lehrende = new Lehrende([personenModel]),
				einrichtungenModel = new EinrichtungenModel(new Map()),
				einrichtungen = new AutoCompleteItemsEinrichtungen([einrichtungenModel])

			const lehrTaetigkeit = LehrTaetigkeit.create(
				createLehrTaetigkeitModel(),
				lehrende,
				einrichtungen
			)
			let lehrTaetigkeitObject: LehrTaetigkeitType
			lehrTaetigkeit.subscribe((value) => (lehrTaetigkeitObject = value))

			expect(lehrTaetigkeitObject.lehrendeName).toBeFalsy()
			expect(lehrTaetigkeitObject.einrichtung).toBeFalsy()
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(0)

			personenModel.update((value) => {
				value = personenModels
				return value
			})

			expect(lehrTaetigkeitObject.lehrendeName).toBe('Mustermann, Petra')
			expect(lehrTaetigkeitObject.einrichtung).toBeFalsy()
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(0)

			einrichtungenModel.update((value) => {
				value = einrichtungenModels
				return value
			})

			expect(lehrTaetigkeitObject.lehrendeName).toBe('Mustermann, Petra')
			expect(lehrTaetigkeitObject.einrichtung.id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtung.label).toBe(
				'CC01, I.f. Geschichte der Medizin und Ethik in der Medizin, CBF'
			)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(1)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].label).toBe(
				'CC01, I.f. Geschichte der Medizin und Ethik in der Medizin, CBF'
			)
		})
		it('should change when Einrichtung in source model lehrTaetigkeitModel changes', function () {
			const lehrTaetigkeitModel = createLehrTaetigkeitModel(),
				lehrTaetigkeit = LehrTaetigkeit.create(lehrTaetigkeitModel, lehrende, einrichtungen),
				lehrTaetigkeitVorher: LehrTaetigkeitType = get(lehrTaetigkeit)

			lehrTaetigkeitModel.update((content) => {
				content.einrichtungsId = '120'
				return content
			})

			const lehrTaetigkeitNacher: LehrTaetigkeitType = get(lehrTaetigkeit)

			expect(lehrTaetigkeitVorher.einrichtung.id).not.toBe(lehrTaetigkeitNacher.einrichtung.id)
			expect(lehrTaetigkeitNacher.einrichtung.id).toBe('120')
			expect(lehrTaetigkeitNacher.einrichtung.label).toBe(
				'CC05, I.f. Laboratoriumsmedizin, klinische Chemie und Pathobiochemie, CBF/CCM/CVK'
			)
		})
	})
	describe('einrichtungSetzenAPI', function () {
		it('Soll Aufruf an Model-Methode weiterreichen', function () {
			const lehrTaetigkeitModel = createLehrTaetigkeitModel()
			lehrTaetigkeitModel.einrichtungSetzen = vi.fn().mockImplementationOnce(() => undefined) as (
				string
			) => ApiStatusModel

			const lehrTaetigkeit = LehrTaetigkeit.create(lehrTaetigkeitModel, lehrende, einrichtungen)

			lehrTaetigkeit.einrichtungSetzenPerApi('5')
			expect(lehrTaetigkeitModel.einrichtungSetzen).toHaveBeenCalledTimes(1)
		})
	})
})
