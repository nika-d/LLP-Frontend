<script>
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import CustomAutocompleteItem from './AutoComplete/CustomAutocompleteItem.svelte'
	import Dropdown from '$lib/uiComponents/Dropdown.svelte'
	import Checkbox from '$lib/uiComponents/Checkbox.svelte'

	let customSelectedItem
	let customItems = [
		{ code: 'c', name: 'circle', icon: '\uef4a', labelWithLetterAtStart: 'c circle' },
		{ code: 'r', name: 'rectangle', icon: '\ueb54', labelWithLetterAtStart: 'r rectangle' },
		{ code: 't', name: 'triangle', icon: '\ue86b', labelWithLetterAtStart: 't triangle' }
	]
</script>

<div class="row h-100 justify-content-center align-content-center">
	<div class="col-md-6 pt-3">
		<h5 class="pt-5">Einfaches Dropdown</h5>
		<Dropdown buttonText="Klick mich!" badgeText="los!">
			<span slot="dropdown-items">
				<a class="dropdown-item" href=".">Back to Components</a>
				<a class="dropdown-item" href="https://www.youtube.com/watch?v=zK1Wfv_te2Q">Cat content</a>
				<a class="dropdown-item" href="https://minesweeper.online/de/game/1321458011">
					Minesweeper online
				</a>
			</span>
		</Dropdown>
		<h5 class="pt-5">Dropdown-Beispiel mit kompliziertem Inhalt, hier Checkboxes</h5>
		<Dropdown buttonText="Zeig Checkboxes!">
			<span slot="dropdown-items">
				<button class="btn btn-sm btn-ghost" type="button">
					Ich bin ein ghost button (nicht auswählbar, aber klickbar).
				</button>
				<div class="dropdown-item">
					<Checkbox option="Default checkbox" />
				</div>
				<div class="dropdown-item">
					<Checkbox option="Checked checkbox" checked />
				</div>
			</span>
		</Dropdown>
		<h5 class="pt-5">Zum Vergleich, ein Autocomplete</h5>
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
	</div>
</div>
