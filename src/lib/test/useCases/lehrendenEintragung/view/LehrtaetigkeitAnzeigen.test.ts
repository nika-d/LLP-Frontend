import { fireEvent, render } from '@testing-library/svelte'
import LehrtaetigkeitAnzeigen from '$lib/useCases/lehrendenEintragung/view/LehrTaetigkeitAnzeigen.svelte'
import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
import {
	emptyLehrtaetigkeitType,
	multiPasteEntry
} from '../../../../useCases/lehrendenEintragung/viewModel/LehrTaetigkeitForMultiPaste'
import { LehrTaetigkeit } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeit'
import { createLehrTaetigkeitModel } from '../../../models/testData/createLehrTaetigkeitenModel'
import lehrende from '../testData/lehrende'
import einrichtungen from '../testData/einrichtungen'
import userEvent from '@testing-library/user-event'
import { get } from 'svelte/store'
import { WritableStore } from '$lib/common/WritableStore'
import type { LehrTaetigkeitType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/LehrTaetigkeitType'
import assertionConstants from '../../../models/testData/assertionConstants'
import { delay } from '../../../utils'

describe('LehrtaetigkeitAnzeigen.svelte', function () {
	let existingLehrTaetigkeit, lehrTaetigkeitLoeschenAPI

	beforeEach(() => {
		existingLehrTaetigkeit = LehrTaetigkeit.create(
			createLehrTaetigkeitModel(),
			lehrende,
			einrichtungen
		)

		lehrTaetigkeitLoeschenAPI = vi.fn()
	})
	it('Should set and clear MultiPasteStore during process', async () => {
		const emptyLehrTaetigkeit = new WritableStore<LehrTaetigkeitType>(emptyLehrtaetigkeitType)

		const renderResult = render(LehrtaetigkeitAnzeigen, { lehrTaetigkeit: existingLehrTaetigkeit })

		expect(renderResult.getByText(assertionConstants.PERSON_B_FULL_NAME)).toBeInTheDocument()
		await userEvent.click(renderResult.getByText(assertionConstants.PERSON_B_FULL_NAME))
		await fireEvent.click(renderResult.getByText(lehrendenEintragungTexts.MULTI_PASTE_INSERT))
		expect(get(multiPasteEntry)).toEqual(get(existingLehrTaetigkeit))

		await fireEvent.click(renderResult.getByText(lehrendenEintragungTexts.MULTI_PASTE_SAVE))
		await delay(1)
		expect(get(multiPasteEntry)).toEqual(get(emptyLehrTaetigkeit))
	})

	it('Should fire delete API call when delete button pressed', async () => {
		const renderResult = render(LehrtaetigkeitAnzeigen, {
			lehrTaetigkeit: existingLehrTaetigkeit,
			deleteLehrtaetigkeit: lehrTaetigkeitLoeschenAPI
		})

		await fireEvent.click(renderResult.getByText('delete'))

		const existingLehrTaetigkeitObject: LehrTaetigkeitType = get(existingLehrTaetigkeit)
		expect(lehrTaetigkeitLoeschenAPI).toHaveBeenCalledWith(
			existingLehrTaetigkeitObject.einrichtung.id
		)
	})
})
