import type SubmodulModelType from './SubmodulModelType'
import type StudiengangModelType from './StudiengangModelType'

export default class {
	public readonly titel: string
	public readonly fachsemester: number
	public readonly submodule: SubmodulModelType[] = []
	public studiengang: StudiengangModelType

	constructor(p: { titel: string; fachsemester: number }) {
		this.titel = p.titel
		this.fachsemester = p.fachsemester
	}

	public toString() {
		return this.titel
	}
}
