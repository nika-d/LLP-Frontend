import { ModelsByIdStore } from './common/ModelsByIdStore'
import StudiengangModelType from './dataTypes/Studienstruktur/StudiengangModelType'
import ModulModelType from './dataTypes/Studienstruktur/ModulModelType'
import SubmodulModelType from './dataTypes/Studienstruktur/SubmodulModelType'
import LehrformatModelType from './dataTypes/Studienstruktur/LehrformatModelType'
import VeranstaltungModelType from './dataTypes/Studienstruktur/VeranstaltungModelType'
import type { JSONValue } from './api/JSON'
import type { TermineModel } from './TermineModel'
import { get } from 'svelte/store'
import { ItemStore } from '$lib/common/ItemStore'

export class StudiengangModel extends ItemStore<StudiengangModelType> {}
export class ModulModel extends ItemStore<ModulModelType> {}
export class SubmodulModel extends ItemStore<SubmodulModelType> {}
export class VeranstaltungModel extends ItemStore<VeranstaltungModelType> {}
export class LehrformatModel extends ItemStore<LehrformatModelType> {}

export class StudiengaengeModel extends ModelsByIdStore<StudiengangModelType, StudiengangModel> {}
export class ModuleModel extends ModelsByIdStore<ModulModelType, ModulModel> {}
export class SubmoduleModel extends ModelsByIdStore<SubmodulModelType, SubmodulModel> {}
export class VeranstaltungenModel extends ModelsByIdStore<
	VeranstaltungModelType,
	VeranstaltungModel
> {}
export class LehrformateModel extends ModelsByIdStore<LehrformatModelType, LehrformatModel> {}

export default function createStudienstruktur(
	termineModel: TermineModel,
	json: JSONValue
): {
	studiengaengeModel: StudiengaengeModel
	moduleModel: ModuleModel
	submoduleModel: SubmoduleModel
	veranstaltungenModel: VeranstaltungenModel
	lehrformateModel: LehrformateModel
} {
	const studienstruktur = fillWithData(json)

	connectHierarchically(json, studienstruktur, termineModel)

	return modelsFrom(studienstruktur)
}

function fillWithData(json) {
	const read = ModelsByIdStore.getMapFromJsonArray

	return {
		studiengaenge: read(json.studiengaenge, StudiengangModelType, StudiengangModel),
		module: read(json.module, ModulModelType, ModulModel),
		submodule: read(json.submodule, SubmodulModelType, SubmodulModel),
		veranstaltungen: read(json.veranstaltungen, VeranstaltungModelType, VeranstaltungModel),
		lehrformate: read(json.lehrformate, LehrformatModelType, LehrformatModel)
	}
}

function connectHierarchically(json, studienstruktur, termineModel: TermineModel) {
	const termine = get(termineModel)
	termine.forEach((termin) => {
		const veranstaltungDesTermins: VeranstaltungModelType = get(
			studienstruktur.veranstaltungen.get(get(termin).veranstaltungsId)
		)
		veranstaltungDesTermins.termine.push(termin)
	})

	json.veranstaltungen?.forEach((vJson) => {
		const veranstaltung: VeranstaltungModelType = get(
				studienstruktur.veranstaltungen.get(vJson.id.toString())
			),
			submodul: SubmodulModelType = get(studienstruktur.submodule.get(vJson.submodulId.toString())),
			lehrformat: LehrformatModelType = get(
				studienstruktur.lehrformate.get(vJson.lehrformatId.toString())
			)
		veranstaltung.submodul = submodul
		veranstaltung.lehrformat = lehrformat
		submodul.veranstaltungen.push(veranstaltung)
	})
	json.submodule?.forEach((sJson) => {
		const submodul: SubmodulModelType = get(studienstruktur.submodule.get(sJson.id.toString())),
			modul: ModulModelType = get(studienstruktur.module.get(sJson.modulId.toString()))
		submodul.modul = modul
		modul.submodule.push(submodul)
	})
	json.module?.forEach((mJson) => {
		const modul: ModulModelType = get(studienstruktur.module.get(mJson.id.toString())),
			studiengang: StudiengangModelType = get(
				studienstruktur.studiengaenge.get(mJson.studiengangId.toString())
			)
		modul.studiengang = studiengang
		studiengang.module.push(modul)
	})
}

function modelsFrom(studienstruktur) {
	return {
		studiengaengeModel: new StudiengaengeModel(studienstruktur.studiengaenge),
		moduleModel: new ModuleModel(studienstruktur.module),
		submoduleModel: new SubmoduleModel(studienstruktur.submodule),
		veranstaltungenModel: new VeranstaltungenModel(studienstruktur.veranstaltungen),
		lehrformateModel: new LehrformateModel(studienstruktur.lehrformate)
	}
}
