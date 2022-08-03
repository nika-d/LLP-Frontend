import { render } from '@testing-library/svelte'
import { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import { createLehrTaetigkeitModel } from '../../../models/testData/createLehrTaetigkeitenModel'
import { vi, beforeEach, describe, it, expect } from 'vitest'
import lehrende from '../testData/lehrende'
import einrichtungen from '../testData/einrichtungen'
import TestingParentForLehrTaetigkeitHinzufuegen from './TestingParentForLehrTaetigkeitHinzufuegen.svelte'
import {
	multiPasteControl,
	multiPasteEntry
} from '../../../../useCases/lehrendenEintragung/viewModel/LehrTaetigkeitForMultiPaste'
import { get } from 'svelte/store'
import { delay } from '../../../utils'
import assertionConstants from '../../../models/testData/assertionConstants'

describe('LehrtaetigkeitHinzufuegen.svelte', function () {
	let lehrTaetigkeitForMultiPaste, lehrTaetigkeitHinzufuegenAPI

	beforeEach(() => {
		lehrTaetigkeitForMultiPaste = LehrTaetigkeit.create(
			createLehrTaetigkeitModel(),
			lehrende,
			einrichtungen
		)

		lehrTaetigkeitHinzufuegenAPI = vi.fn()
	})

	it('Should make api call when multi paste save command is published exactly once', async () => {
		render(TestingParentForLehrTaetigkeitHinzufuegen, {
			lehrende: lehrende,
			einrichtungen: einrichtungen,
			existingLehrende: [],
			lehrTaetigkeitHinzufuegenAPISpy: lehrTaetigkeitHinzufuegenAPI
		})

		multiPasteEntry.set(get(lehrTaetigkeitForMultiPaste))
		multiPasteControl.set(true)
		await delay(1)
		expect(lehrTaetigkeitHinzufuegenAPI).toHaveBeenCalledWith(
			assertionConstants.PERSON_B_GUID,
			assertionConstants.PERSON_B_EINRICHTUNG_IDS[0]
		)
		multiPasteControl.set(false)
	})

	it('Should not make api call when lehrTaetigkeit still exists', async () => {
		render(TestingParentForLehrTaetigkeitHinzufuegen, {
			lehrende: lehrende,
			einrichtungen: einrichtungen,
			existingLehrende: [lehrTaetigkeitForMultiPaste],
			lehrTaetigkeitHinzufuegenAPISpy: lehrTaetigkeitHinzufuegenAPI
		})

		multiPasteEntry.set(get(lehrTaetigkeitForMultiPaste))
		multiPasteControl.set(true)
		await delay(1) // for whatever reason we have to give some millisecond of delay, for the subscriber to be ready

		expect(lehrTaetigkeitHinzufuegenAPI).toHaveBeenCalledTimes(0)
		multiPasteControl.set(false)
	})
})
