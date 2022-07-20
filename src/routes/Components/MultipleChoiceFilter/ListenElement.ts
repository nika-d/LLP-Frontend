export class ListenElement {
	name
	nummer

	constructor(name: string, nummer: number) {
		this.name = name
		this.nummer = nummer
	}

	toString() {
		return this.nummer + '. ' + this.name
	}
}
