<script lang="ts">
	import AutoComplete from 'simple-svelte-autocomplete'
	import SimpleAutoCompleteItem from './SimpleAutoCompleteItem.svelte'

	export let selectedItem = undefined,
		itemComponent = SimpleAutoCompleteItem,
		items: unknown[] = [],
		placeholder = '',
		labelFieldName = 'label',
		width: string = null, //mit Einheit, z.B. "10rem" - Einheiten px, rem, em gehen gut, - % geht irgendwie nicht so,
		alignRight = false
</script>

<span style={width ? '--this-autocomplete-width:' + width : ''}>
	<AutoComplete
		bind:selectedItem
		className="simple-svelte-autocomplete-overwrite"
		dropdownClassName={'border-0 p-0 autocomplete-dropdown' + (alignRight ? ' float-end' : '')}
		hideArrow
		inputClassName="autocomplete-text-input"
		{items}
		{labelFieldName}
		{placeholder}
	>
		<div let:item let:label slot="item">
			<svelte:component this={itemComponent} {item} {label} />
		</div>
	</AutoComplete>
</span>
