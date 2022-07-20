<script lang="ts">
	import Table from '$lib/uiComponents/Table/Table.svelte'
	import { tableRowsData as simpleRowsData, simpleColumnConfigs } from './tableRowsData'
	import ColumnNamesHead from '$lib/uiComponents/Table/tableHeaders/ColumnNamesHead.svelte'
	import {
		columnConfigs,
		createFilterForSecondRow,
		filterComposition,
		rowsData
	} from '$lib/test/uiComponents/Table/testData'

	createFilterForSecondRow(filterComposition)
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-auto">
		<h3>Erstes Beispiel</h3>
		<p>Tabelle mit unauffälligem Stil.</p>
		<div>
			<Table rowsData={simpleRowsData} columnConfigs={simpleColumnConfigs}>
				<ColumnNamesHead columnConfigs={simpleColumnConfigs} />
			</Table>
		</div>
	</div>
	<div class="col-auto">
		<h3>Zweites Beispiel</h3>
		<p>
			Hier eine Tabelle mit einer Unterkomponente für die Daten der ersten Spalte. Die Daten werden
			gefiltert, und damit sollten hier 2 Zeilen mit Daten zu sehen sein.
		</p>
		<div>
			<Table
				{rowsData}
				{columnConfigs}
				composedFilterFunction={filterComposition.applyComposedFilters}
			/>
		</div>
	</div>
</div>
