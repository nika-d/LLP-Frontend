import type PersonModel from './PersonModel'
import { ModelsByIdStore } from './common/ModelsByIdStore'
import type { PersonModelType } from './dataTypes/PersonModelType'

export default class PersonenModel extends ModelsByIdStore<PersonModelType, PersonModel> {}
