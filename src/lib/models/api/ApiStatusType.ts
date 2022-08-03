import { apiStatusConstants } from './apiConstants'

export class ApiStatusType {
	public readonly statusCode: string
	public readonly errorMessage: string

	constructor(statusCode: apiStatusConstants = apiStatusConstants.PENDING, errorMessage = '') {
		this.statusCode = statusCode
		this.errorMessage = errorMessage
	}

	get isPending(): boolean {
		return this.statusCode == apiStatusConstants.PENDING
	}
	get isError(): boolean {
		return this.statusCode == apiStatusConstants.ERROR
	}
	get isOk(): boolean {
		return this.statusCode == apiStatusConstants.OK
	}
	get isInitial(): boolean {
		return this.statusCode == apiStatusConstants.INITIAL
	}
}
