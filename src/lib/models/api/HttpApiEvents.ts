import { URLs } from './URLs'
import { httpDelete, httpPost, httpPut } from './httpCall'
import type { ApiStatusModel } from './ApiStatusModel'

export class HttpApiEvents {
	public lehrtaetigkeitHinzufuegen(
		terminId: string,
		personId: string,
		einrichtungsId: string,
		updateModelCallback
	): ApiStatusModel {
		console.log(
			'POST - LehrTaet hinzufügen, Termin ' +
				terminId +
				' Person ' +
				personId +
				' Einrichtung ' +
				einrichtungsId
		)
		return httpPost(
			URLs.lehrtaetigkeit,
			{ terminId, personId: personId.toString(), einrichtungsId: einrichtungsId.toString() },
			(jsonData) => updateModelCallback(jsonData.lehrTaetigkeitsId)
		)
	}

	public einrichtungSetzen(
		lehrTaetigkeitId: string,
		einrichtungsId: string,
		updateModelCallback
	): ApiStatusModel {
		console.log('PUT - LehrTaet einrichtung setzen, Einrichtung ' + einrichtungsId)
		return httpPut(
			URLs.lehrtaetigkeit + '/' + lehrTaetigkeitId,
			{ einrichtungsId: einrichtungsId.toString() },
			(jsonData) => updateModelCallback(jsonData.lehrTaetigkeitsId)
		)
	}

	public deleteLehrtaetigkeit(lehrtaetigkeitsId: string, updateModelCallback): ApiStatusModel {
		console.log('DELETE - Lehrtaetigkeit ' + lehrtaetigkeitsId)
		return httpDelete(URLs.lehrtaetigkeit + '/' + lehrtaetigkeitsId, {}, () =>
			updateModelCallback(lehrtaetigkeitsId)
		)
	}
}
