import { TermineFactory } from '$lib/useCases/lehrendenEintragung/viewModel/TermineFactory'
import { TermineModel } from '$lib/models/TermineModel'
import type { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import type { TerminType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/TerminType'
import { get } from 'svelte/store'
import {
	termineModelEinzelnerTermin,
	testTermine
} from '../testData/createTermineTestDataViewModel'
import {
	createEmptyVeranstaltungenModel,
	createVeranstaltungenModel
} from '../testData/studienstrukturTestData'
import { raeumeModel } from '../../../models/testData/raeume'
import lehrende from '../testData/lehrende'
import einrichtungen from '../testData/einrichtungen'
import a from '$lib/test/models/testData/assertionConstants'
import { describe, test } from 'vitest'

describe('Termine ViewModel Factory', function () {
	test('should create an empty store when kein Termine im Model', function () {
		const termine: DerivedItemsStore<TerminType> = TermineFactory.create(
			new TermineModel([]),
			createEmptyVeranstaltungenModel(),
			raeumeModel,
			lehrende,
			einrichtungen
		)

		const terminArray = get(termine)

		expect(terminArray.length).toBe(0)
	})

	test('should create a derived store from model', function () {
		const termineModel: TermineModel = termineModelEinzelnerTermin
		const termine: DerivedItemsStore<TerminType> = TermineFactory.create(
			termineModel,
			createVeranstaltungenModel(termineModel),
			raeumeModel,
			lehrende,
			einrichtungen
		)

		const terminArray = get(termine)

		expect(terminArray.length).toBe(1)
	})

	test('should create a derived store with multiple entries', function () {
		const terminArray = get(testTermine)
		expect(terminArray.length).toBe(7)

		// Just to be really sure, a deep dive.
		const terminTypeObject = terminArray[4]
		const lehrTaetigkeitViewModelArray = get(terminTypeObject.lehrenden)
		const lehrTaetigkeitViewModel = lehrTaetigkeitViewModelArray[0]
		const lehrTaetigkeitViewModelType = get(lehrTaetigkeitViewModel)
		expect(lehrTaetigkeitViewModelType.lehrendeName).toBe(a.PERSON_E_VOLLER_NAME)
		expect(lehrTaetigkeitViewModelType.einrichtung.label).toBe(
			'CC06, I.f. Radiologie (m.d.B. Kinderradiologie), CBF/CCM/CVK'
		)
	})
})
