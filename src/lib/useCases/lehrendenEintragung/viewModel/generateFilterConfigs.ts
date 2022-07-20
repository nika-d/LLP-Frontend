import FilterComponentConfig from '$lib/uiComponents/Filter/FilterComponentConfig'
import MultipleChoiceFilter from '$lib/uiComponents/Filter/MultipleChoice/MultipleChoiceFilter.svelte'
import { filtersConstants } from './configConstants'
import type FilterComposition from '$lib/uiComponents/Filter/FilterComposition'
import type Filter from '$lib/uiComponents/Filter/Filter'
import type { FilterableDataFunctionType } from '$lib/uiComponents/Filter/Filter'

export default function (rowsData, filterComposition: FilterComposition): FilterComponentConfig[] {
	return filtersConstants.map((config) => {
		const type = typeof config.getDataFunction
		const filter: Filter<typeof type> = filterComposition.createFilterInComposition<typeof type>()
		filter.set_getFilterableData(config.getDataFunction as FilterableDataFunctionType<typeof type>)
		const props = { filter }
		if (config.filterComponent === MultipleChoiceFilter) {
			props['caption'] = config.caption
			props['possibleChoices'] = [...new Set(rowsData.map(config.getDataFunction))]
		}
		return new FilterComponentConfig(config.filterComponent, props)
	})
}
