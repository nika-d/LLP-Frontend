<script lang="ts">
	import tableTexts from '$lib/uiTexts/Table.json'
	import SearchFilter from '../../SearchFilter.svelte'
	import Badge from '../../Badge.svelte'
	import FilterComposition from '../../Filter/FilterComposition'
	import FilterComponentConfig from '../../Filter/FilterComponentConfig'
	import tags from '../../../../../cypress/support/data-cy'

	export let filterConfigs: FilterComponentConfig[], filterComposition: FilterComposition

	const textSucheFilter = filterComposition.createFilterInComposition()

	let numberOfAppliedFilters = 0

	$: {
		numberOfAppliedFilters = filterConfigs.filter((filter) => filter.applied).length
	}
</script>

<div>
	<div class="d-flex justify-content-between py-2">
		<SearchFilter filter={textSucheFilter} />
		<div>
			<button
				class="btn btn-outline-primary"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#filters"
				aria-expanded="false"
				aria-controls="filters"
				data-testid="numberOfAppliedFilters"
				data-cy={tags.FILTER_CONTAINER_TOGGLE}
			>
				{tableTexts.FILTER_AUF_ZUKLAPPEN}
				<Badge>{numberOfAppliedFilters}</Badge>
			</button>
		</div>
	</div>
	<div class="collapse" id="filters" data-cy={tags.FILTER_CONTAINER}>
		<div class="d-flex flex-wrap py-2">
			{#each filterConfigs as config}
				<div class="d-inline-flex p-1">
					<svelte:component
						this={config.component}
						{...config.props}
						bind:applied={config.applied}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
