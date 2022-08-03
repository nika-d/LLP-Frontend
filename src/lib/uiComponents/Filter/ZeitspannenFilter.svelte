<script lang="ts">
	import Filter from './Filter'
	import texts from '$lib/uiTexts/filter.json'
	import Dropdown from '$lib/uiComponents/Dropdown.svelte'

	export let filter: Filter<any>
	let startdate = '',
		enddate = '',
		badgeText = '0'

	$: {
		let start = null,
			end = null
		if (startdate == '' && enddate != '') {
			end = new Date(enddate)
			badgeText = '1'
		} else if (startdate != '' && enddate == '') {
			start = new Date(startdate)
			badgeText = '1'
		} else if (startdate == '' && enddate == '') {
			badgeText = '0'
		} else {
			start = new Date(startdate)
			end = new Date(enddate)
			badgeText = '2'
		}
		filter.set_filter((terminTime) => {
			return terminTime.liegtZwischen(start, end)
		})
	}
</script>

<Dropdown {badgeText} buttonText={texts.ZEITSPANNE}>
	<span slot="dropdown-items">
		<div class="dropdown-item">
			<label for="startdate">{texts.STARTDATE}</label>
			<input type="date" id="startdate" name="startdate" bind:value={startdate} />
		</div>
		<div class="dropdown-item">
			<label for="enddate">{texts.ENDDATE}</label>
			<input type="date" id="enddate" name="enddate" bind:value={enddate} />
		</div>
	</span>
</Dropdown>

<style>
	label {
		display: block;
	}

	input,
	label {
		margin: 0.4rem 0;
	}
</style>
