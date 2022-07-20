import { LehrTaetigkeitModel } from '$lib/models/LehrTaetigkeitModel'
import { LehrTaetigkeitModelType } from '$lib/models/dataTypes/LehrTaetigkeitModelType'
import { LehrTaetigkeitenModel } from '$lib/models/LehrTaetigkeitenModel'

export const jsonArray = [
	{
		id: '1',
		personId: '/K4Ysl4S4U9x4N7g+D/Vuw293iw=',
		einrichtungsId: '5'
	},
	{
		id: '2',
		personId: '00kffxuZSKpBXX0CwMbDTL4eUwQ=',
		einrichtungsId: '120'
	},
	{
		id: '3',
		personId: '00J2lj6tJ8APwu6cztcUq5hiPcg=',
		einrichtungsId: null
	}
]

export const createLehrTaetigkeitModel = function (): LehrTaetigkeitModel {
	return new LehrTaetigkeitModel(new LehrTaetigkeitModelType(jsonArray[0]))
}

export const createLehrTaetigkeitenModel = function (): LehrTaetigkeitenModel {
	return new LehrTaetigkeitenModel(
		[
			new LehrTaetigkeitModel(new LehrTaetigkeitModelType(jsonArray[0])),
			new LehrTaetigkeitModel(new LehrTaetigkeitModelType(jsonArray[1])),
			new LehrTaetigkeitModel(new LehrTaetigkeitModelType(jsonArray[2]))
		],
		'20211-123'
	)
}
