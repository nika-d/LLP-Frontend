<script>
	export let columnConfigs, sortFunction

	let sortColumnIndex = 0

	$: sortFunction = columnConfigs[sortColumnIndex].sortFunction
		? columnConfigs[sortColumnIndex].sortFunction
		: () => 0 // default function for working with array.sort, see index.svelte

	/*(a, b) => {
  return a[sortColumn] < b[sortColumn] ? -1 : a[sortColumn] > b[sortColumn] ? 1 : 0
}*/

	//todo idee: sortieren nach studienstruktur, d.h. wenn z.b. nach modul sortiert wird, ist ja eh gleichzeitig nach fachsemester sortiert
</script>

<tr>
	{#each columnConfigs as columnConfig, columnIndex}
		<th
			on:click={() =>
				(sortColumnIndex = columnConfigs[columnIndex].sortFunction ? columnIndex : sortColumnIndex)}
		>
			{columnConfig.displayName}
			{sortColumnIndex === columnIndex ? '↓' : ''}
		</th>
	{/each}
</tr>
