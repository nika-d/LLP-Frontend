import { HttpApiEvents } from '$lib/models/api/HttpApiEvents'

export class ProductionContainer {
	private apiEvents = new HttpApiEvents()

	public getApiEvents(): HttpApiEvents {
		return this.apiEvents
	}
}
