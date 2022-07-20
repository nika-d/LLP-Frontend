import { LehrTaetigkeitModel } from './LehrTaetigkeitModel'
import { LehrTaetigkeitModelType } from './dataTypes/LehrTaetigkeitModelType'
import { ModelsStore } from './common/ModelsStore'
import { get } from 'svelte/store'
import { globalObject } from '$lib/common/globalObject'
import type { ApiStatusModel } from './api/ApiStatusModel'

export class LehrTaetigkeitenModel extends ModelsStore<
	LehrTaetigkeitModelType,
	LehrTaetigkeitModel
> {
	private terminId: string
	public hinzufuegen: (personId: string, einrichtungsId: string) => ApiStatusModel

	constructor(items: LehrTaetigkeitModel[], terminId: string) {
		super(items)
		this.terminId = terminId

		// notwendig für das this-Binding , damit die Methode wie Variable innerhalb von View Models herumgereicht
		// werden kann, und dennoch innerhalb der Methode die Bindung zur Termin-ID erhalten bleibt
		// vgl.: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
		this.hinzufuegen = hinzufuegen.bind(this)
	}

	public loeschen(lehrtaetigkeitsId: string): void {
		this.update((lehrTaetigkeiten) => {
			const index = lehrTaetigkeiten.findIndex((lehrTaetigkeit) => {
				const lehrTaetigkeitObject: LehrTaetigkeitModelType = get(lehrTaetigkeit)
				return lehrTaetigkeitObject.id == lehrtaetigkeitsId
			})
			lehrTaetigkeiten.splice(index, 1)
			return lehrTaetigkeiten
		})
	}
}

function hinzufuegen(personId: string, einrichtungsId: string): ApiStatusModel {
	function callback(lehrTaetigkeitId: string) {
		const lehrTaetigkeitModel = new LehrTaetigkeitModel(
			new LehrTaetigkeitModelType({
				id: lehrTaetigkeitId,
				personId,
				einrichtungsId
			})
		)
		this.update((lehrTaetigkeiten) => {
			lehrTaetigkeiten.push(lehrTaetigkeitModel)
			return lehrTaetigkeiten
		})
	}

	return globalObject.container
		.getApiEvents()
		.lehrtaetigkeitHinzufuegen(this.terminId, personId, einrichtungsId, callback.bind(this))
}
