<script lang="ts">
	import LehrTaetigkeitenLayout from './LehrTaetigkeitenLayout.svelte'
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import { LehrTaetigkeit } from '../viewModel/LehrTaetigkeit'
	import { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
	import ShortOkIndicator from '$lib/uiComponents/ShortOkIndicator.svelte'
	import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
	import ErrorIndicator from '$lib/uiComponents/ErrorIndicator.svelte'
	import ProgressIndicator from '$lib/uiComponents/ProgressIndicator.svelte'

	export let lehrTaetigkeit: LehrTaetigkeit

	let errorResetDone = false
	let gewaehlteEinrichtung = $lehrTaetigkeit.einrichtung
	let apiStatus: ApiStatusModel

	let placeholder: string =
		$lehrTaetigkeit.einrichtungAutocompleteCandidates.length > 0
			? lehrendenEintragungTexts.EINRICHTUNG_BITTE_WAEHLEN
			: lehrendenEintragungTexts.KEINE_EINRICHTUNG

	$: if (
		$lehrTaetigkeit.einrichtung != gewaehlteEinrichtung &&
		gewaehlteEinrichtung &&
		(!$lehrTaetigkeit.einrichtung || $lehrTaetigkeit.einrichtung.id != gewaehlteEinrichtung.id)
	) {
		errorResetDone = false
		apiStatus = lehrTaetigkeit.einrichtungSetzenPerApi(gewaehlteEinrichtung.id)
	}

	$: if ($apiStatus?.error && !errorResetDone) {
		gewaehlteEinrichtung = $lehrTaetigkeit.einrichtung
		errorResetDone = true
	}
</script>

<LehrTaetigkeitenLayout einrichtungOverflow="visible">
	<span class="d-inline-block lehrende" slot="lehrende">
		{$lehrTaetigkeit.lehrendeName}
	</span>
	<span slot="einrichtung">
		<AutoComplete
			bind:selectedItem={gewaehlteEinrichtung}
			items={$lehrTaetigkeit.einrichtungAutocompleteCandidates}
			{placeholder}
			width="8rem"
			alignRight
		/>
	</span>
	<span class="d-flex flex-column flex-shrink-1 justify-content-start" slot="action2">
		{#if $apiStatus?.pending}
			<ProgressIndicator />
		{:else if $apiStatus?.ok}
			<ShortOkIndicator />
		{:else if $apiStatus?.error}
			<ErrorIndicator />
		{:else}
			<span class="material-icons" />
		{/if}
	</span>
</LehrTaetigkeitenLayout>

<style lang="scss">
	.lehrende {
		width: 8rem;
	}
</style>
