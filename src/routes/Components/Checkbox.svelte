<script>
	import Checkbox from '$lib/uiComponents/Checkbox.svelte'
	import { onDestroy, onMount } from 'svelte'
	let checked, value, autoToggled, autoChecked

	let timeoutId = 0
	function toggle() {
		autoToggled.toggle()
		timeoutId = setTimeout(toggle, 1000)
	}
	onMount(toggle)
	onDestroy(() => clearTimeout(timeoutId))
</script>

<div class="row h-100 justify-content-center align-content-center">
	<div class="col-md-6 bg-light pt-3">
		<p>
			Hier ist eine {#if !checked} unchecked {:else} checked {/if} Checkbox:
			<Checkbox option="Yay check!" bind:checked bind:value />
			Der Typ des ausgewählten Werts ist {#if checked}{typeof value}.{:else} ... {/if}
		</p>
		<p>
			Hier ist eine {#if !autoChecked} unchecked {:else} checked {/if} Checkbox:
			<Checkbox
				bind:this={autoToggled}
				bind:checked={autoChecked}
				option={'toggled automagically'}
			/>
		</p>
	</div>
</div>
