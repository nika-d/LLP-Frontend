<svelte:options accessors />

<script lang="ts">
	import AutoComplete from '../../../uiComponents/AutoComplete/AutoComplete.svelte'

	export let eventHeard = false,
		listeningFunction = () => (eventHeard = true)
</script>

<div data-testid="outerDiv">
	<AutoComplete bubbleFocus on:focus={listeningFunction} placeholder="innerSomething" />
</div>
