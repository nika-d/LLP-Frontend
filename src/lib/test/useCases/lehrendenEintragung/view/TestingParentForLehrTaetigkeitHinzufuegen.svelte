<script>
	import { setContext } from 'svelte'
	import contextKeys from '$lib/useCases/lehrendenEintragung/viewModel/contextModels'
	import LehrTaetigkeitHinzufuegen from '$lib/useCases/lehrendenEintragung/view/LehrTaetigkeitHinzufuegen.svelte'

	export let lehrende = undefined,
		einrichtungen = undefined,
		existingLehrende,
		lehrTaetigkeitHinzufuegenAPISpy

	setContext(contextKeys.lehrende, lehrende)
	setContext(contextKeys.autoCompleteItemsEinrichtungen, einrichtungen)
</script>

<LehrTaetigkeitHinzufuegen
	{existingLehrende}
	lehrTaetigkeitHinzufuegenAPI={lehrTaetigkeitHinzufuegenAPISpy}
/>
