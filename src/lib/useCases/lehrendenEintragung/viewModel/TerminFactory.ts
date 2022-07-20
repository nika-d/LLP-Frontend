import { get } from 'svelte/store'
import type { TerminModel } from '$lib/models/TerminModel'
import { LehrTaetigkeitenFactory } from './LehrTaetigkeitenFactory'
import type { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'
import type { LehrTaetigkeiten } from './LehrTaetigkeiten'
import { TerminType } from './dataTypes/TerminType'
import type VeranstaltungModelType from '$lib/models/dataTypes/Studienstruktur/VeranstaltungModelType'
import type RaumModelType from '$lib/models/dataTypes/RaumModelType'
import type Lehrende from './Lehrende'
import type AutoCompleteItemsEinrichtungen from './AutoCompleteItemsEinrichtungen'

export class TerminFactory {
	public static create(
		terminModel: TerminModel,
		veranstaltungen: Map<string, VeranstaltungModelType>,
		raeume: Map<string, RaumModelType>,
		lehrende: Lehrende,
		einrichtungen: AutoCompleteItemsEinrichtungen
	): TerminType {
		const terminModelObject = get(terminModel),
			lehrTaetigkeitenModel: LehrTaetigkeitenModel = terminModelObject.lehrTaetigkeitenModel,
			lehrTaetigkeiten: LehrTaetigkeiten = LehrTaetigkeitenFactory.create(
				lehrTaetigkeitenModel,
				lehrende,
				einrichtungen
			),
			raum = raeume.get(terminModelObject.raumId)?.toString(),
			veranstaltungModelObject = veranstaltungen.get(terminModelObject.veranstaltungsId),
			veranstaltung = veranstaltungModelObject.toString(),
			lehrformat = veranstaltungModelObject.lehrformat.toString(),
			fachsemester = veranstaltungModelObject.submodul.modul.fachsemester.toString(),
			modul = veranstaltungModelObject.submodul.modul.toString(),
			studiengang = veranstaltungModelObject.submodul.modul.studiengang.toString(),
			lehrendesFehlt = terminModelObject.lehrendesFehlt

		return new TerminType(
			veranstaltung,
			lehrformat,
			fachsemester,
			modul,
			studiengang,
			terminModelObject.gruppenBezeichnung,
			terminModelObject.zeitSpanne,
			terminModelObject.campus,
			raum ?? '',
			lehrTaetigkeiten,
			lehrendesFehlt
		)
	}
}
