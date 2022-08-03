import { httpCall } from '$lib/models/api/httpCall'
import { delay } from '../../utils'
import { expect } from 'vitest'
import { get } from 'svelte/store'
import { apiStatusConstants } from '../../../models/api/apiConstants'

describe('httpCall', function () {
	it('should create an error instance of ApiStatusType when API gives an Error', async function () {
		const url = 'urlIstEgal',
			fakeData = {},
			callbackOnSuccess = () => null,
			anyObject = { callbackBeiErfolg: callbackOnSuccess },
			spyOnCallback = vi.spyOn(anyObject, 'callbackBeiErfolg'),
			someErrorCode = '35',
			someErrorMessage = 'some error message'

		//global.fetch = vi.fn(() => Promise.reject(someErrorMessage))
		global.fetch = vi.fn(() =>
			Promise.reject({ errorCode: someErrorCode, errorMessage: someErrorMessage })
		)

		const apiStatusModel = httpCall(url, 'post', fakeData, callbackOnSuccess)

		await delay(50)

		const apiStatus = get(apiStatusModel)

		expect(apiStatus.statusCode).toEqual(apiStatusConstants.ERROR)
		expect(apiStatus.errorMessage).toContain(someErrorCode)
		expect(apiStatus.errorMessage).toContain(someErrorMessage)
		expect(spyOnCallback).not.toHaveBeenCalled()
	})
})
