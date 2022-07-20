import ZeitSpanne from '../common/ZeitSpanne'
import { LehrTaetigkeitenModel } from '../LehrTaetigkeitenModel'
import modelsFromJson from '../common/modelsFromJson'
import { LehrTaetigkeitModelType } from './LehrTaetigkeitModelType'
import { LehrTaetigkeitModel } from '../LehrTaetigkeitModel'
import type { JSONValue } from '../api/JSON'

export class TerminModelType {
	public readonly veranstaltungsId: string
	public readonly zeitSpanne: ZeitSpanne
	public readonly raumId: string
	public readonly campus: string
	public readonly gruppenBezeichnung: string
	public readonly lehrTaetigkeitenModel: LehrTaetigkeitenModel
	public readonly lehrendesFehlt: boolean

	constructor(p: {
		id: string
		veranstaltungsId: string
		start: string
		ende: string
		raumId: string
		campus: string
		gruppenbezeichnung: string
		lehrendesFehlt: boolean
		lehrTaetigkeiten: Array<JSONValue>
	}) {
		this.veranstaltungsId = p.veranstaltungsId.toString()
		this.zeitSpanne = new ZeitSpanne(p.start, p.ende)
		this.raumId = p.raumId?.toString()
		this.campus = p.campus
		this.gruppenBezeichnung = p.gruppenbezeichnung
		this.lehrTaetigkeitenModel = new LehrTaetigkeitenModel(
			modelsFromJson(p.lehrTaetigkeiten, LehrTaetigkeitModelType, LehrTaetigkeitModel),
			p.id
		)
		this.lehrendesFehlt = p.lehrendesFehlt
	}
}
