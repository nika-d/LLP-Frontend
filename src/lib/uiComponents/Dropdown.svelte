<script lang="ts">
	import randomId from '$lib/common/randomId'
	import Badge from './Badge.svelte'

	export let buttonText = ' ',
		badgeText = ''

	let id = randomId()
</script>

<span class="dropdown">
	<button class="dropdown-toggle btn c-text-input" type="button" {id} data-bs-toggle="dropdown">
		{buttonText}

		{#if badgeText}
			<Badge>
				{badgeText}
			</Badge>
		{/if}
	</button>
	<div class="dropdown-menu" aria-labelledby={id}>
		<slot name="dropdown-items" />
	</div>
</span>
