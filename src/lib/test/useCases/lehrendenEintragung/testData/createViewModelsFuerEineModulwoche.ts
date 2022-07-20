import { TermineFactory } from '$lib/useCases/lehrendenEintragung/viewModel/TermineFactory'
import { raeumeModel } from '../../../models/testData/raeume'
import { createModelsfuerEineModulwoche } from '../../../models/testData/eineModulwocheImMSM2'
import einrichtungen from './einrichtungen'
import lehrende from './lehrende'

const { veranstaltungenModel, termineModel } = createModelsfuerEineModulwoche()

const viewModelsFuerEineModulWoche = TermineFactory.create(
	termineModel,
	veranstaltungenModel,
	raeumeModel,
	lehrende,
	einrichtungen
)

export default viewModelsFuerEineModulWoche
