<script lang="ts">
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'
	import { checkIfNonPrimitiveObjectContainsTexts } from './Filter/helperMethods'
	import Filter from './Filter/Filter'

	export let placeholder: string = allgemeinTexts.SUCHE,
		filter: Filter<object>,
		width: string = null //mit Einheit, z.B. "10rem" - Einheiten px, rem, em gehen gut, - % nicht benutzen, stattdessen Eltern-div mit Bootstrap col´s

	let inputValue = '',
		searchinfocus = false,
		timeout = null

	function setSearchTimeout() {
		clearTimeout(timeout)
		timeout = setTimeout(function () {
			setSearchFunction()
		}, 400)
	}

	function setSearchFunction() {
		if (inputValue.length > 0)
			filter.set_filter((candidate: object) =>
				checkIfNonPrimitiveObjectContainsTexts(inputValue.split(' '), candidate)
			)
		else reset()
	}

	function reset() {
		filter.set_filter(() => true)
		inputValue = ''
	}
</script>

<div style={width ? '--this-search-width:' + width : ''} class="search" class:searchinfocus>
	<button on:click={setSearchFunction} class="search-internal-button">
		<span title={allgemeinTexts.SUCHE} class="material-icons">&#xe8b6;</span>
	</button>
	<input
		bind:value={inputValue}
		{placeholder}
		type="search"
		on:focusin={() => (searchinfocus = true)}
		on:focusout={() => (searchinfocus = false)}
		on:keyup={() => setSearchTimeout()}
	/>
	<button on:click={reset} class="search-internal-button">
		<span title={allgemeinTexts.ABBRECHEN} class="material-icons">&#xe5c9;</span>
	</button>
</div>
