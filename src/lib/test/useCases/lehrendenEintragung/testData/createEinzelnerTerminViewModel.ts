import modelsFromJson from '$lib/models/common/modelsFromJson'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { TerminModel } from '$lib/models/TerminModel'
import { jsonArray } from '../../../models/testData/createLehrTaetigkeitenModel'
import c from '../../../models/testData/assertionConstants'
import { TermineModel } from '$lib/models/TermineModel'

const einEinzelnerTermin = [
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

export default new TermineModel(modelsFromJson(einEinzelnerTermin, TerminModelType, TerminModel))
