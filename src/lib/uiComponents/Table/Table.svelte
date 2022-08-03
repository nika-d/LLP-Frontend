<script lang="ts">
	import type ColumnConfig from './ColumnConfig'
	import tags from '../../../../cypress/support/data-cy'

	export let rowsData: Array<unknown>, columnConfigs: ColumnConfig[]
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
			<tr data-cy={tags.TABLE_ROW}>
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
