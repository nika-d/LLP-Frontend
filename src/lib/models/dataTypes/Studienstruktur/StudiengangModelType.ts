import type ModulModelType from './ModulModelType'

export default class {
	public readonly code: string
	public readonly module: ModulModelType[] = []

	constructor(p: { code: string }) {
		this.code = p.code
	}

	public toString() {
		return this.code
	}
}
