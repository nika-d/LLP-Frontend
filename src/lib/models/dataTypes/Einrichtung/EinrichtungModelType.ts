import { verkuerze } from './verkuerze'

export default class EinrichtungModelType {
	public name: string

	constructor(p: { name: string }) {
		this.name = p.name
	}

	get verkuerzt(): string {
		return verkuerze(this.name)
	}
}
