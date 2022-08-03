import { render } from '@testing-library/svelte'
import Table from '$lib/uiComponents/Table/Table.svelte'
import { columnConfigs, rowsData } from './testData'

describe('Table', function () {
	test('should update rows with nested cell components when rowdata change', async () => {
		const { getAllByRole } = render(Table, {
			rowsData,
			columnConfigs
		})

		const rowElements = getAllByRole('row')
		expect(rowElements.length).toEqual(3)
	})
})
