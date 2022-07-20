<script>
	import { fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'

	let timeToggle = true
	onMount(async () => {
		timeToggle = false
	})
</script>

{#if timeToggle}
	<span
		out:fade={{ duration: 2000 }}
		class="material-icons text-primary"
		title={allgemeinTexts.OK}
		role="status"
		data-cy="short-ok-indicator"
	>
		&#xE876;
	</span>
{/if}
