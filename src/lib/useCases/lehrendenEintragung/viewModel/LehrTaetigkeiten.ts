import type { LehrTaetigkeit } from './LehrTaetigkeit'
import { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import type { Stores } from '$lib/common/SvelteStoreTypeDeclarations'

export class LehrTaetigkeiten extends DerivedItemsStore<LehrTaetigkeit> {
	public readonly hinzufuegenPerApi

	public constructor(stores: Stores, derivingFunction) {
		super(stores, derivingFunction)

		const lehrTaetigkeitenModel = stores[0]

		this.hinzufuegenPerApi =
			// Eigentlich muss die Model-Methode nicht nochmal in eine function wrapped werden, dient hier nur dazu,
			// dass mit Sinon getestet werden kann, siehe Test.
			function (a, b) {
				return lehrTaetigkeitenModel.hinzufuegen(a, b)
			}
	}
}
