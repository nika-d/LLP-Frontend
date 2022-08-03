import { describe, expect, it } from 'vitest'
import { verkuerze } from '../../../../models/dataTypes/Einrichtung/verkuerze'

describe('verkuerzeEinrichtungName', () => {
	it('soll die Bezeichnung eine Einrichtung sinnvoll verkürzen', () => {
		const lang = 'CC01 - Institut für Geschichte der Medizin und Ethik in der Medizin - CBF',
			kurz = 'CC01, I.f. Geschichte der Medizin und Ethik in der Medizin, CBF'

		expect(verkuerze(lang)).toBe(kurz)
	})
})
