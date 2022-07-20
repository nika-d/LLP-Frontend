<script lang="ts">
	export let lehrendeOverflow = 'hidden'
	export let einrichtungOverflow = 'hidden'
</script>

<div class="row justify-content-center gx-0 pb-1">
	<div class="col pe-1 action-col">
		<slot name="errors" />
	</div>
	<div class={'col-auto text-nowrap overflow-' + lehrendeOverflow}>
		<slot name="lehrende" />
	</div>
	<div class={'col-auto ps-2 text-nowrap overflow-' + einrichtungOverflow}>
		<slot name="einrichtung" />
	</div>
	<div class="col ps-1 action-col">
		<slot name="action1" />
	</div>
	<div class="col action-col">
		<slot name="action2" />
	</div>
</div>

<style lang="scss">
	@use '../../../uiDesign/basics/bootstrapConfig' as *;

	.action-col {
		width: 2 * $font-size-base;
	}
</style>
