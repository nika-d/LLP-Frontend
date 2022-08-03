import type { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import { get } from 'svelte/store'
import type { LehrTaetigkeitType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/LehrTaetigkeitType'
import type { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'
import { LehrTaetigkeiten } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeiten'
import { createLehrTaetigkeitenModel } from '$lib/test/models/testData/createLehrTaetigkeitenModel'
import { createLehrTaetigkeitenTestDataViewModel } from '../testData/createLehrTaetigkeitenTestDataViewModel'
import type { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { delay } from '$lib/test/utils'
import assertionConstants from '$lib/test/models/testData/assertionConstants'
import { vi, describe, it, expect } from 'vitest'

describe('LehrTätigkeiten ViewModel Factory', function () {
	let lehrTaetigkeitenModel: LehrTaetigkeitenModel
	let lehrTaetigkeiten: LehrTaetigkeiten

	beforeEach(() => {
		lehrTaetigkeitenModel = createLehrTaetigkeitenModel()
		lehrTaetigkeiten = createLehrTaetigkeitenTestDataViewModel(lehrTaetigkeitenModel)
	})

	describe('factory', function () {
		it('should create a derived store', function () {
			expect(lehrTaetigkeiten).toBeInstanceOf(LehrTaetigkeiten)
			expect(lehrTaetigkeiten.hinzufuegenPerApi).toBeInstanceOf(Function)

			const lehrTaetigkeitenObject: LehrTaetigkeit[] = get(lehrTaetigkeiten)
			expect(lehrTaetigkeitenObject).toBeInstanceOf(Array)
			expect(lehrTaetigkeitenObject.length).toBe(3)

			const lehrTaetigkeit1: LehrTaetigkeitType = get(lehrTaetigkeitenObject[1])
			expect(lehrTaetigkeit1.lehrendeName).toBe(assertionConstants.PERSON_F_VOLLER_NAME)
			expect(lehrTaetigkeit1.einrichtung.id).toBe('120')
			expect(lehrTaetigkeit1.einrichtung.label).toBe(
				'CC05, I.f. Laboratoriumsmedizin, klinische Chemie und Pathobiochemie, CBF/CCM/CVK'
			)
		})
	})
	describe('Derived e2e', function () {
		it('should change when the source store changes', async function () {
			let lehrTaetigkeitenObject: LehrTaetigkeit[]
			lehrTaetigkeiten.subscribe((value) => (lehrTaetigkeitenObject = value))
			expect(lehrTaetigkeitenObject.length).toBe(3)

			const updateCounterBefore = lehrTaetigkeiten._debugUpdateCounter

			lehrTaetigkeitenModel.hinzufuegen('456', '789')
			await delay(20)

			expect(lehrTaetigkeiten._debugUpdateCounter).toBe(updateCounterBefore + 1)
			expect(lehrTaetigkeitenObject.length).toBe(4)
		})

		it('should NOT change when single contained source store item changes', function () {
			const updateCounterBefore = lehrTaetigkeiten._debugUpdateCounter
			const singleModelItem: LehrTaetigkeitModel = get(lehrTaetigkeitenModel)[1]

			singleModelItem.einrichtungSetzen('5')
			expect(lehrTaetigkeiten._debugUpdateCounter).toBe(updateCounterBefore)
		})
	})

	describe('constructor', function () {
		it('should forward API call to model object with correct this binding', function () {
			lehrTaetigkeitenModel.hinzufuegen = vi.fn()
			lehrTaetigkeiten.hinzufuegenPerApi('1', '2')
			expect(lehrTaetigkeitenModel.hinzufuegen).toHaveBeenCalledTimes(1)
			console.log(
				'this binding only testable by hand, set breakpoint here and debug, ' +
					'look for lehrTaetigkeitenModel.hinzufuegen.[[Scopes]].0.func.[[BoundThis]] see' +
					' https://stackoverflow.com/questions/27401379/how-to-get-boundthis-from-function'
			)
		})
	})
})
