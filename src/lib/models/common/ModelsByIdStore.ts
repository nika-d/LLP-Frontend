import { ItemsByIdStore } from '$lib/common/ItemsByIdStore'
import type { JSONValue } from '../api/JSON'
import type { ItemStore } from '$lib/common/ItemStore'
import { get } from 'svelte/store'

export abstract class ModelsByIdStore<S, T extends ItemStore<S>> extends ItemsByIdStore<T> {
	public set() {
		throw Error('Darf nie gesetzt werden')
	}

	public static fromJson<
		TModelType,
		TModel extends ItemStore<TModelType>,
		TsModel extends ModelsByIdStore<TModelType, TModel>
	>(
		jsonArray: Array<JSONValue>,
		modelTypeConstructor: new (p: JSONValue) => TModelType,
		modelConstructor: new (mt: TModelType) => TModel,
		modelsConstructor: new (m: Map<string, TModel>) => TsModel
	): TsModel {
		const modelsById = this.getMapFromJsonArray(jsonArray, modelTypeConstructor, modelConstructor)
		return new modelsConstructor(modelsById)
	}

	public static getMapFromJsonArray<ModelType, Model extends ItemStore<ModelType>>(
		jsonArray: Array<JSONValue>,
		modelTypeConstructor: new (p: JSONValue) => ModelType,
		modelConstructor: new (ModelType) => Model
	) {
		const modelsById = new Map()

		jsonArray?.forEach((item) => {
			if (!item['id']) throw new TypeError('Missing id in JSON: ' + JSON.stringify(item))
			modelsById.set(item['id'].toString(), new modelConstructor(new modelTypeConstructor(item)))
		})
		return modelsById
	}

	public get(): Map<string, S> {
		const mapOfModels = get(this),
			mapOfObjects = new Map<string, S>()

		mapOfModels.forEach((model, id) => mapOfObjects.set(id, get(model)))

		return mapOfObjects
	}
}
