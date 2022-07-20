<script lang="ts">
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'

	import ProgressIndicator from '$lib/uiComponents/ProgressIndicator.svelte'
	import { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
	import { apiStatusContants } from '$lib/models/api/apiConstants'
	import ErrorIndicator from '$lib/uiComponents/ErrorIndicator.svelte'
	import AutoCompleteItemLehrendeType from '../viewModel/dataTypes/AutoCompleteItemLehrendeType'
	import AutoCompleteItemEinrichtungType from '../viewModel/dataTypes/AutoCompleteItemEinrichtungType'
	import LehrTaetigkeitenLayout from './LehrTaetigkeitenLayout.svelte'
	import Lehrende from '../viewModel/Lehrende'
	import AutoCompleteItemsEinrichtungen from '../viewModel/AutoCompleteItemsEinrichtungen'

	export let lehrTaetigkeitHinzufuegenAPI: (
			lehrendeId: string,
			einrichtungsId: string
		) => ApiStatusModel,
		lehrende: Lehrende,
		einrichtungen: AutoCompleteItemsEinrichtungen

	let einrichtungCandidates: AutoCompleteItemEinrichtungType[] = [],
		gewaehlteLehrende: AutoCompleteItemLehrendeType,
		gewaehlteEinrichtung: AutoCompleteItemEinrichtungType,
		apiStatus: ApiStatusModel,
		einrichtungPlaceholderText: string

	reset()

	function reset() {
		gewaehlteLehrende = null
		gewaehlteEinrichtung = null
		einrichtungPlaceholderText = lehrendenEintragungTexts.KEINE_EINRICHTUNG
		apiStatus = new ApiStatusModel(apiStatusContants.INITIAL)
	}

	function doApiCall() {
		if (gewaehlteLehrende)
			apiStatus = lehrTaetigkeitHinzufuegenAPI(
				gewaehlteLehrende.id,
				gewaehlteEinrichtung ? gewaehlteEinrichtung.id : null
			)
	}

	function einrichtungAutoSelect() {
		gewaehlteEinrichtung = null
		if (einrichtungCandidates.length >= 2) {
			einrichtungPlaceholderText = lehrendenEintragungTexts.EINRICHTUNG_BITTE_WAEHLEN
		} else if (einrichtungCandidates.length == 1) {
			gewaehlteEinrichtung = einrichtungCandidates[0]
		} else if (gewaehlteLehrende) {
			einrichtungPlaceholderText = lehrendenEintragungTexts.KEINE_EINRICHTUNG
		}
	}

	$: {
		einrichtungCandidates =
			gewaehlteLehrende != null
				? gewaehlteLehrende.model.einrichtungsIds.map((id) =>
						$einrichtungen.find((e) => e.id === id)
				  )
				: []
		einrichtungAutoSelect()
	}

	$: if ($apiStatus.ok) reset()
</script>

<LehrTaetigkeitenLayout lehrendeOverflow="visible" einrichtungOverflow="visible">
	<span slot="errors">
		{#if $apiStatus.error}
			<ErrorIndicator fehlerText={$apiStatus.errorMessage} />
		{/if}
	</span>
	<div slot="lehrende">
		<AutoComplete
			bind:selectedItem={gewaehlteLehrende}
			items={$lehrende}
			placeholder={lehrendenEintragungTexts.LEHRENDE}
			width="8rem"
		/>
	</div>
	<span slot="einrichtung">
		<AutoComplete
			bind:selectedItem={gewaehlteEinrichtung}
			items={einrichtungCandidates}
			placeholder={einrichtungPlaceholderText}
			width="8rem"
			alignRight
		/>
	</span>
	<span
		class="d-inline-block button-span flex-columns d-flex align-items-center justify-content-center"
		slot="action1"
	>
		{#if !$apiStatus.pending}
			<button on:click={reset} class="btn btn-xs btn-ghost" type="button">
				<span class="material-icons" title={allgemeinTexts.ABBRECHEN}>
					{allgemeinTexts.ABBRECHEN_ICON}
				</span>
			</button>
		{/if}
	</span>
	<span
		class="d-inline-block button-span flex-columns d-flex align-items-center justify-content-center"
		slot="action2"
	>
		{#if $apiStatus.pending}
			<ProgressIndicator />
		{:else}
			<button on:click={doApiCall} class="btn btn-xs btn-ghost" type="button">
				<span class="material-icons" title={allgemeinTexts.SPEICHERN}>
					{allgemeinTexts.SPEICHERN_ICON}
				</span>
			</button>
		{/if}
	</span>
</LehrTaetigkeitenLayout>

<style lang="scss">
	.button-span {
		vertical-align: 3px;
		align-items: center;
	}
</style>
