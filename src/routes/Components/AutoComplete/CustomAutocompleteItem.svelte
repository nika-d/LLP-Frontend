<script lang="ts">
	export let item, label // d.h. jedes custom item sollte sie auch als Properties haben.
</script>

<div class="row">
	<div class="col-auto">
		<span class="material-icons">{item.icon}</span>
	</div>
	<div class="col">
		<div class="kursiv">
			{@html label}
		</div>
		<div>
			{item.name}
		</div>
	</div>
</div>

<style>
	.kursiv {
		font-style: italic;
	}
</style>
