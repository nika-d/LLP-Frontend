<script lang="ts">
	import ColumnConfig from './ColumnConfig'
	import type { Readable } from 'svelte/store'
	import { readable } from 'svelte/store'
	import type { FilterFunctionType } from '../Filter/Filter'

	export let rowsData: Array<unknown>,
		columnConfigs: ColumnConfig[],
		composedFilterFunction: Readable<FilterFunctionType<unknown>> = readable(() => true)

	let filter

	$: filter = $composedFilterFunction
</script>

<table class="table">
	<colgroup>
		{#each columnConfigs as config}
			<col
				style={config.widthInPercentOfTableWidth &&
					'width: ' + config.widthInPercentOfTableWidth + '%;'}
			/>
		{/each}
	</colgroup>
	<thead class="table-light">
		<slot />
	</thead>
	<tbody>
		{#each rowsData as rowData}
			<tr class:d-none={!filter(rowData)}>
				{#each columnConfigs as config}
					<td>
						{#if config.cellComponent}
							<svelte:component this={config.cellComponent} {...rowData} />
						{:else}
							{config.valueFromRowGetterFunction(rowData)}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="css">
	thead {
		font-variant-caps: all-small-caps;
		color: #a0a5a9;
		font-weight: bold;
	}
</style>
