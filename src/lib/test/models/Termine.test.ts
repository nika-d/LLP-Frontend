import { get } from 'svelte/store'
import { TerminModel } from '$lib/models/TerminModel'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import type { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import { TermineModel } from '$lib/models/TermineModel'
import modelsFromJson from '$lib/models/common/modelsFromJson'
import termineJsonTestData from './testData/studienstrukturJsons/termine_zu_veranstaltung_74476.json'
import { ModelsByIdStore } from '$lib/models/common/ModelsByIdStore'
import jsonArray from './testData/fakePersonen1.json'
import { PersonModelType } from '$lib/models/dataTypes/PersonModelType'
import PersonenModel from '$lib/models/PersonenModel'
import raeumeJson from './testData/raeume'
import RaumModelType from '$lib/models/dataTypes/RaumModelType'
import RaeumeModel from '$lib/models/RaeumeModel'
import { einrichtungenModels } from './testData/einrichtungen'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'
import ZeitSpanne from '$lib/models/common/ZeitSpanne'
import a from './testData/assertionConstants'
import RaumModel from '$lib/models/RaumModel'
import PersonModel from '$lib/models/PersonModel'
import type { JSONValue } from '$lib/models/api/JSON'

describe('Termine Model', function () {
	test('Alle models für die Darstellung von Terminen sollten definiert sein.', function () {
		const termineModel = new TermineModel(
			modelsFromJson(
				termineJsonTestData as unknown as Array<JSONValue>,
				TerminModelType,
				TerminModel
			)
		)

		const personen = get(
			ModelsByIdStore.fromJson(jsonArray, PersonModelType, PersonModel, PersonenModel)
		)
		const raeume = get(ModelsByIdStore.fromJson(raeumeJson, RaumModelType, RaumModel, RaeumeModel))
		const einrichtungen = get(new EinrichtungenModel(einrichtungenModels))

		const testTermin = {
			raum: 'Audimax (Hörsaal 1 + 2)',
			start: '2021-05-03T14:00:00+02:00',
			ende: '2021-05-03T16:00:00+02:00',
			campus: 'CVK',
			gruppenbezeichnung: '52a-52b',
			lehrTaetigkeiten: [
				{
					email: a.PERSON_A_EMAIL,
					einrichtung: 'CC08, Chirurgische Klinik, CCM/CVK'
				}
			]
		}

		const terminArray = get(termineModel)
		expect(terminArray.length).toBe(7)

		const termin: TerminModelType = get(terminArray[0])
		expect(get(raeume.get(termin.raumId)).titel).toBe(testTermin.raum)
		expect(termin.zeitSpanne.toString()).toBe(
			new ZeitSpanne(testTermin.start, testTermin.ende).toString()
		)
		expect(termin.campus).toBe(testTermin.campus)
		expect(termin.gruppenBezeichnung).toBe(testTermin.gruppenbezeichnung)
		const lehrTaetigkeit: LehrTaetigkeitModelType = get(get(termin.lehrTaetigkeitenModel)[0])
		expect(get(personen.get(lehrTaetigkeit.personId)).email).toBe(
			testTermin.lehrTaetigkeiten[0].email
		)
		expect(get(einrichtungen.get(lehrTaetigkeit.einrichtungsId)).verkuerzt).toBe(
			testTermin.lehrTaetigkeiten[0].einrichtung
		)
	})
})
