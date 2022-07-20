import type { TerminModel } from '../../TerminModel'
import type SubmodulModelType from './SubmodulModelType'
import type LehrformatModelType from './LehrformatModelType'

export default class {
	public readonly kurzTitel: string
	public readonly langTitel: string
	public lehrformat: LehrformatModelType
	public submodul: SubmodulModelType
	public readonly termine: TerminModel[] = []

	constructor(p: { kurzTitel: string; langTitel: string }) {
		this.kurzTitel = p.kurzTitel
		this.langTitel = p.langTitel
	}

	public toString() {
		return this.kurzTitel
	}
}
