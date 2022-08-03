<script lang="ts">
	import LehrTaetigkeitAnzeigen from './LehrTaetigkeitAnzeigen.svelte'
	import LehrTaetigkeitHinzufuegen from './LehrTaetigkeitHinzufuegen.svelte'
	import type { LehrTaetigkeiten } from '../viewModel/LehrTaetigkeiten'

	export let lehrenden: LehrTaetigkeiten
</script>

<div class="lehrtaetigkeiten-zelle">
	{#each $lehrenden as lehrTaetigkeit}
		<LehrTaetigkeitAnzeigen {lehrTaetigkeit} deleteLehrtaetigkeit={lehrenden.deletePerApi} />
	{/each}
	<LehrTaetigkeitHinzufuegen
		lehrTaetigkeitHinzufuegenAPI={lehrenden.hinzufuegenPerApi}
		existingLehrende={$lehrenden}
	/>
</div>

<style lang="scss">
	@use '../../../uiDesign/basics/sizing' as sizing;

	.lehrtaetigkeiten-zelle {
		max-width: 25rem;
		min-width: 22rem;
	}
</style>
