<svelte:options accessors />

<script lang="ts">
	export let option = '',
		active = false,
		disabled = false

	const toggle = () => {
		if (!disabled) active = !active
	}

	$: active = disabled ? false : active
</script>

<div
	class="chip c-text-inputs d-inline-flex align-items-center"
	class:active
	class:disabled
	on:click={toggle}
	data-testid="chip"
	role="checkbox"
	aria-checked={active}
>
	{option}
</div>

<style lang="scss">
	@use '../uiDesign/basics/sizingOverwritingBootstrap' as sizing;
	@use '../uiDesign/basics/colors' as colors;

	.chip {
		cursor: pointer;
		color: colors.$blue_pantone_293_100;
		box-sizing: border-box;
		border: 1px solid transparent;
		padding-left: sizing.$font-size-base;
		padding-right: sizing.$font-size-base;
		background-color: colors.$blue_pantone_293_012;
		border-radius: 100px;
		min-height: 2.3 * sizing.$font-size-base;
		user-select: none;
	}

	.active {
		border: 1px solid colors.$blue_pantone_293_100;
	}

	.disabled {
		border: 1px solid colors.$grey_pantone_430_100 !important;
		background-color: colors.$grey_pantone_430_009 !important;
		color: colors.$grey_pantone_430_100 !important;
		cursor: not-allowed !important;
	}
</style>
