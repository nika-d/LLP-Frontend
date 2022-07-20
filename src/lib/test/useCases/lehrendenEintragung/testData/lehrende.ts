import Lehrende from '$lib/useCases/lehrendenEintragung/viewModel/Lehrende'
import { personenModel } from '../../../models/testData/fakePersonen2'

const lehrende = new Lehrende([personenModel])
export default lehrende
