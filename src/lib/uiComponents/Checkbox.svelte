<script lang="ts">
	import randomId from '$lib/common/randomId'

	export let option: unknown = '',
		checked = false,
		value: unknown = null

	export const toggle = () => (checked = !checked)

	const labelText = option,
		id: string = randomId()

	$: if (checked) value = option
	else value = null
</script>

<div class="form-check">
	<input class="form-check-input" {id} type="checkbox" value="" bind:checked />
	<label class="form-check-label" for={id} on:click={(e) => e.stopPropagation()}>
		{labelText}
	</label>
</div>
