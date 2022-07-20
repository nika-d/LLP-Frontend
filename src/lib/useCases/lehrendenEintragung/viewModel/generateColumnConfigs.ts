import ColumnConfig from '$lib/uiComponents/Table/ColumnConfig'
import { columnsConstants } from './configConstants'

export default function (): ColumnConfig[] {
	return columnsConstants.map(
		(config) =>
			new ColumnConfig(
				config.getDataFunction ?? ((row) => row),
				config.caption,
				config.columnWidth,
				config.cellComponent
			)
	)
}
