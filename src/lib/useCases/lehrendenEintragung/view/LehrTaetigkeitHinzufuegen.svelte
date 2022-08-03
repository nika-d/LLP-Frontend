<script lang="ts">
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'
	import ProgressIndicator from '$lib/uiComponents/ProgressIndicator.svelte'
	import { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
	import { apiStatusConstants } from '$lib/models/api/apiConstants'
	import ErrorIndicator from '$lib/uiComponents/ErrorIndicator.svelte'
	import type AutoCompleteItemLehrendeType from '../viewModel/dataTypes/AutoCompleteItemLehrendeType'
	import type AutoCompleteItemEinrichtungType from '../viewModel/dataTypes/AutoCompleteItemEinrichtungType'
	import LehrTaetigkeitenLayout from './LehrTaetigkeitenLayout.svelte'
	import { getContext } from 'svelte'
	import contextKeys from '../viewModel/contextModels'
	import type Lehrende from '../viewModel/Lehrende'
	import type AutoCompleteItemsEinrichtungen from '../viewModel/AutoCompleteItemsEinrichtungen'
	import { multiPasteControl, multiPasteEntry } from '../viewModel/LehrTaetigkeitForMultiPaste'
	import { get } from 'svelte/store'
	import { LehrTaetigkeit } from '../viewModel/LehrTaetigkeit'

	export let lehrTaetigkeitHinzufuegenAPI: (
			lehrendeId: string,
			einrichtungsId: string
		) => ApiStatusModel,
		existingLehrende: Array<LehrTaetigkeit> = []

	const lehrende: Lehrende = getContext(contextKeys.lehrende),
		einrichtungen: AutoCompleteItemsEinrichtungen = getContext(
			contextKeys.autoCompleteItemsEinrichtungen
		)

	let einrichtungCandidates: AutoCompleteItemEinrichtungType[] = [],
		gewaehlteLehrende: AutoCompleteItemLehrendeType,
		gewaehlteEinrichtung: AutoCompleteItemEinrichtungType,
		apiStatus: ApiStatusModel = new ApiStatusModel(apiStatusConstants.INITIAL),
		einrichtungPlaceholderText: string,
		nichtHinzufuegbar: AutoCompleteItemLehrendeType

	function resetComponent() {
		nichtHinzufuegbar = null
		einrichtungPlaceholderText = lehrendenEintragungTexts.KEINE_EINRICHTUNG
		apiStatus.reinitialize()
	}
	resetComponent()

	function resetInput() {
		gewaehlteLehrende = null
		gewaehlteEinrichtung = null
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

	$: if ($apiStatus.isOk) {
		resetComponent()
		resetInput()
	}

	$: if ($apiStatus.isInitial) resetComponent()

	$: if ($apiStatus.isError && !nichtHinzufuegbar) nichtHinzufuegbar = gewaehlteLehrende

	$: if (nichtHinzufuegbar && gewaehlteLehrende != nichtHinzufuegbar) {
		resetComponent()
		resetInput()
	}

	let multiPasteTaetigkeitAlreadyExists: boolean

	$: {
		let existingLehrtaetigkeitTypes = existingLehrende.map((lehrTaetigkeit) => get(lehrTaetigkeit))
		multiPasteTaetigkeitAlreadyExists = existingLehrtaetigkeitTypes.some(
			(lehrTaetigkeit) => lehrTaetigkeit.lehrendeName === $multiPasteEntry.lehrendeName
		)
	}

	$: if (!multiPasteTaetigkeitAlreadyExists) {
		gewaehlteLehrende = $lehrende.find(
			(lehrender) => lehrender.model.vollerName === $multiPasteEntry.lehrendeName
		)
		gewaehlteEinrichtung = $multiPasteEntry.einrichtung
	}

	$: if (gewaehlteLehrende && gewaehlteEinrichtung && $multiPasteControl) doApiCall()
</script>

<LehrTaetigkeitenLayout lehrendeOverflow="visible" einrichtungOverflow="visible">
	<span slot="errors">
		{#if $apiStatus.isError}
			<ErrorIndicator fehlerText={$apiStatus.errorMessage} />
		{/if}
	</span>
	<div class="lehrendenSelectInput" slot="lehrende">
		<AutoComplete
			bind:selectedItem={gewaehlteLehrende}
			items={$lehrende}
			placeholder={lehrendenEintragungTexts.LEHRENDE}
			width="8rem"
			bubbleFocus
			on:focus={resetComponent}
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
		{#if !$apiStatus.isPending}
			<button
				on:click={() => {
					resetComponent()
					resetInput()
				}}
				class="btn btn-xs btn-ghost"
				type="button"
			>
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
		{#if $apiStatus.isPending}
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
