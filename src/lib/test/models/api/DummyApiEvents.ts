import { HttpApiEvents } from '$lib/models/api/HttpApiEvents'
import { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
import { apiStatusContants } from '$lib/models/api/apiConstants'
import { ApiStatusType } from '$lib/models/api/ApiStatusType'
import { delay } from '$lib/test/utils'

const DELAY = 10 // Damit die Tests laufen, darf hier max 10 stehen

export class DummyApiEvents extends HttpApiEvents {
	public lehrtaetigkeitHinzufuegen(
		terminId: string,
		personId: string,
		einrichtungsId: string,
		updateModelCallback
	): ApiStatusModel {
		console.log(
			'Dummy - LehrTaet hinzufügen, Termin ' +
				terminId +
				' Person ' +
				personId +
				' Einrichtung ' +
				einrichtungsId
		)

		const apiStatusModel = new ApiStatusModel(apiStatusContants.PENDING)

		;(async () => {
			await delay(DELAY)

			apiStatusModel.set(apiSuccess(updateModelCallback, '27')) // Damit die Tests laufen, muss apiCall gelingen
			//apiStatusModel.set(apiFail())
		})()

		return apiStatusModel
	}
	public einrichtungSetzen(
		lehrTaetigkeitId: string,
		einrichtungsId: string,
		updateModelCallback
	): ApiStatusModel {
		console.log('Dummy - Einrichtung setzen, Einrichtung ' + einrichtungsId)

		const apiStatusModel = new ApiStatusModel(apiStatusContants.PENDING)

		;(async () => {
			await delay(DELAY)

			//if (Math.random()>.5)
			apiStatusModel.set(apiSuccess(updateModelCallback, einrichtungsId)) // Damit die Tests laufen, muss apiCall gelingen
			//else
			//  apiStatusModel.set(apiFail())
		})()

		return apiStatusModel
	}
}

function apiSuccess(updateModelCallback, updateParameter): ApiStatusType {
	updateModelCallback(updateParameter)
	return new ApiStatusType(apiStatusContants.OK)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function apiFail(): ApiStatusType {
	return new ApiStatusType(apiStatusContants.ERROR, 'Fehlercode: 485C! Schlimm!')
}
