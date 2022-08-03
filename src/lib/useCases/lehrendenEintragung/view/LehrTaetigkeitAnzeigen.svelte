<script lang="ts">
	import LehrTaetigkeitenLayout from './LehrTaetigkeitenLayout.svelte'
	import tags from '../../../../../cypress/support/data-cy'
	import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
	import type { LehrTaetigkeit } from '../viewModel/LehrTaetigkeit'
	import type { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
	import ShortOkIndicator from '$lib/uiComponents/ShortOkIndicator.svelte'
	import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'
	import ErrorIndicator from '$lib/uiComponents/ErrorIndicator.svelte'
	import ProgressIndicator from '$lib/uiComponents/ProgressIndicator.svelte'
	import {
		emptyLehrtaetigkeitType,
		multiPasteControl,
		multiPasteEntry,
		MultiPasteStates
	} from '../viewModel/LehrTaetigkeitForMultiPaste'

	export let lehrTaetigkeit: LehrTaetigkeit,
		deleteLehrtaetigkeit: (lehrtaegkeitID: string) => ApiStatusModel

	let errorResetDone = false,
		gewaehlteEinrichtung = $lehrTaetigkeit.einrichtung,
		apiStatus: ApiStatusModel,
		placeholder: string =
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

	$: if ($apiStatus?.isError && !errorResetDone) {
		gewaehlteEinrichtung = $lehrTaetigkeit.einrichtung
		errorResetDone = true
	}

	function deleteLehrtaetigkeitWithAPICall() {
		apiStatus = deleteLehrtaetigkeit($lehrTaetigkeit.einrichtung.id)
	}

	let multiPasteState = MultiPasteStates.NOT_ACTIVATED

	function insertMultiPasteEntry() {
		multiPasteEntry.set($lehrTaetigkeit)
		multiPasteState = MultiPasteStates.TO_BE_SAVED
	}

	function saveMultiPaste() {
		multiPasteControl.set(true)
		multiPasteState = MultiPasteStates.NOT_ACTIVATED
		setTimeout(() => {
			multiPasteControl.set(false)
			multiPasteEntry.set(emptyLehrtaetigkeitType)
		}, 1)
	}

	function toggleLehrTaetigkeit() {
		switch (multiPasteState) {
			case MultiPasteStates.NOT_ACTIVATED:
				multiPasteState = MultiPasteStates.ACTIVATED
				break
			case MultiPasteStates.ACTIVATED:
			case MultiPasteStates.TO_BE_SAVED:
				multiPasteState = MultiPasteStates.NOT_ACTIVATED
				multiPasteEntry.set(emptyLehrtaetigkeitType)
				break
			default:
				multiPasteState = MultiPasteStates.NOT_ACTIVATED
		}
	}
</script>

<LehrTaetigkeitenLayout einrichtungOverflow="visible">
	<span
		on:click={toggleLehrTaetigkeit}
		class="d-inline-block lehrende cursor-pointer"
		slot="lehrende"
		data-cy={tags.LEHRENDE_NAME_ANZEIGE}
	>
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
	<span
		class="d-inline-block button-span flex-columns d-flex align-items-center justify-content-center"
		slot="action1"
	>
		<button
			on:click={deleteLehrtaetigkeitWithAPICall}
			class="btn btn-xs btn-ghost"
			type="button"
			data-cy={tags.DELETE_BUTTON}
		>
			<span class="material-icons"> delete </span>
		</button>
	</span>
	<span slot="action2">
		{#if multiPasteState === MultiPasteStates.ACTIVATED}
			<button
				data-cy={tags.MULTI_PASTE_INSERT_BUTTON}
				on:click={insertMultiPasteEntry}
				class="btn btn-outline-primary">{lehrendenEintragungTexts.MULTI_PASTE_INSERT}</button
			>
		{:else if multiPasteState === MultiPasteStates.TO_BE_SAVED}
			<button
				data-cy={tags.MULTI_PASTE_SAVE_BUTTON}
				on:click={saveMultiPaste}
				class="btn btn-outline-primary">{lehrendenEintragungTexts.MULTI_PASTE_SAVE}</button
			>
		{/if}
	</span>
	<span class="d-flex flex-column flex-shrink-1 justify-content-start" slot="error">
		{#if $apiStatus?.isPending}
			<ProgressIndicator />
		{:else if $apiStatus?.isOk}
			<ShortOkIndicator />
		{:else if $apiStatus?.isError}
			<ErrorIndicator />
		{/if}
	</span>
</LehrTaetigkeitenLayout>

<style lang="scss">
	.lehrende {
		width: 8rem;
	}

	.cursor-pointer:hover {
		cursor: pointer;
	}
</style>
