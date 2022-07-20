import type EinrichtungModel from './EinrichtungModel'
import { ModelsByIdStore } from './common/ModelsByIdStore'
import type EinrichtungModelType from './dataTypes/EinrichtungModelType'

export default class EinrichtungenModel extends ModelsByIdStore<
	EinrichtungModelType,
	EinrichtungModel
> {}
