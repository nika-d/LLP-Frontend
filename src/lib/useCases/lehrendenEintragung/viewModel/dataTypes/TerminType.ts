import type ZeitSpanne from '$lib/models/common/ZeitSpanne'
import type { LehrTaetigkeiten } from '../LehrTaetigkeiten'
import lehrendenEintragungTexts from '$lib/uiTexts/lehrendenEintragung.json'

export class TerminType {
	public readonly lehrformat: string
	public readonly veranstaltung: string
	public readonly fachsemester: string
	public readonly modul: string
	public readonly studiengang: string
	public readonly gruppen: string
	public readonly zeit: ZeitSpanne
	public readonly campus: string
	public readonly raum: string
	public readonly lehrendesFehlt: boolean
	public readonly lehrenden: LehrTaetigkeiten

	constructor(
		lehrformat: string,
		veranstaltung: string,
		fachsemester: string,
		modul: string,
		studiengang: string,
		gruppen: string,
		zeit: ZeitSpanne,
		campus: string,
		raum: string,
		lehrenden: LehrTaetigkeiten,
		lehrendesFehlt: boolean
	) {
		this.veranstaltung = veranstaltung
		this.lehrformat = lehrformat
		this.fachsemester = fachsemester + lehrendenEintragungTexts.FACHSEMESTER_ABKUERZUNG
		this.modul = modul
		this.studiengang = studiengang
		this.gruppen = gruppen
		this.zeit = zeit
		this.campus = campus
		this.raum = raum
		this.lehrendesFehlt = lehrendesFehlt
		this.lehrenden = lehrenden
	}
}
