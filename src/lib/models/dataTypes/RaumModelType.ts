export default class RaumModelType {
	public readonly titel: string
	public readonly addresse: string
	public readonly zugang: string
	public readonly kontakt: string
	public readonly link: string

	constructor(p: {
		titel: string
		addresse: string
		zugang: string
		kontakt: string
		link: string
	}) {
		this.titel = p.titel
		this.addresse = p.addresse
		this.zugang = p.zugang
		this.kontakt = p.kontakt
		this.link = p.link
	}

	toString() {
		return this.titel + ', ' + this.addresse
	}
}
