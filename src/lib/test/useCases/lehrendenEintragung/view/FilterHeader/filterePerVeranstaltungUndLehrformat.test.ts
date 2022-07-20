import { fireEvent, render } from '@testing-library/svelte'

import { termine } from '../../testData/zweiModuleEineWocheEineGruppe'

import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
import generateFilterConfigs from '$lib/useCases/lehrendenEintragung/viewModel/generateFilterConfigs'
import FilterControls from '$lib/uiComponents/Table/tableHeaders/FilterControls.svelte'
import { get } from 'svelte/store'
import c from '../../../../models/testData/assertionConstants'
import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
import type { Readable } from 'svelte/types/runtime/store'

describe('Termine', function () {
	describe('FilterHeader - Veranstaltung und Lehrformat', function () {
		let rowsData, getByText, getByLabelText, renderResult
		let composedFilterFunctionStored: Readable<(any) => boolean>

		beforeEach(() => {
			const filterComposition = new FilterComposition()

			rowsData = get(termine)

			const filterConfigs = generateFilterConfigs(rowsData, filterComposition)

			renderResult = render(FilterControls, { filterComposition, filterConfigs })
			getByText = renderResult.getByText
			getByLabelText = renderResult.getByLabelText

			composedFilterFunctionStored = filterComposition.applyComposedFilters
		})

		test('Filtere eine Veranstaltung weg', async () => {
			await fireEvent.click(getByText(c.VERANSTALTUNG_A_KURZ_TITEL))
			const byLabelText = getByLabelText(c.VERANSTALTUNG_A_KURZ_TITEL)
			expect(byLabelText.checked).toBeFalsy()

			const composedFilterFunction = get(composedFilterFunctionStored)
			const filteredRows = rowsData.filter((row) => composedFilterFunction(row))

			expect(filteredRows.length).toBe(11)
		})

		test('Filtere ein Lehrformat weg', async () => {
			await fireEvent.click(getByText(c.LEHRFORMAT_A_BEZEICHNUNG_LANG))
			const byLabelText = getByLabelText(c.LEHRFORMAT_A_BEZEICHNUNG_LANG)
			expect(byLabelText.checked).toBeFalsy()

			const composedFilterFunction = get(composedFilterFunctionStored)
			const filteredRows = rowsData.filter((row) => composedFilterFunction(row))

			expect(filteredRows.length).toBe(11)
		})

		test('Filtere Lehrformat POL weg', async () => {
			const POLFilter = renderResult.container.querySelector(
				'[data-filter-target="' +
					(lehrendenEintragungTexts.LEHRFORMAT + '-' + c.LEHRFORMAT_B_BEZEICHNUNG_LANG)
						.toLowerCase()
						.replace(' ', '') +
					'"]'
			)
			await fireEvent.click(POLFilter)

			const composedFilterFunction = get(composedFilterFunctionStored)
			const filteredRows = rowsData.filter((row) => composedFilterFunction(row))

			expect(filteredRows.length).toBe(4)

			const gibtsPOL = filteredRows.reduce(
				(result, row) => result || row.lehrformat.toString() === c.LEHRFORMAT_B_BEZEICHNUNG_LANG,
				false
			)

			expect(gibtsPOL).toBeFalsy()
		})
	})
})
