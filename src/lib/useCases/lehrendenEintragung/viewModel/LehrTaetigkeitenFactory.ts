import { LehrTaetigkeit } from './LehrTaetigkeit'
import { LehrTaetigkeiten } from './LehrTaetigkeiten'
import type { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'
import type Lehrende from './Lehrende'
import type AutoCompleteItemsEinrichtungen from './AutoCompleteItemsEinrichtungen'

export class LehrTaetigkeitenFactory {
	public static create(
		lehrTaetigkeitenModel: LehrTaetigkeitenModel,
		lehrende: Lehrende,
		einrichtungen: AutoCompleteItemsEinrichtungen
	): LehrTaetigkeiten {
		function createFromModels([$lehrTaetigkeitenModel]): LehrTaetigkeit[] {
			const lehrTaetigkeitenViewModels = []
			$lehrTaetigkeitenModel.forEach((lehrTaetigkeitModel) => {
				lehrTaetigkeitenViewModels.push(
					LehrTaetigkeit.create(lehrTaetigkeitModel, lehrende, einrichtungen)
				)
			})
			return lehrTaetigkeitenViewModels
		}

		return new LehrTaetigkeiten([lehrTaetigkeitenModel, lehrende, einrichtungen], createFromModels)
	}
}
