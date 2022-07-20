import AutoCompleteItemLehrendeType from './dataTypes/AutoCompleteItemLehrendeType'
import { get } from 'svelte/store'
import { DerivedItemsStore } from '$lib/common/DerivedItemsStore'

export default class Lehrende extends DerivedItemsStore<AutoCompleteItemLehrendeType> {
	constructor([$personenModel]) {
		function castPersonenToLehrende([$personenModel]) {
			const lehrendeModelsWithIds = [...$personenModel.entries()]
			return lehrendeModelsWithIds.map((e) => new AutoCompleteItemLehrendeType(e[0], get(e[1])))
		}

		super([$personenModel], castPersonenToLehrende)
	}
}
