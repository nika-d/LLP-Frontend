<script>
	import TextInput from '$lib/uiComponents/TextInput.svelte'

	let compactInputValuesArray = ['erstes', 'zweites', '']

	let inputValue
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-auto">
		<div class="row">
			<div class="col">Texteingabefeld für Formulare:</div>
		</div>
		<div class="row justify-content-center mb-5">
			<div class="col-6">
				<div>
					<TextInput bind:value={inputValue} />
				</div>
			</div>
			<div class="col-6">
				Eingegeben: {inputValue}
			</div>
		</div>

		<div class="row">
			<div class="col">
				Platzsparende Texteingabefelder für Formulare mit vielen Eingabefeldern.
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-auto">
				{#each compactInputValuesArray as inputValue}
					<div>
						<TextInput bind:value={inputValue} compact />
					</div>
				{/each}
			</div>
			<div class="col-auto">
				Eingegebene Werte:
				{#each compactInputValuesArray as inputValue}
					<p>{inputValue}</p>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	p {
		margin: 0;
		padding: 0;
		line-height: 1.5;
	}
</style>
