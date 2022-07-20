export default class {
	public readonly bezeichnungLang: string

	constructor(p: { bezeichnungLang: string }) {
		this.bezeichnungLang = p.bezeichnungLang
	}

	public toString() {
		return this.bezeichnungLang
	}
}
