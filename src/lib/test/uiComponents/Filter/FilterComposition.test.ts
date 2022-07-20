import { derived, readable } from 'svelte/store'
import FilterComposition from '$lib/uiComponents/Filter/FilterComposition'

describe('FilterComposition', function () {
	test('should hold filters and apply them composed by logical AND', function () {
		const allDataStored = readable([
			{ property1: 'a', property2: 1 },
			{ property1: 'b', property2: 2 },
			{ property1: 'ccc', property2: 3 },
			{ property1: 'd', property2: 4 }
		])

		const filterComposition = new FilterComposition()

		const filterFunctionStored = filterComposition.applyComposedFilters

		const filteredData = derived(
			[allDataStored, filterFunctionStored],
			([$allDataStored, $filterFunctionStored]) => {
				const filtered = $allDataStored.filter($filterFunctionStored)
				return filtered
			}
		)

		let filteredDataSubscription
		filteredData.subscribe((value) => (filteredDataSubscription = value))

		const filter1 = filterComposition.createFilterInComposition()
		filter1.set_getFilterableData((obj) => obj['property1'])
		filter1.set_filter((x) => x.length < 2)

		expect(filteredDataSubscription.length).toBe(3)
		expect(filteredDataSubscription).toEqual(
			expect.arrayContaining([
				{ property1: 'a', property2: 1 },
				{ property1: 'b', property2: 2 },
				{ property1: 'd', property2: 4 }
			])
		)

		const filter2 = filterComposition.createFilterInComposition()
		filter2.set_getFilterableData((obj) => obj['property2'])
		filter2.set_filter((x) => x < 4)

		expect(filteredDataSubscription.length).toBe(2)
		expect(filteredDataSubscription).toEqual(
			expect.arrayContaining([
				{ property1: 'a', property2: 1 },
				{ property1: 'b', property2: 2 }
			])
		)
	})
})
