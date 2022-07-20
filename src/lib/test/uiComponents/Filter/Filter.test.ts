import Filter from '$lib/uiComponents/Filter/Filter'

describe('Filter', function () {
	const allData = [
		{ property1: 'a', property2: 1 },
		{ property1: 'b', property2: 2 },
		{ property1: 'ccc', property2: 3 },
		{ property1: 'd', property2: 4 }
	]
	const resultArray = [
		{ property1: 'a', property2: 1 },
		{ property1: 'b', property2: 2 },
		{ property1: 'd', property2: 4 }
	]

	test('should take functions for getting data and filtering and provide a function applying both', function () {
		let applyFilter: (string) => boolean = () => true
		const filter = new Filter<string>((updated: (s: string) => boolean) => (applyFilter = updated))

		filter.set_getFilterableData((obj) => obj['property1'])
		filter.set_filter((x) => x.length < 2)

		const filteredData = allData.filter(applyFilter)

		expect(filteredData).toEqual(expect.arrayContaining(resultArray))
	})

	test('can be used for multi-property filters', function () {
		let applyFilter: (string) => boolean = () => true
		const filter = new Filter<string>((updated: (s: string) => boolean) => (applyFilter = updated))

		filter.set_getFilterableData((obj) => obj['property1'] + obj['property2'])
		filter.set_filter((x: string) => x.length < 4)

		const filteredData = allData.filter(applyFilter)

		expect(filteredData).toEqual(expect.arrayContaining(resultArray))
	})
})
