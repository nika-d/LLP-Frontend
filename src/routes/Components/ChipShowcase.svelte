<script>
	import Chip from '../../lib/uiComponents/Chip.svelte'
	import Checkbox from '../../lib/uiComponents/Checkbox.svelte'

	let active = false,
		chipDisabled = false,
		enabledChecked = false
</script>

<div class="row h-100 justify-content-center align-content-center">
	<div class="col-md-6 bg-light pt-3">
		<p>
			Hier ist ein
			{#if !active} in-aktiver{:else} aktiver{/if} Chip: <br />
			<Chip option="Aktiver Chip" bind:active />
		</p>
		<p>
			Hier ist eine Checkbox, mit der man den Chip
			{#if chipDisabled} enabled{:else} disabled{/if}
			kann.
			<Checkbox option="Enable chip" bind:checked={chipDisabled} />

			Hier ist der
			{#if enabledChecked} (aktive){:else} (nicht aktive){/if} Chip, der durch die Checkbox
			{#if chipDisabled} enabled{:else} disabled{/if} werden kann.

			<Chip option="Disableable Chip" bind:active={enabledChecked} bind:disabled={chipDisabled} />
		</p>
	</div>
</div>
