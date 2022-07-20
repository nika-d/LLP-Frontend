import { apiStatusContants } from './apiConstants'
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

export function httpCall(url, method, parameters, callback): ApiStatusModel {
	console.log(parameters)

	const statusModel = new ApiStatusModel()
	fetch(url, {
		method: method,
		headers: {
			'X-AUTH-TOKEN': 'please put a correct token here'
		},
		body: JSON.stringify(parameters)
	})
		.then((response) => {
			statusModel.set(new ApiStatusType(apiStatusContants.OK))
			return response.json()
		})
		.then((jsonData) => {
			// todo: exception handling
			console.log('CATCH ', url)
			console.log(jsonData)
			callback(jsonData)
		})
		.catch((error) => statusModel.set(new ApiStatusType(apiStatusContants.ERROR, error)))
	return statusModel
}
