<script lang="ts">
	export let specialData,
		nummer = 0,
		zeitspanne = null
</script>

<div class="somestyling">
	{specialData}
	{nummer > 0 ? nummer : ''}
	{zeitspanne ?? ''}
</div>

<style>
	.somestyling {
		color: pink;
	}
</style>
