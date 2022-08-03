import { WritableStore } from '$lib/common/WritableStore'
import { ApiStatusType } from './ApiStatusType'
import { apiStatusConstants } from './apiConstants'

export class ApiStatusModel extends WritableStore<ApiStatusType> {
	constructor(statusCode: apiStatusConstants = apiStatusConstants.PENDING, errorMessage = '') {
		super(new ApiStatusType(statusCode, errorMessage))
	}
	public reinitialize() {
		this.set(new ApiStatusType(apiStatusConstants.INITIAL, ''))
	}
}
