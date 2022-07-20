import { termine } from './zweiModuleEineWocheEineGruppe'
import { get } from 'svelte/store'

describe('lehrendenEintragung', function () {
	it('should put models from different test data files together', function () {
		expect(get(termine).length).toEqual(12)
	})
})
