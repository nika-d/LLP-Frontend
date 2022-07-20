<script lang="ts">
	import type { MenuContent } from './typesForNavigation'
	import pictureOnTop from '../ChariteColorsInACircle.png'

	export let menuContent: MenuContent

	let navMenuOpenedOnMobile = true

	function handleNavMenuOpenedOnMobile() {
		navMenuOpenedOnMobile = true
	}
</script>

<nav
	class="navbar navbar-expand-md d-md-flex flex-md-wrap flex-column p-0 border-end overflow-scroll"
>
	<div class="container m-0 p-0">
		<img class="navbar-brand mx-2" src={pictureOnTop} alt="kein bild zu sehen..." />
		<button
			class="navbar-toggler btn"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarToggleExternalContent"
			aria-controls="navbarToggleExternalContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			on:click={() => handleNavMenuOpenedOnMobile()}
		>
			<span class="material-icons text-secondary" title="Menü">&#xe5d2;</span>
		</button>
	</div>
	<div class="collapse navbar-collapse me-auto" id="navbarToggleExternalContent">
		<ul class="list-unstyled">
			{#each menuContent.chapters as chapter}
				<li class="mb-1">
					<button
						class="btn btn-toggle align-items-center collapsed"
						data-bs-toggle="collapse"
						data-bs-target={'#' + chapter.ownRoute.pathLettersOnly + '-nav-collapse'}
						aria-expanded="true"
					>
						<a href={chapter.ownRoute.path}>
							{chapter.ownRoute.displayName}
						</a>
					</button>
					<div
						class="collapse show"
						style=""
						id={chapter.ownRoute.pathLettersOnly + '-nav-collapse'}
					>
						<ul class="list-unstyled">
							{#each chapter.containedRoutes as article}
								<li class="nav-item">
									<a class="nav-link" href={article.path}>
										{article.displayName}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style lang="scss">
	@use '../../uiDesign/basics/bootstrapConfig' as *;

	.navbar-toggler:focus {
		@extend .shadow-none;
	}

	#navbarToggleExternalContent {
		transition: unset;
	}

	.btn-toggle {
		@extend .d-inline-flex, .px-2, .py-1, .border-0, .align-items-center, .bg-transparent;

		&::before {
			@extend .text-muted;
			width: $spacer * 1.25;
			line-height: 0;
			content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
			transition: transform 0.35s ease;
			transform-origin: ($spacer * 0.5) 50%;
		}

		&[aria-expanded='true']::before {
			transform: rotate(90deg);
		}
	}

	a {
		@extend .d-inline-flex, .text-decoration-none, .text-dark;

		&:hover,
		&:focus {
			@extend .fw-bold;
		}

		&:focus {
			@extend .text-primary;
		}
	}

	.nav-link {
		@extend .py-1, .px-2;
		margin-left: $spacer * 1.25;
	}
</style>
