import type { ItemStore } from '$lib/common/ItemStore'
import type { JSONValue } from '../api/JSON'

export default function <TModelType, TModel extends ItemStore<TModelType>>(
	jsonArray: Array<JSONValue>,
	modelTypeConstructor: new (p: JSONValue) => TModelType,
	modelConstructor: new (m: TModelType) => TModel
): Array<TModel> {
	return jsonArray.map((json) => new modelConstructor(new modelTypeConstructor(json)))
}
