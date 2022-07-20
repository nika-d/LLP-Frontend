<script lang="ts">
	import LehrTaetigkeitAnzeigen from './LehrTaetigkeitAnzeigen.svelte'
	import LehrTaetigkeitHinzufuegen from './LehrTaetigkeitHinzufuegen.svelte'
	import { LehrTaetigkeiten } from '../viewModel/LehrTaetigkeiten'
	import Lehrende from '../viewModel/Lehrende'
	import { getContext } from 'svelte'
	import * as contextKeys from '../viewModel/contextModels'
	import AutoCompleteItemsEinrichtungen from '../viewModel/AutoCompleteItemsEinrichtungen'

	export let lehrenden: LehrTaetigkeiten

	const lehrende: Lehrende = getContext(contextKeys.lehrende),
		einrichtungen: AutoCompleteItemsEinrichtungen = getContext(contextKeys.autoCompleteItemsEinrichtungen)
</script>

<div class="lehrtaetigkeiten-zelle">
	{#each $lehrenden as lehrTaetigkeit}
		<LehrTaetigkeitAnzeigen {lehrTaetigkeit} />
	{/each}
	<LehrTaetigkeitHinzufuegen
		lehrTaetigkeitHinzufuegenAPI={lehrenden.hinzufuegenPerApi}
		{lehrende}
		{einrichtungen}
	/>
</div>

<style lang="scss">
	@use '../../../uiDesign/basics/sizing' as sizing;

	.lehrtaetigkeiten-zelle {
		max-width: 25rem;
		min-width: 22rem;
	}
</style>
