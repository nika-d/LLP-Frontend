<script>
	//import Navigation from '$lib/showcase/navigation/Navigation.svelte';
	import NavigationSimple from '$lib/showcase/navigation/NavigationSimple.svelte'
	import '../lib/uiDesign/charitePatternLibraryBootstrapPatch.scss'
	import 'bootstrap'
</script>

<div class="container-fluid m-0 p-0">
	<div class="row m-0 p-0 gx-0 gy-0">
		<div class="col-md m-0 p-0 sidenav-250-px">
			<NavigationSimple />
		</div>
		<div class="col-md p-3 p-md-0">
			<slot />
		</div>
	</div>
</div>

<style>
	.sidenav-250-px {
		max-width: 250px;
	}
</style>
