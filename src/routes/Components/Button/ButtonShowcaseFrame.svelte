<div class="bg-light-grey p-4 pb-1 text-center">
	<div><slot name="button" /></div>
	<div class="small-font pt-2">
		<slot name="description" />
	</div>
</div>

<style lang="scss">
	@use '../../../lib/uiDesign/basics/colors' as c;

	.bg-light-grey {
		background-color: c.$grey_pantone_430_009;
	}

	.small-font {
		color: c.$text_02_medium;
		font-size: 0.75rem;
	}
</style>
