import { ItemStore } from '$lib/common/ItemStore'
import type { LehrTaetigkeitModelType } from './dataTypes/LehrTaetigkeitModelType'
import type { ApiStatusModel } from './api/ApiStatusModel'
import { globalObject } from '$lib/common/globalObject'

export class LehrTaetigkeitModel extends ItemStore<LehrTaetigkeitModelType> {
	private lehrTaetigkeitId: string
	public einrichtungSetzen: (einrichtungsId: string) => ApiStatusModel

	constructor(item: LehrTaetigkeitModelType) {
		super(item)
		this.lehrTaetigkeitId = item.id
		this.einrichtungSetzen = einrichtungSetzen.bind(this)
	}
}

function einrichtungSetzen(einrichtungsId: string): ApiStatusModel {
	function callback(einrichtungsId: string) {
		this.update((lehrTaetigkeit) => {
			lehrTaetigkeit.einrichtungsId = einrichtungsId
			return lehrTaetigkeit
		})
	}

	return globalObject.container
		.getApiEvents()
		.einrichtungSetzen(this.lehrTaetigkeitId, einrichtungsId, callback.bind(this))
}
