import { LehrTaetigkeiten } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeiten'
import { jsonArray } from '../../../models/testData/createLehrTaetigkeitenModel'
import { createLehrTaetigkeitenTestDataViewModel } from '../testData/createLehrTaetigkeitenTestDataViewModel'
import { TerminFactory } from '$lib/useCases/lehrendenEintragung/viewModel/TerminFactory'
import { TerminType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/TerminType'
import type { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { delay } from '../../../utils'
import type { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import { get } from 'svelte/store'
import { createVeranstaltungenModel } from '../testData/studienstrukturTestData'
import { raeumeModel } from '../../../models/testData/raeume'
import termineModelEinzelnerTermin from '../testData/createEinzelnerTerminViewModel'
import lehrende from '../testData/lehrende'
import einrichtungen from '../testData/einrichtungen'

describe('Termin ViewModel', function () {
	const terminModel = get(termineModelEinzelnerTermin)[0]

	const veranstaltungen = createVeranstaltungenModel(termineModelEinzelnerTermin).get(),
		raeume = raeumeModel.get()

	let terminObject

	beforeEach(() => {
		terminObject = TerminFactory.create(
			terminModel,
			veranstaltungen,
			raeume,
			lehrende,
			einrichtungen
		)
	})

	describe('Factory', function () {
		test('should create an object of the view model TerminType', function () {
			expect(terminObject).toBeInstanceOf(TerminType)

			expect(terminObject.zeit.tagIst(new Date('2020-04-14'))).toBe(true)
			expect(terminObject.campus).toBe('CCM')
			expect(terminObject.gruppen).toBe('1a-4b')
			expect(terminObject.raum).toBe('')
			expect(terminObject.modul).toBe('Bewegung')
			expect(terminObject.veranstaltung).toBe('Untersuchungskurs')
			expect(terminObject.lehrenden).toBeInstanceOf(LehrTaetigkeiten)
		})
	})

	test('should not update when model changes', function () {
		// setup

		expect(terminObject.campus).toBe('CCM')

		// test

		terminModel.update(
			(value) =>
				new TerminModelType({
					id: '20211-123',
					...value,
					start: 'new Date()'.toString(),
					ende: 'new Date()'.toString(),
					lehrTaetigkeiten: jsonArray,
					gruppenbezeichnung: value.gruppenBezeichnung,
					campus: 'CVK'
				})
		)

		// assert

		expect(terminObject.campus).toBe('CCM')
	})

	test(
		'should not update but reflect it, when inside of lehrTaetigkeiten inside of one lehrTaetigkeit ' +
			'value of einrichtung changes ',
		async function () {
			// setup
			const lehrTaetigkeitenModel = get(terminModel).lehrTaetigkeitenModel
			const lehrTaetigkeiten = createLehrTaetigkeitenTestDataViewModel(lehrTaetigkeitenModel)
			lehrTaetigkeiten.subscribe((value) => value) // Subscription um updates zu zählen

			let lehrTaetigkeitenModelObject: LehrTaetigkeitModel[]
			lehrTaetigkeitenModel.subscribe((value) => (lehrTaetigkeitenModelObject = value))

			expect(lehrTaetigkeitenModelObject.length).toBe(3)
			const lehrTaetigkeitenUpdateCounterBefore = lehrTaetigkeiten._debugUpdateCounter

			let lehrenden: LehrTaetigkeit[]
			terminObject.lehrenden.subscribe((value) => (lehrenden = value))
			const countBeforeModelUpdate = lehrenden.length

			// test

			lehrTaetigkeitenModel.hinzufuegen('10', '40')
			await delay(20)

			// assert

			expect(lehrTaetigkeitenModelObject.length).toBe(4)
			expect(lehrTaetigkeiten._debugUpdateCounter).toBe(lehrTaetigkeitenUpdateCounterBefore + 1)
			expect(lehrenden.length).toBe(countBeforeModelUpdate + 1)
		}
	)
})
