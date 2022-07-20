import { Chapter, MenuContent, Route } from './navigation/typesForNavigation'

export const menuContent = new MenuContent([
	new Chapter(new Route('/LehrendenEintragung', 'LehrendenEintragung'), []),

	new Chapter(new Route('/Basics', 'Basics'), [
		new Route('/Basics/Spacing', 'Spacing'),
		new Route('/Basics/Devices', 'Devices')
	]),
	new Chapter(new Route('/Components', 'Components'), [
		new Route('/Components/Button', 'Button'),
		new Route('/Components/Badge', 'Badge'),
		new Route('/Components/Checkbox', 'Checkbox'),
		new Route('/Components/ChipShowcase', 'Chip'),
		new Route('/Components/TextInput', 'TextInput'),
		new Route('/Components/Indicators', 'Indicators'),
		new Route('/Components/Alert', 'Alert'),
		new Route('/Components/AutoComplete', 'AutoComplete'),
		new Route('/Components/Dropdown', 'Dropdown'),
		new Route('/Components/MultipleChoiceFilter', 'MultipleChoiceFilter'),
		new Route('/Components/Table', 'Table'),
		new Route('/Components/SearchFilter', 'SearchFilter'),
		new Route('/Components/Table/TableWithFilterComposition', 'Table with filters')
	])
])
