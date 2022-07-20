import { DerivedItemsStore } from '$lib/common/DerivedItemsStore'
import type { TermineModel } from '$lib/models/TermineModel'
import type { TerminType } from './dataTypes/TerminType'
import { TerminFactory } from './TerminFactory'
import type { VeranstaltungenModel } from '$lib/models/StudienstrukturModels'
import type RaeumeModel from '$lib/models/RaeumeModel'
import type Lehrende from './Lehrende'
import type AutoCompleteItemsEinrichtungen from './AutoCompleteItemsEinrichtungen'

export class TermineFactory {
	public static create(
		termineModel: TermineModel,
		veranstaltungenModel: VeranstaltungenModel,
		raeumeModel: RaeumeModel,
		lehrende: Lehrende,
		einrichtungen: AutoCompleteItemsEinrichtungen
	): DerivedItemsStore<TerminType> {
		function createFromModel([$termineModel]): TerminType[] {
			const termine: TerminType[] = []

			$termineModel.forEach((tModel) => {
				termine.push(
					TerminFactory.create(
						tModel,
						veranstaltungenModel.get(),
						raeumeModel.get(),
						lehrende,
						einrichtungen
					)
				)
			})

			return termine
		}

		return new DerivedItemsStore<TerminType>([termineModel], createFromModel)
	}
}
