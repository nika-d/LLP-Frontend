<script>
	import allgemeinTexts from '$lib/uiTexts/allgemein.json'
	import ShortOkIndicator from '$lib/uiComponents/ShortOkIndicator.svelte'
	import ProgressIndicator from '$lib/uiComponents/ProgressIndicator.svelte'
	import ErrorIndicator from '$lib/uiComponents/ErrorIndicator.svelte'
</script>

<div class="row h-100 justify-content-center align-content-center">
	<div class="col-md-6 bg-light pt-3">
		<div>
			<p>
				Indicators sind in der LLP kleine Elemente mit Icon. Beispiele für konkrete Indicators sind
				ProgressIndicator, ErrorIndicator und ShortOkIndicator (der letzte blinkt nur kurz auf):
				<ProgressIndicator />
				<ErrorIndicator fehlerText="Hier kann eine Fehlermeldung drinstehen" />
				<ShortOkIndicator />
			</p>
			<p>
				Sie sind dazu gedacht, in zusammengesetzten Views häufig vorzukommen. Deswegen sollen sie
				einheitlich gelayoutet sein, vgl. css-Klasse .material-icons. Auf diese Weise werden die
				verschiedenen Indicators z.B. in einem Eingabeformular gut angeordnet, ohne dass jeder
				einzelne Indicator noch viele Layoutklassen bräuchte.
			</p>
			<p>
				Beispiel: Wenn ein informatives Icon und ein Icon auf einem Button nahe nebeneinander
				auftreten (z.B. in einem Formular), dann sollten diese Icons gleich groß und gleich
				gelayoutet im Bezug auf Text/Zeile sein.
			</p>
		</div>

		<div class="d-flex justify-content-center">
			<div class="grid">
				<div>
					Hier ist ein Button:
					<span class="button-in-zeile">
						<button class="btn btn-xs btn-ghost" type="button">
							<span class="material-icons">{allgemeinTexts.SPEICHERN_ICON}</span>
						</button>
					</span>
				</div>
				<div>
					Hier ist ein Info-Icon:
					<span class="material-icons">{allgemeinTexts.SPEICHERN_ICON}</span>
				</div>
				<div>
					Hier ist der "Short Ok Indicator":
					<ShortOkIndicator />
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../lib/uiDesign/basics/bootstrapConfig' as v;

	$lineHeightInPx: v.$line-height-base * v.$font-size-base;

	.grid {
		display: inline-block;
		margin: 0 auto $lineHeightInPx auto;
		background-size: $lineHeightInPx $lineHeightInPx;
		background-image: linear-gradient(to bottom, grey 1px, transparent 1px);
		padding: v.$font-size-base;
		padding-top: 0;
	}

	.button-in-zeile {
		display: inline-block;
		vertical-align: 2px;
	}
</style>
