import { apiStatusContants } from './apiConstants'

export class ApiStatusType {
	public readonly statusCode: string
	public readonly errorMessage: string

	constructor(statusCode: apiStatusContants = apiStatusContants.PENDING, errorMessage = '') {
		this.statusCode = statusCode
		this.errorMessage = errorMessage
	}

	get pending(): boolean {
		return this.statusCode == apiStatusContants.PENDING
	}
	get error(): boolean {
		return this.statusCode == apiStatusContants.ERROR
	}
	get ok(): boolean {
		return this.statusCode == apiStatusContants.OK
	}

	public toString() {
		return this.statusCode + ' ' + this.errorMessage
	}
}
