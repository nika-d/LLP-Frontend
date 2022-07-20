<script lang="ts">
	import { testid } from '$lib/test/useCases/lehrendenEintragung/testData/studienstrukturTestData'

	export let modul: string
	export let veranstaltung: string
	export let lehrformat: string
	export let studiengang: string
	export let fachsemester: string
</script>

<div data-testid={testid}>
	{studiengang}, {fachsemester} <br />
	{modul} <br />
	{lehrformat}
	{#if lehrformat.toLowerCase().search(veranstaltung.toLowerCase()) < 0}
		<br /> {veranstaltung}
	{/if}
</div>
