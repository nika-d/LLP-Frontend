<script lang="ts">
	import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
	import FilterComponentConfig from '$lib/uiComponents/Filter/FilterComponentConfig'
	import MultipleChoiceFilter from '$lib/uiComponents/Filter/MultipleChoice/MultipleChoiceFilter.svelte'
	import Table from '$lib/uiComponents/Table/Table.svelte'
	import type { TableRow } from './tableRowsData'
	import { tableRowsData as rowsData } from './tableRowsData'
	import ColumnConfig from '$lib/uiComponents/Table/ColumnConfig'
	import ColumnNamesHead from '$lib/uiComponents/Table/tableHeaders/ColumnNamesHead.svelte'
	import FilterControls from '$lib/uiComponents/Table/tableHeaders/FilterControls.svelte'

	const filterComposition = new FilterComposition()
	const composedFilterFunction = filterComposition.applyComposedFilters

	const veranstaltungsFilter = filterComposition.createFilterInComposition()
	veranstaltungsFilter.set_getFilterableData((row: TableRow) => row.veranstaltung)
	const veranstaltungen = rowsData.map((row: TableRow) => row.veranstaltung)
	const veranstaltungsFilterConfig = new FilterComponentConfig(MultipleChoiceFilter, {
		caption: 'Veranstaltung',
		possibleChoices: veranstaltungen,
		filter: veranstaltungsFilter
	})

	const gruppenFilter = filterComposition.createFilterInComposition()
	gruppenFilter.set_getFilterableData((row: TableRow) => row.gruppen)
	const gruppen = [...new Set(rowsData.map((row: TableRow) => row.gruppen))]
	const gruppenFilterConfig = new FilterComponentConfig(MultipleChoiceFilter, {
		caption: 'Gruppen',
		possibleChoices: gruppen,
		filter: gruppenFilter
	})

	const columnConfigs = [
		new ColumnConfig((row) => row.veranstaltung, 'Veranstaltung'),
		new ColumnConfig((row) => row.gruppen, 'Gr.'),
		new ColumnConfig((row) => row.ort, 'Ort'),
		new ColumnConfig((row) => row.campus, 'Campus'),
		new ColumnConfig((row) => row.lehrenden, 'Lehrenden', 30)
	]
	const filterConfigs = [veranstaltungsFilterConfig, gruppenFilterConfig]
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-xl-6">
		<FilterControls {filterConfigs} {filterComposition} />
		<Table {rowsData} {columnConfigs} {composedFilterFunction}>
			<ColumnNamesHead {columnConfigs} />
		</Table>
	</div>
</div>
