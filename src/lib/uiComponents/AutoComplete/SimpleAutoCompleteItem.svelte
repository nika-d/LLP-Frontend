<script lang="ts">
	export let label: string, item: unknown
</script>

{@html label}
{#if false}
	{@html item}
{/if}
