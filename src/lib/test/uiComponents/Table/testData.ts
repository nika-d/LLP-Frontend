import ZeitSpanne from '$lib/models/common/ZeitSpanne'
import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
import ColumnConfig from '$lib/uiComponents/Table/ColumnConfig'
import CellComponentForTest from './CellComponentForTest.svelte'

export const special = 'special',
	specialNummer = 25

class RowData {
	specialData: string
	zeitspanne: ZeitSpanne
	nummer: number
}

export const rowsData: Array<RowData> = [
	{
		specialData: 'very',
		zeitspanne: new ZeitSpanne('1995-12-17T03:24:00', '1995-12-17T03:25:00'),
		nummer: 23
	},
	{
		specialData: special,
		zeitspanne: new ZeitSpanne('1998-12-17T03:24:00', '1998-12-17T03:25:00'),
		nummer: specialNummer
	},
	{
		specialData: 'data',
		zeitspanne: new ZeitSpanne('2001-12-17T03:24:00', '2001-12-17T03:25:00'),
		nummer: 27
	}
]
export const columnConfigs: Array<ColumnConfig> = [
	new ColumnConfig((row) => row, 'special data', null, CellComponentForTest),
	new ColumnConfig((row: RowData) => row.zeitspanne, 'zeitspanne'),
	new ColumnConfig((row: RowData) => row.nummer, 'nummer')
]
export const filterComposition: FilterComposition = new FilterComposition()

export function createFilterForSecondRow(filterComposition: FilterComposition) {
	const filter = filterComposition.createFilterInComposition<number>()
	filter.set_getFilterableData((rowData: RowData) => rowData.nummer)
	const filterSpecial = (cellData) => cellData != specialNummer
	filter.set_filter(filterSpecial)
}
