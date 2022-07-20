<script lang="ts">
	import Chip from '../../../uiComponents/Chip.svelte'
	import Filter from '../../../uiComponents/Filter/Filter'
	import texts from '../../../uiTexts/lehrendenEintragung.json'

	export let filter: Filter,
		applied = false

	$: if (applied)
		filter.set_filter((lehrendesFehlt) => {
			return lehrendesFehlt === applied
		})
	else filter.set_filter(() => true)
</script>

<Chip option={texts.LEHRENDE_FEHLT} bind:active={applied} />
