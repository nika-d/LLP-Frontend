import createStudienstruktur, { VeranstaltungenModel } from '$lib/models/StudienstrukturModels'
import { TermineModel } from '$lib/models/TermineModel'
import v from '../../../models/testData/studienstrukturJsons/veranstaltungen_in_submodul_1513703.json'
import s from '../../../models/testData/studienstrukturJsons/submodule.json'
import m from '../../../models/testData/studienstrukturJsons/module.json'
import st from '../../../models/testData/studienstrukturJsons/studiengaenge.json'
import l from '../../../models/testData/studienstrukturJsons/lehrformate.json'

export function createVeranstaltungenModel(termineModel: TermineModel): VeranstaltungenModel {
	const json = {
		veranstaltungen: [v[0]],
		submodule: [s[0]],
		module: [m[0]],
		studiengaenge: [st[0]],
		lehrformate: [l[3]]
	}

	return createStudienstruktur(termineModel, json).veranstaltungenModel
}

export function createEmptyVeranstaltungenModel(): VeranstaltungenModel {
	return createStudienstruktur(new TermineModel([]), {}).veranstaltungenModel
}

export const testid = 'studienstrukturzelle'
