import { HttpApiEvents } from '$lib/models/api/HttpApiEvents'
import { ApiStatusModel } from '$lib/models/api/ApiStatusModel'
import { apiStatusConstants } from '$lib/models/api/apiConstants'
import { ApiStatusType } from '$lib/models/api/ApiStatusType'

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

		return dummyAPICallWithResultOK(updateModelCallback, '27')
	}

	public einrichtungSetzen(
		lehrTaetigkeitId: string,
		einrichtungsId: string,
		updateModelCallback
	): ApiStatusModel {
		console.log('Dummy - Einrichtung setzen, Einrichtung ' + einrichtungsId)
		return dummyAPICallWithResultOK(updateModelCallback, einrichtungsId)
	}

	public deleteLehrtaetigkeit(lehrtaetigkeitsId: string, updateModelCallback): ApiStatusModel {
		console.log('Dummy - DELETE Lehrtaetigkeit ' + lehrtaetigkeitsId)
		return dummyAPICallWithResultOK(updateModelCallback, lehrtaetigkeitsId)
	}
}

function dummyAPICallWithResultOK(updateModelCallback, updateParameter) {
	const apiStatusModel = new ApiStatusModel(apiStatusConstants.PENDING)
	updateModelCallback(updateParameter)
	apiStatusModel.set(new ApiStatusType(apiStatusConstants.OK)) // Damit die Tests laufen, muss apiCall gelingen
	return apiStatusModel
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function apiFail(): ApiStatusType {
	return new ApiStatusType(apiStatusConstants.ERROR, 'Fehlercode: 485C! Schlimm!')
}
