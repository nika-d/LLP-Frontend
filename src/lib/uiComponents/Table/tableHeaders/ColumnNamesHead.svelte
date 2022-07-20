<script>
	export let columnConfigs
</script>

<tr>
	{#each columnConfigs.map((config) => config.displayName) as columnName}
		<th>
			{columnName}
		</th>
	{/each}
</tr>

<style lang="scss">
	@use '../../../uiDesign/basics/bootstrapConfig' as *;

	th {
		padding: $spacer * 0.5;
	}
</style>
