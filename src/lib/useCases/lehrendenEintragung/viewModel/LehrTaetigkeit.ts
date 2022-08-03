import { LehrTaetigkeitType } from './dataTypes/LehrTaetigkeitType'
import type { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { DerivedItemStore } from '$lib/common/DerivedItemStore'
import type AutoCompleteItemEinrichtungType from './dataTypes/AutoCompleteItemEinrichtungType'
import type { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
import type Lehrende from './Lehrende'
import type AutoCompleteItemLehrendeType from './dataTypes/AutoCompleteItemLehrendeType'
import type AutoCompleteItemsEinrichtungen from './AutoCompleteItemsEinrichtungen'

export class LehrTaetigkeit extends DerivedItemStore<LehrTaetigkeitType> {
	public readonly einrichtungSetzenPerApi: (einrichtungsId: string) => ApiStatusModel

	constructor([lehrTaetigkeit, lehrende, einrichtungenModel], derivingFunction) {
		// console.log('LehrTaetigkeit ViewModel constructor') // dieses log bleibt, um ggf. Bugs bei model->viewModel cast aufzuzeigen
		super([lehrTaetigkeit, lehrende, einrichtungenModel], derivingFunction)
		this.einrichtungSetzenPerApi = lehrTaetigkeit.einrichtungSetzen
	}

	private static createFromModels = ([
		$lehrTaetigkeit,
		$lehrende,
		$einrichtungen
	]): LehrTaetigkeitType => {
		const lehrende: AutoCompleteItemLehrendeType = $lehrende.find(
				(l) => l.id === $lehrTaetigkeit.personId
			),
			einrichtungsId: string = $lehrTaetigkeit.einrichtungsId

		const einrichtungAutocompleteCandidates: AutoCompleteItemEinrichtungType[] =
			// AutoCompleteItemsEinrichtungen des Lehrenden stehen zur Auswahl
			lehrende && $einrichtungen.length > 0
				? lehrende.model.einrichtungsIds.map((id) => $einrichtungen.find((e) => e.id === id))
				: []

		const einrichtung = $einrichtungen.find((item) => item.id === einrichtungsId)

		return new LehrTaetigkeitType(
			lehrende ? lehrende.model.vollerName : undefined,
			einrichtung,
			false,
			einrichtungAutocompleteCandidates
		)
	}

	public static create(
		lehrTaetigkeit: LehrTaetigkeitModel,
		lehrende: Lehrende,
		einrichtungen: AutoCompleteItemsEinrichtungen
	): LehrTaetigkeit {
		return new LehrTaetigkeit([lehrTaetigkeit, lehrende, einrichtungen], this.createFromModels)
	}
}
