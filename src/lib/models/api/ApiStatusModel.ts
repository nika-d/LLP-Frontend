import { WritableStore } from '$lib/common/WritableStore'
import { ApiStatusType } from './ApiStatusType'
import { apiStatusContants } from './apiConstants'

export class ApiStatusModel extends WritableStore<ApiStatusType> {
	constructor(statusCode: apiStatusContants = apiStatusContants.PENDING, errorMessage = '') {
		super(new ApiStatusType(statusCode, errorMessage))
	}
}
