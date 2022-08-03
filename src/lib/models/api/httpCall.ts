import { apiStatusConstants } from './apiConstants'
import { ApiStatusModel } from './ApiStatusModel'
import { ApiStatusType } from './ApiStatusType'

export function httpPost(url, parameters, callback): ApiStatusModel {
	return httpCall(url, 'post', parameters, callback)
}

export function httpPut(url, parameters, callback): ApiStatusModel {
	return httpCall(url, 'put', parameters, callback)
}

export function httpGet(url, parameters, callback): ApiStatusModel {
	return httpCall(url, 'get', parameters, callback)
}

export function httpDelete(url, parameters, callback): ApiStatusModel {
	return httpCall(url, 'delete', parameters, callback)
}

export function httpCall(url, method, parameters, callback): ApiStatusModel {
	const statusModel = new ApiStatusModel()
	fetch(url, {
		method: method,
		headers: {
			'X-AUTH-TOKEN': 'please put a correct token here'
		},
		body: JSON.stringify(parameters)
	})
		.then((response) => {
			statusModel.set(new ApiStatusType(apiStatusConstants.OK))
			return response.json()
		})
		.then((jsonData) => {
			callback(jsonData)
		})
		.catch((error) => {
			statusModel.set(
				new ApiStatusType(apiStatusConstants.ERROR, error.errorCode + ' - ' + error.errorMessage)
			)
		})
	return statusModel
}
