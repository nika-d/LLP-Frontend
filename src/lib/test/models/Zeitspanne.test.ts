import ZeitSpanne from '$lib/models/common/ZeitSpanne'

describe('Zeitspanne', function () {
	test('liegtZwischen', function () {
		const start = '2021-05-03T14:00:00+02:00'
		const ende = '2021-05-03T16:00:00+02:00'

		const zeitspanne = new ZeitSpanne(start, ende)

		const testStart = new Date('2021-05-02T14:00:00+02:00')
		const testEnd = new Date('2021-05-04T16:00:00+02:00')

		expect(zeitspanne.liegtZwischen(testStart, testEnd)).toBe(true)
		expect(zeitspanne.liegtZwischen(testStart, null)).toBe(true)
		expect(zeitspanne.liegtZwischen(null, testEnd)).toBe(true)
		expect(zeitspanne.liegtZwischen(null, null)).toBe(true)
		expect(zeitspanne.liegtZwischen(testEnd, testStart)).toBe(false)
		expect(zeitspanne.liegtZwischen(testEnd, null)).toBe(false)
		expect(zeitspanne.liegtZwischen(null, testStart)).toBe(false)
	})
})
