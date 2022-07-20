<script lang="ts">
	import Dropdown from '$lib/uiComponents/Dropdown.svelte'
	import Checkbox from '$lib/uiComponents/Checkbox.svelte'
	import filterTexts from '$lib/uiTexts/filter.json'
	import Filter from '../Filter'
	import mapChoicesToUniqueChoiceViewsModels from './mapChoicesToUniqueChoiceViewsModels'

	export let caption: string,
		possibleChoices: Array<unknown> = [],
		numberOfSelectedChoices: number = possibleChoices.length,
		filter: Filter<unknown>,
		applied = false

	$: applied = numberOfSelectedChoices < possibleChoices.length

	let possibleChoicesUnique = Object.keys(mapChoicesToUniqueChoiceViewsModels(possibleChoices)),
		badgeText = '',
		chosen = possibleChoicesUnique,
		checkboxes: Array<Checkbox> = []

	$: if (!caption && possibleChoicesUnique.length === 0) caption = filterTexts.KEINE_OPTIONEN

	function invertChoices() {
		checkboxes.forEach((checkbox) => checkbox.toggle())
	}

	$: {
		const chosenChoices = chosen.filter((choice) => choice != null)
		numberOfSelectedChoices = chosenChoices.length

		switch (numberOfSelectedChoices) {
			case 0:
				badgeText = filterTexts.KEINE
				break
			case possibleChoicesUnique.length:
				badgeText = filterTexts.ALLE
				break
			default:
				badgeText = numberOfSelectedChoices.toString()
		}

		filter.set_filter((candidate) => chosenChoices.includes(candidate.toString()))
	}
</script>

<Dropdown {badgeText} buttonText={caption}>
	<span slot="dropdown-items">
		{#if possibleChoicesUnique.length > 0}
			<button
				class="btn btn-sm btn-ghost"
				type="button"
				on:click={invertChoices}
				data-filter-target={(caption + '-' + filterTexts.AUSWAHL_UMKEHREN)
					.toLowerCase()
					.replace(' ', '')}
			>
				{filterTexts.AUSWAHL_UMKEHREN}
			</button>

			{#each possibleChoicesUnique as option, i}
				<div
					class="dropdown-item"
					data-filter-target={(caption + '-' + option).toLowerCase().replace(' ', '')}
					on:click={() => checkboxes[i].toggle()}
				>
					<Checkbox bind:this={checkboxes[i]} {option} bind:value={chosen[i]} checked />
				</div>
			{/each}
		{:else}
			{filterTexts.KEINE_OPTIONEN}
		{/if}
	</span>
</Dropdown>
