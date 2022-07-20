export class LehrTaetigkeitModelType {
	public readonly id: string
	public readonly personId: string
	public einrichtungsId: string

	constructor(p: { id: string; personId: string; einrichtungsId: string }) {
		this.id = String(p.id)
		this.personId = String(p.personId)
		this.einrichtungsId = p.einrichtungsId === null ? undefined : String(p.einrichtungsId)
	}
}
