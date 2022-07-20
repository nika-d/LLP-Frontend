import einrichtungen from './einrichtungen'
import { raeumeModel } from '../../../models/testData/raeume'
import einModulJson from '../../../models/testData/studienstrukturJsons/2submodule_Gruppe13aModul15100Msm2Zeitsem20212.json'
import zweitesModulJson from '../../../models/testData/studienstrukturJsons/2submodule_Gruppe13aModul15173Msm2Zeitsem20212.json'
import lehrformate from '../../../models/testData/studienstrukturJsons/lehrformate.json'
import studiengaenge from '../../../models/testData/studienstrukturJsons/studiengaenge.json'
import { TermineModel } from '$lib/models/TermineModel'
import modelsFromJson from '$lib/models/common/modelsFromJson'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { TerminModel } from '$lib/models/TerminModel'
import createStudienstruktur from '$lib/models/StudienstrukturModels'
import type { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import type { TerminType } from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/TerminType'
import { TermineFactory } from '$lib/useCases/lehrendenEintragung/viewModel/TermineFactory'
import lehrende from './lehrende'

export const termineJSON = einModulJson.termine.concat(zweitesModulJson.termine),
	studienstruktur = {
		studiengaenge: [studiengaenge[0]],
		module: einModulJson.module.concat(zweitesModulJson.module),
		submodule: einModulJson.submodule.concat(zweitesModulJson.submodule),
		veranstaltungen: einModulJson.veranstaltungen.concat(zweitesModulJson.veranstaltungen),
		lehrformate: lehrformate
	},
	termineModel = new TermineModel(modelsFromJson(termineJSON, TerminModelType, TerminModel)),
	{ veranstaltungenModel } = createStudienstruktur(termineModel, studienstruktur),
	termine: DerivedItemsStore<TerminType> = TermineFactory.create(
		termineModel,
		veranstaltungenModel,
		raeumeModel,
		lehrende,
		einrichtungen
	)
