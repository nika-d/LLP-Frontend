<script lang="ts">
	import MultipleChoiceFilter from '$lib/uiComponents/Filter/MultipleChoice/MultipleChoiceFilter.svelte'
	import { ListenElement } from './ListenElement'
	import Filter from '$lib/uiComponents/Filter/Filter'

	let numberOfSelectedChoices: number

	let filterFunction: unknown = () => true

	let filter = new Filter<Array<unknown>>(
		(updatedFilterFunction) => (filterFunction = updatedFilterFunction)
	)

	const liste = [
		new ListenElement('eins', 1),
		new ListenElement('zwei und "anführungsstriche"', 2),
		new ListenElement('drei', 3),
		new ListenElement('vier', 4)
	]

	let gefilterteListe = liste
	$: gefilterteListe = liste.filter(filterFunction as (value: ListenElement) => boolean)
</script>

<div class="row h-100 justify-content-center align-content-center">
	<div class="col-md-6 pt-3">
		<p>Hier eine Liste:</p>
		<ul>
			{#each liste as element}
				<li>{element.name}</li>
			{/each}
		</ul>
		<MultipleChoiceFilter
			caption="Filter"
			possibleChoices={liste}
			bind:numberOfSelectedChoices
			bind:filter
		/>
		<p>
			Es sind {numberOfSelectedChoices} Element(e) in der UI ausgewählt,<br />
			und damit enthält die Liste {gefilterteListe.length} Elemente:
		</p>
		<ul>
			{#each gefilterteListe as element}
				<li>{element.name}</li>
			{/each}
		</ul>
	</div>
</div>
