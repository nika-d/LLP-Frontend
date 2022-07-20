import type { PersonModelType } from '$lib/models/dataTypes/PersonModelType'

export default class {
	id: string
	label: string
	model: PersonModelType

	constructor(id: string, lehrendeModel: PersonModelType) {
		this.id = id
		this.model = lehrendeModel
		this.label = this.model.email
	}
}
