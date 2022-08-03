import { LehrTaetigkeitType } from './dataTypes/LehrTaetigkeitType'
import AutoCompleteItemEinrichtungType from './dataTypes/AutoCompleteItemEinrichtungType'
import { WritableStore } from '../../../common/WritableStore'

export enum MultiPasteStates {
	NOT_ACTIVATED,
	ACTIVATED,
	TO_BE_SAVED
}

export const emptyLehrtaetigkeitType = new LehrTaetigkeitType(
	'',
	new AutoCompleteItemEinrichtungType('', ''),
	false,
	[]
)

export const multiPasteEntry = new WritableStore<LehrTaetigkeitType>(emptyLehrtaetigkeitType)
export const multiPasteControl = new WritableStore<boolean>(false)
