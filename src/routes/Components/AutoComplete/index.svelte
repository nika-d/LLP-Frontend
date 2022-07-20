<script>
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import CustomAutocompleteItem from './CustomAutocompleteItem.svelte'
	import longItemsList from './longItemsList.ts'

	let selectedItem
	let items = longItemsList

	let customSelectedItem, customSelectedItem2
	let customItems = [
		{ code: 'c', name: 'circle', icon: '\uef4a', labelWithLetterAtStart: 'c circle' },
		{ code: 'r', name: 'rectangle', icon: '\ueb54', labelWithLetterAtStart: 'r rectangle' },
		{ code: 't', name: 'triangle', icon: '\ue86b', labelWithLetterAtStart: 't triangle' }
	]
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-auto">
		<h5>Platzsparendes Autocomplete-Feld</h5>

		<p>1) Einfachste Version:</p>

		<AutoComplete bind:selectedItem {items} />
		<div>
			Eingabe: {selectedItem ? selectedItem.label : ''}
		</div>

		<p class="pt-3">2) Mit Zusatzinfos bei den Optionen, und allen Props:</p>

		<AutoComplete
			bind:selectedItem={customSelectedItem}
			itemComponent={CustomAutocompleteItem}
			items={customItems}
			labelFieldName="labelWithLetterAtStart"
			placeholder="custom select"
			width="180px"
		/>
		<div>
			Eingabe: {customSelectedItem ? customSelectedItem.name : ''}
		</div>

		<p class="pt-3">2) Dropdown rechts ausgerichtet:</p>

		<AutoComplete
			bind:selectedItem={customSelectedItem2}
			itemComponent={CustomAutocompleteItem}
			items={customItems}
			labelFieldName="labelWithLetterAtStart"
			placeholder="custom select"
			width="180px"
			alignRight
		/>
		<div>
			Eingabe: {customSelectedItem2 ? customSelectedItem2.name : ''}
		</div>
	</div>
</div>
