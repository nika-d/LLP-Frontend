<script lang="ts">
	import type { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
	import type { TerminType } from '../viewModel/dataTypes/TerminType'
	import Table from '$lib/uiComponents/Table/Table.svelte'
	import ColumnNamesHead from '$lib/uiComponents/Table/tableHeaders/ColumnNamesHead.svelte'
	import { setContext } from 'svelte'
	import contextKeys from '../viewModel/contextModels'
	import FilterControls from '$lib/uiComponents/Table/tableHeaders/FilterControls.svelte'
	import generateColumnConfigs from '../viewModel/generateColumnConfigs'
	import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
	import generateFilterConfigs from '../viewModel/generateFilterConfigs'
	import Lehrende from '../viewModel/Lehrende'
	import AutoCompleteItemsEinrichtungen from '../viewModel/AutoCompleteItemsEinrichtungen'

	export let termine: DerivedItemsStore<TerminType> = undefined,
		lehrende: Lehrende = undefined,
		einrichtungen: AutoCompleteItemsEinrichtungen = undefined

	setContext(contextKeys.lehrende, lehrende)
	setContext(contextKeys.autoCompleteItemsEinrichtungen, einrichtungen)

	const columnConfigs = generateColumnConfigs()

	let rowsData = $termine

	const filterComposition = new FilterComposition(),
		composedFilterFunction = filterComposition.applyComposedFilters,
		filterConfigs = generateFilterConfigs(rowsData, filterComposition)

	let filter = $composedFilterFunction

	let visibleRowsData: Array<TerminType>

	$: {
		filter = $composedFilterFunction
		visibleRowsData = rowsData.filter((rowsData) => filter(rowsData))
	}
</script>

<FilterControls {filterComposition} {filterConfigs} />
<Table {columnConfigs} rowsData={visibleRowsData}>
	<ColumnNamesHead {columnConfigs} />
</Table>
