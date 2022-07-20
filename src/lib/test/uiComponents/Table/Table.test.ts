import { render, within } from '@testing-library/svelte'
import Table from '$lib/uiComponents/Table/Table.svelte'
import {
	columnConfigs,
	createFilterForSecondRow,
	filterComposition,
	rowsData,
	special
} from './testData'
import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
import { get } from 'svelte/store'
import { termine } from '../../useCases/lehrendenEintragung/testData/zweiModuleEineWocheEineGruppe'
import generateColumnConfigs from '$lib/useCases/lehrendenEintragung/viewModel/generateColumnConfigs'
import a from '../../models/testData/assertionConstants'
import type { TerminType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/TerminType'
import uiTexts from '$lib/uiTexts/lehrendenEintragung.json'
import { delay } from '../../utils'
import ColumnConfig from '$lib/uiComponents/Table/ColumnConfig'

const POL = a.LEHRFORMAT_B_BEZEICHNUNG_LANG

describe('Table', function () {
	test('should update rows with nested cell components when rowdata change', async () => {
		const { getAllByRole } = render(Table, {
			rowsData,
			columnConfigs,
			composedFilterFunction: filterComposition.applyComposedFilters
		})

		const rowElements = getAllByRole('row'),
			secondRow = rowElements.find((e) => e.textContent.includes(special))

		expect(rowElements.length).toEqual(3)
		expect(secondRow.classList.contains('d-none')).toBeFalsy()

		createFilterForSecondRow(filterComposition)
		await delay(1) // change thread in v8

		expect(secondRow.classList.contains('d-none')).toBeTruthy()
	})

	test('should update rows with nested cell components when rowdata change - more complicated test data', async () => {
		const filterComposition = new FilterComposition(),
			rowsData = get(termine),
			columnConfigs = generateColumnConfigs(),
			composedFilterFunction = filterComposition.applyComposedFilters,
			filter = filterComposition.createFilterInComposition(),
			filterPOL = (cellData) => cellData != POL

		// not to make the test unnecessary complicated
		columnConfigs.splice(
			columnConfigs.findIndex((e) => e.displayName == uiTexts.LEHRENDEN),
			1
		)
		columnConfigs.splice(
			columnConfigs.findIndex((e) => e.displayName == uiTexts.CURRICULUM),
			1
		)
		columnConfigs.push(new ColumnConfig((row) => row['lehrformat'], uiTexts.LEHRFORMAT))

		const { getAllByRole } = render(Table, { rowsData, columnConfigs, composedFilterFunction }),
			rows = getAllByRole('row'),
			isPOLRow = (row) => within(row).queryAllByText(POL, { exact: false }).length > 0,
			rowsWithLehrformatB = rows.filter(isPOLRow)

		expect(rows.length).toEqual(12)
		expect(rowsWithLehrformatB.length).toEqual(8)
		rowsWithLehrformatB.forEach((r) => expect(r.classList.contains('d-none')).toBeFalsy())

		filter.set_getFilterableData((termin: TerminType) => termin.lehrformat)
		filter.set_filter(filterPOL)

		await delay(1) // change thread in v8

		rowsWithLehrformatB.forEach((r) => expect(r.classList.contains('d-none')).toBeTruthy())
	})
})
