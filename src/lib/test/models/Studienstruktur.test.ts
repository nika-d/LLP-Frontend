import type { VeranstaltungModel } from '$lib/models/StudienstrukturModels'
import { createModelsfuerEineModulwoche } from './testData/eineModulwocheImMSM2'
import type { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import c from './testData/assertionConstants'
import { DUMMY_RAUM_ID } from './testData/raeume'
import { get } from 'svelte/store'
import type VeranstaltungModelType from '$lib/models/dataTypes/Studienstruktur/VeranstaltungModelType'

describe('createStudienstruktur', () => {
	let studiengaenge, module, submodule, veranstaltungen, lehrformate

	beforeAll(() => {
		const {
			studiengaengeModel,
			moduleModel,
			submoduleModel,
			veranstaltungenModel,
			lehrformateModel
		} = createModelsfuerEineModulwoche()

		studiengaengeModel.subscribe((value) => (studiengaenge = value))
		moduleModel.subscribe((value) => (module = value))
		submoduleModel.subscribe((value) => (submodule = value))
		veranstaltungenModel.subscribe((value) => (veranstaltungen = value))
		lehrformateModel.subscribe((value) => (lehrformate = value))
	})

	function checkIfOneVeranstaltungIsThere(
		veranstaltungen: Map<string, VeranstaltungModel>
	): boolean {
		const veranstaltungenArray = [...veranstaltungen.values()]
		const veranstaltung = veranstaltungenArray.find(
			(element) => get(element).kurzTitel === c.VERANSTALTUNG_A_KURZ_TITEL
		)
		return veranstaltung ? true : false
	}

	test('alle Teile der Studienstruktur sollten da sein', () => {
		expect(studiengaenge.size).toBe(1)
		expect(module.size).toBe(1)
		expect(submodule.size).toBe(1)
		expect(veranstaltungen.size).toBe(10)
		expect(lehrformate.size).toBe(12)

		expect(get(studiengaenge.get(c.STUDIENGANG_A_ID))['code']).toBe(c.STUDIENGANG_A_CODE)
		expect(get(module.get(c.MODUL_A_ID))['titel']).toBe(c.MODUL_A_TITEL)
		expect(get(submodule.get(c.SUBMODUL_A_ID))).toHaveProperty('modul')
		expect(checkIfOneVeranstaltungIsThere(veranstaltungen)).toBe(true)
	})

	test('Teile der Studienstruktur sollten korrekt untereinander verknüpft sein', () => {
		const veranstaltung: VeranstaltungModelType = get(veranstaltungen.get(c.VERANSTALTUNG_B_ID))
		expect(veranstaltung.termine.length).toBe(1)
		expect(veranstaltung.lehrformat.bezeichnungLang).toBe(c.VERANSTALTUNG_B_LEHRFORMAT_NAME)
		const termin: TerminModelType = get(veranstaltung.termine[0])
		expect(termin.raumId).toBe(DUMMY_RAUM_ID)
		expect(veranstaltung.submodul.modul.titel).toBe(c.MODUL_A_TITEL)
		expect(veranstaltung.submodul.modul.studiengang.code).toBe(c.STUDIENGANG_A_CODE)
	})
})
