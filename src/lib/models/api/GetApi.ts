import { URLs } from './URLs'
import { httpGet } from './httpCall'
import type { ApiStatusModel } from './ApiStatusModel'

export class GetApi {
	public static getStudienstruktur(
		zeitsemester: string,
		studiengangId: string = null
	): ApiStatusModel {
		return httpGet(
			URLs.studienstrukturByZeitsemester + '/' + zeitsemester + '/' + studiengangId,
			{},
			(jsonData) => console.log(jsonData)
		)
	}
}
