<script lang="ts">
	import VeranstaltungModelType from '$lib/models/dataTypes/Studienstruktur/VeranstaltungModelType'

	const v = new VeranstaltungModelType({ kurzTitel: 'blub', langTitel: 'bla' })
</script>

<div id="alertparent">
	<div>
		{v.kurzTitel}
	</div>
	<div class="alert alert-primary" data-bs-dismiss="alert" id="alertid" role="alert">
		A simple primary alert. Bootstrap-JS-Funktionalität: hier draufklicken, dann verschwindet der
		Alert.
	</div>
</div>
