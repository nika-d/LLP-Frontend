<script lang="ts">
	import '$lib/common/containers/initContainer'
	import { termine } from '$lib/test/useCases/lehrendenEintragung/testData/zweiModuleEineWocheEineGruppe'
	import Termine from '$lib/useCases/lehrendenEintragung/view/Termine.svelte'
	import lehrende from '$lib/test/useCases/lehrendenEintragung/testData/lehrende'
	import einrichtungen from '$lib/test/useCases/lehrendenEintragung/testData/einrichtungen'
</script>

<div class="p-5">
	<Termine {lehrende} {einrichtungen} {termine} />
</div>
