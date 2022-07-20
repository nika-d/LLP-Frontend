export class PersonModelType {
	nachname: string
	vorname: string
	einrichtungsIds: string[]
	titel: string
	email: string

	constructor(p: {
		nachname: string
		vorname: string
		einrichtungsIds: string[]
		titel: string
		email: string
	}) {
		this.nachname = p.nachname
		this.vorname = p.vorname
		this.einrichtungsIds = p.einrichtungsIds.map((id) => id.toString())
		this.titel = p.titel
		this.email = p.email
	}

	get vollerName(): string {
		return this.nachname + ', ' + this.vorname
	}
}
