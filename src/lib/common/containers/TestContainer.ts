import type { HttpApiEvents } from '$lib/models/api/HttpApiEvents'
import { DummyApiEvents } from '$lib/test/models/api/DummyApiEvents'

export default class TestContainer {
	private apiEvents = new DummyApiEvents()

	public getApiEvents(): HttpApiEvents {
		return this.apiEvents
	}
}
