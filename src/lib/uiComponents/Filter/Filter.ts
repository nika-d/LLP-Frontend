export type FilterableDataFunctionType<T> = { (anyObject: object): T }
export type FilterFunctionType<T> = { (filterableData: T): boolean }

export default class<FilterableDataType> {
	private getFilterableData: FilterableDataFunctionType<FilterableDataType> = (x) =>
		x as unknown as FilterableDataType
	private filter: FilterFunctionType<FilterableDataType> = () => true
	private readonly expose_applyFilter

	constructor(expose_applyFilter: (x: unknown) => void = () => null) {
		this.expose_applyFilter = expose_applyFilter
	}

	public set_getFilterableData(
		getFilterableDataFunction: FilterableDataFunctionType<FilterableDataType>
	) {
		this.getFilterableData = getFilterableDataFunction
		this.expose_applyFilter(this.applyFilter)
	}

	public set_filter(filter: FilterFunctionType<FilterableDataType>) {
		this.filter = filter
		this.expose_applyFilter(this.applyFilter)
	}

	private get applyFilter(): FilterFunctionType<FilterableDataType> {
		const applyFunction = (candidateForCheck: object): boolean =>
			this.filter(this.getFilterableData(candidateForCheck))
		//explizite bindings notwendig, weil diese function später als Parameter in arrow functions herumgereicht wird
		return applyFunction.bind(this)
	}
}
