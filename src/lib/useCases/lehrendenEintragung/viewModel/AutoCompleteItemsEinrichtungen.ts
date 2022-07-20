import { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import { get } from 'svelte/store'
import AutoCompleteItemEinrichtungType from './dataTypes/AutoCompleteItemEinrichtungType'
import type EinrichtungModelType from '$lib/models/dataTypes/EinrichtungModelType'

export default class AutoCompleteItemsEinrichtungen extends DerivedItemsStore<AutoCompleteItemEinrichtungType> {
	constructor([$einrichtungenModel]) {
		function castEinrichtungen([$einrichtungenModel]) {
			const einrichtungenModelsWithIds = [...$einrichtungenModel.entries()]
			return einrichtungenModelsWithIds.map(
				(e) =>
					new AutoCompleteItemEinrichtungType(e[0], (get(e[1]) as EinrichtungModelType).verkuerzt)
			)
		}

		super([$einrichtungenModel], castEinrichtungen)
	}
}
