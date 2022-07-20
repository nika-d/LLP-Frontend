import { fireEvent, render } from '@testing-library/svelte'
import viewModelsFuerEineModulWoche from '../../testData/createViewModelsFuerEineModulwoche'
import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
import generateFilterConfigs from '$lib/useCases/lehrendenEintragung/viewModel/generateFilterConfigs'
import FilterControls from '$lib/uiComponents/Table/tableHeaders/FilterControls.svelte'
import { get } from 'svelte/store'
import c from '../../../../models/testData/assertionConstants'
import type { Readable } from 'svelte/types/runtime/store'
import texts from '../../../../../uiTexts/lehrendenEintragung.json'

describe('Termine', function () {
	describe('FilterHeader - verschiedene Filter', function () {
		let rowsData, renderResult
		let composedFilterFunctionStored: Readable<(any) => boolean>

		beforeEach(() => {
			const termine = viewModelsFuerEineModulWoche,
				filterComposition = new FilterComposition()
			rowsData = get(termine)

			const filterConfigs = generateFilterConfigs(rowsData, filterComposition)

			renderResult = render(FilterControls, { filterComposition, filterConfigs })

			composedFilterFunctionStored = filterComposition.applyComposedFilters
		})

		test('Raum und Campus Filter sind da', () => {
			expect(renderResult.getByText('Raum')).toBeInTheDocument()
			expect(renderResult.getByText('Campus')).toBeInTheDocument()
		})

		test('Filtere eine Gruppe weg', async () => {
			await fireEvent.click(renderResult.getByText('13a-15b'))
			const byLabelText = renderResult.getByLabelText('13a-15b')
			expect(byLabelText.checked).toBeFalsy()

			const composedFilterFunction = get(composedFilterFunctionStored)
			const filteredRows = rowsData.filter((row) => composedFilterFunction(row))
			expect(filteredRows.length).toBe(8)
		})

		test('Filtere per Veranstaltung und Modul', async () => {
			assertNoFilterAllRows()

			await fireEvent.click(renderResult.getByText(c.VERANSTALTUNG_A_KURZ_TITEL))
			const veranstaltungAcheckbox = renderResult.getByLabelText(c.VERANSTALTUNG_A_KURZ_TITEL)
			expect(veranstaltungAcheckbox.checked).toBeFalsy()

			const filterByModulAndVeranstaltung = get(composedFilterFunctionStored)
			const composedFilterRows = rowsData.filter((row) => filterByModulAndVeranstaltung(row))
			expect(composedFilterRows.length).toBe(7)

			await fireEvent.click(renderResult.getByText(c.MODUL_A_TITEL, { exact: false }))
			const modulACheckbox = renderResult.getByLabelText(c.MODUL_A_TITEL, { exact: false })
			expect(modulACheckbox.checked).toBeFalsy()

			const filterByModul = get(composedFilterFunctionStored)
			const filterByModulRows = rowsData.filter((row) => filterByModul(row))
			expect(filterByModulRows.length).toBe(0)
		})

		test('Angewendeter Filter erhöht numberOfAppliedFilters', async () => {
			assertNoFilterAllRows()
			const appliedFilterCountBadge = renderResult.getByTestId('numberOfAppliedFilters').children[0]
			expect(appliedFilterCountBadge.innerHTML).toBe('0')

			await fireEvent.click(renderResult.getByText(texts.LEHRENDE_FEHLT))
			expect(appliedFilterCountBadge.innerHTML).toBe('1')

			await fireEvent.click(renderResult.getByText(texts.LEHRENDE_FEHLT))
			expect(appliedFilterCountBadge.innerHTML).toBe('0')

			await fireEvent.click(renderResult.getByText('13a-15b'))
			const groupAbox = renderResult.getByLabelText('13a-15b')
			expect(groupAbox.checked).toBeFalsy()

			await fireEvent.click(renderResult.getByText('11b-14b'))
			const groupBbox = renderResult.getByLabelText('11b-14b')
			expect(groupBbox.checked).toBeFalsy()

			expect(appliedFilterCountBadge.innerHTML).toBe('1')
		})

		test("Filtere per toggle 'Lehrende*r fehlt'", async () => {
			assertNoFilterAllRows()

			await fireEvent.click(renderResult.getByText(texts.LEHRENDE_FEHLT))
			const lehrendesFehltFilter = get(composedFilterFunctionStored)
			const filteredRows = rowsData.filter((row) => lehrendesFehltFilter(row))
			expect(filteredRows.length).toBe(1)

			await fireEvent.click(renderResult.getByText(texts.LEHRENDE_FEHLT))
			assertNoFilterAllRows()
		})

		function assertNoFilterAllRows() {
			const noFilterSet = get(composedFilterFunctionStored)
			const allRows = rowsData.filter((row) => noFilterSet(row))
			expect(allRows.length).toBe(9)
		}
	})
})
