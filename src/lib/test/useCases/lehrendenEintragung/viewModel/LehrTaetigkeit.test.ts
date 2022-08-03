import { get } from 'svelte/store'
import PersonenModel from '$lib/models/PersonenModel'
import { personenModels } from '$lib/test/models/testData/fakePersonen2'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'
import { einrichtungenModels } from '$lib/test/models/testData/einrichtungen'
import { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import type { LehrTaetigkeitType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/LehrTaetigkeitType'
import { createLehrTaetigkeitModel } from '$lib/test/models/testData/createLehrTaetigkeitenModel'
import type { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
import lehrende from '../testData/lehrende'
import Lehrende from '$lib/useCases/lehrendenEintragung/viewModel/Lehrende'
import AutoCompleteItemsEinrichtungen from '$lib/useCases/lehrendenEintragung/viewModel/AutoCompleteItemsEinrichtungen'
import einrichtungen from '../testData/einrichtungen'
import { vi, describe, it, expect } from 'vitest'
import { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import a from '$lib/test/models/testData/assertionConstants'
import { areSameValuesInBothArrays } from '$lib/test/utils'

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
			expect(lehrTaetigkeitObject.lehrendeName).toBe(a.PERSON_B_FULL_NAME)
			expect(lehrTaetigkeitObject.kriteriumVerletzt).toBe(false)

			expect(lehrTaetigkeitObject.einrichtung.id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtung.label).toBe(a.EINRICHTUNG_5_LABEL)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(1)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].label).toBe(
				a.EINRICHTUNG_5_LABEL
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

			expect(lehrTaetigkeitObject.lehrendeName).toBe(a.PERSON_B_FULL_NAME)
			expect(lehrTaetigkeitObject.einrichtung).toBeFalsy()
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(0)

			einrichtungenModel.update((value) => {
				value = einrichtungenModels
				return value
			})

			expect(lehrTaetigkeitObject.lehrendeName).toBe(a.PERSON_B_FULL_NAME)
			expect(lehrTaetigkeitObject.einrichtung.id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtung.label).toBe(a.EINRICHTUNG_5_LABEL)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates.length).toBe(1)
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].id).toBe('5')
			expect(lehrTaetigkeitObject.einrichtungAutocompleteCandidates[0].label).toBe(
				a.EINRICHTUNG_5_LABEL
			)
		})
		it('should change when Einrichtung in source model lehrTaetigkeitModel changes', function () {
			const lehrTaetigkeitModelData = {
					id: 'ist egal',
					einrichtungsId: undefined,
					personId: a.PERSON_B_GUID
				},
				lehrTaetigkeitModel = new LehrTaetigkeitModel(
					new LehrTaetigkeitModelType(lehrTaetigkeitModelData)
				),
				lehrTaetigkeit = LehrTaetigkeit.create(lehrTaetigkeitModel, lehrende, einrichtungen),
				lehrTaetigkeitVorher: LehrTaetigkeitType = get(lehrTaetigkeit)

			expect(lehrTaetigkeitVorher.einrichtung).toBeFalsy()

			lehrTaetigkeitModel.update((content) => {
				content.einrichtungsId = '5'
				return content
			})

			const lehrTaetigkeitNacher: LehrTaetigkeitType = get(lehrTaetigkeit)

			expect(lehrTaetigkeitNacher.einrichtung).toBeTruthy()
			expect(lehrTaetigkeitNacher.einrichtung.id).toBe('5')
			expect(lehrTaetigkeitNacher.einrichtung.label).toBe(a.EINRICHTUNG_5_LABEL)
		})
		it(
			'Wenn ursprünglich an der LehrTaetigkeit eine Einrichtung stand, die nicht in den Einrichtungen der Person ' +
				'steht, dann soll diese ursprüngliche Einrichtung nicht in der Auswahl sein.',
			() => {
				const lehrTaetigkeitModelData = {
						id: 'ist egal',
						einrichtungsId: 'keine EinrichtungsID der Person',
						personId: a.PERSON_B_GUID
					},
					lehrTaetigkeitModel = new LehrTaetigkeitModel(
						new LehrTaetigkeitModelType(lehrTaetigkeitModelData)
					),
					lehrTaetigkeitViewModel = LehrTaetigkeit.create(
						lehrTaetigkeitModel,
						lehrende,
						einrichtungen
					),
					lehrTaetigkeit: LehrTaetigkeitType = get(lehrTaetigkeitViewModel),
					moeglicheEinrichtungsIds = lehrTaetigkeit.einrichtungAutocompleteCandidates.map(
						(e) => e.id
					)

				expect(
					areSameValuesInBothArrays(moeglicheEinrichtungsIds, a.PERSON_B_EINRICHTUNG_IDS)
				).toBeTruthy()
			}
		)
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
