import ColumnConfig from '$lib/uiComponents/Table/ColumnConfig'

export type TableRow = {
	veranstaltung: string
	gruppen: string
	ort: string
	campus: string
	lehrenden: string
}
export const tableRowsData: Array<TableRow> = [
	{
		veranstaltung: 'POL M5-2',
		gruppen: '5, 6, 7',
		ort: 'Seminarraum 4',
		campus: 'CCM',
		lehrenden: 'Petra Musterfrau, Pippi Langstrumpf'
	},
	{
		veranstaltung: 'POL M5-3',
		gruppen: '5, 6, 7',
		ort: 'Seminarraum 5',
		campus: 'CCM',
		lehrenden: 'Petra Musterfrau'
	},
	{
		veranstaltung: 'Vorlesung 2',
		gruppen: '5, 8, 9',
		ort: 'Hörsaal Ost',
		campus: 'CBF',
		lehrenden: ''
	},
	{
		veranstaltung:
			'Praktikum Labordiagnostik: Vom Mikroskopieren zum Makroskopieren in 28 einfachen Schritten',
		gruppen: 'A, B, 7',
		ort: 'Hörsaal West',
		campus: 'CVK',
		lehrenden: 'Noch Niemand'
	}
]

export const simpleColumnConfigs = [
	new ColumnConfig((row: TableRow) => row.veranstaltung, 'Veranstaltung'),
	new ColumnConfig((row: TableRow) => row.gruppen, 'Gr.'),
	new ColumnConfig((row: TableRow) => row.ort, 'Ort'),
	new ColumnConfig((row: TableRow) => row.campus, 'Campus'),
	new ColumnConfig((row: TableRow) => row.lehrenden, 'Lehrenden', 30)
]
