<script lang="ts">
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'

	export let value = ''
	export let placeholder: string = allgemeinTexts.EINGABE
	export let compact = false
</script>

<input bind:value class={compact ? 'c-text-input-compact' : ''} {placeholder} type="text" />

<!--
<style lang="scss">
  @use 'src/uiDesign/components/TextInput';
</style>
-->
