import type { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'
import { LehrTaetigkeitenFactory } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeitenFactory'
import einrichtungen from './einrichtungen'
import type { LehrTaetigkeiten } from '$lib/useCases/lehrendenEintragung/viewModel/LehrTaetigkeiten'
import lehrende from './lehrende'

export function createLehrTaetigkeitenTestDataViewModel(
	lehrTaetigkeitenModel: LehrTaetigkeitenModel
): LehrTaetigkeiten {
	return LehrTaetigkeitenFactory.create(lehrTaetigkeitenModel, lehrende, einrichtungen)
}
