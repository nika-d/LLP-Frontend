<script lang="ts">
	import Search from '$lib/uiComponents/SearchFilter.svelte'
	import Filter from '$lib/uiComponents/Filter/Filter'

	let checkIfSearchTermsPresent: { (s: Array<string>): boolean } = () => true

	let filter: Filter<Array<string>> = new Filter(
		(updatedFunction) => (checkIfSearchTermsPresent = updatedFunction)
	)

	const textZeilen = [
		'Der Rabe Ralf        ',
		'will will hu hu      ',
		'dem niemand half     ',
		'still still du du    ',
		'half sich allein     ',
		'am Rabenstein        ',
		'will will still still',
		'hu hu                '
	]
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-auto">
		<div class="row">
			<div class="col">
				{#each textZeilen as zeile}
					<p class="text-center lh-1">{zeile}</p>
				{/each}
				<p class="fst-italic text-end">(Christian Morgenstern)</p>
			</div>
		</div>
		<div class="row">
			<div class="col">Suchfeld:</div>
		</div>
		<div class="row justify-content-center">
			<div class="col">
				<Search {filter} placeholder="hier tippen..." width="12rem" />
			</div>
		</div>
		<div class="row">
			<div class="col">Sind die Worte im Gedicht?</div>
		</div>
		<div class="row">
			<div class="col">
				{#if checkIfSearchTermsPresent(textZeilen)}
					<p>Ja.</p>
				{:else}
					<p>Nein.</p>
				{/if}
			</div>
		</div>
	</div>
</div>
