import { TermineModel } from '$lib/models/TermineModel'
import type { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import type { TerminType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/TerminType'
import { TermineFactory } from '$lib/useCases/lehrendenEintragung/viewModel/TermineFactory'
import modelsFromJson from '$lib/models/common/modelsFromJson'
import termineJsonTestData from '../../../models/testData/studienstrukturJsons/termine_zu_veranstaltung_74476.json'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { TerminModel } from '$lib/models/TerminModel'
import { createVeranstaltungenModel } from './studienstrukturTestData'
import { raeumeModel } from '../../../models/testData/raeume'
import { jsonArray } from '../../../models/testData/createLehrTaetigkeitenModel'
import c from '../../../models/testData/assertionConstants'
import einrichtungen from './einrichtungen'
import lehrende from './lehrende'
import type { JSONValue } from '$lib/models/api/JSON'

const termineModel = new TermineModel(
		modelsFromJson(termineJsonTestData as unknown as Array<JSONValue>, TerminModelType, TerminModel)
	),
	einEinzelnerTermin = [
		{
			id: '20201-....',
			veranstaltungsId: c.VERANSTALTUNG_B_ID,
			start: '2020-04-14T10:00:00+02:00',
			ende: '2020-04-14T11:30:00+02:00',
			raumId: null,
			campus: 'CCM',
			gruppenbezeichnung: '1a-4b',
			lehrTaetigkeiten: jsonArray
		}
	]

export const termineModelEinzelnerTermin = new TermineModel(
		modelsFromJson(einEinzelnerTermin, TerminModelType, TerminModel)
	),
	testTermine: DerivedItemsStore<TerminType> = TermineFactory.create(
		termineModel,
		createVeranstaltungenModel(termineModel),
		raeumeModel,
		lehrende,
		einrichtungen
	)
