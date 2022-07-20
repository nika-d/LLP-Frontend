<script>
	import ButtonShowcaseFrame from './ButtonShowcaseFrame.svelte'
</script>

<div class="row h-100 justify-content-center align-items-center">
	<div class="col-8">
		<div class="row row-cols-auto g-3">
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> contained_label medium </span>
					<button class="btn" slot="button" type="button">Filter öffnen</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> contained_label large </span>
					<button class="btn btn-lg" slot="button" type="button">Filter öffnen</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> outlined medium </span>
					<button slot="button" class="btn btn-outline-primary" type="button">
						<span class="material-icons">&#xe80d;</span>
						Share
					</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> outlined_label small </span>
					<button slot="button" class="btn btn-sm btn-outline-primary" type="button"
						>Filter öffnen</button
					>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> ghost_label medium </span>
					<button slot="button" class="btn btn-ghost" type="button">Filter öffnen</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> ghost_label small </span>
					<button slot="button" class="btn btn-ghost btn-sm" type="button">Filter öffnen</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> contained_icon small </span>
					<button slot="button" class="btn btn-sm" type="button">
						<span class="material-icons">&#xe868;</span>
					</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> outlined_icon medium </span>
					<button slot="button" class="btn btn-outline-primary" type="button">
						<span class="material-icons">&#xe934;</span>
					</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> ghost_icon large </span>
					<button slot="button" class="btn btn-ghost btn-lg" type="button">
						<span class="material-icons">&#xe876;</span>
					</button>
				</ButtonShowcaseFrame>
			</div>
			<div class="col">
				<ButtonShowcaseFrame>
					<span slot="description"> ghost_icon extra small </span>
					<div slot="button">
						<button class="btn btn-ghost btn-xs" type="button">
							<span class="material-icons">&#xe876;</span>
						</button>
						<button class="btn btn-ghost btn-xs" type="button">
							<span class="material-icons">&#xe934;</span>
						</button>
						<button class="btn btn-ghost btn-xs" type="button">
							<span class="material-icons">&#xe868;</span>
						</button>
						<button class="btn btn-ghost btn-xs" type="button">
							<span class="material-icons">&#xe80d;</span>
						</button>
					</div>
				</ButtonShowcaseFrame>
			</div>
		</div>
		<div class="row-cols-auto pt-3">
			In den Fällen, in denen es Bootstrap- und Pattern-Library-Bezeichnungen für das gleiche
			Styling gab, sind synonyme Klassen definiert, z.B. btn-outline-primary und c-button-outlined.
		</div>
	</div>
</div>
