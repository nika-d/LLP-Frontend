import { render } from '@testing-library/svelte'
import AutoComplete from '$lib/uiComponents/AutoComplete/AutoComplete.svelte'
import AutoCompleteItemEinrichtungType from '$lib/useCases/lehrendenEintragung/viewModel/dataTypes/AutoCompleteItemEinrichtungType'

describe('AutoComplete', () => {
	test('should be simply renderable in test environment', () => {
		const options = {
			items: [
				new AutoCompleteItemEinrichtungType('id1', 'label1'),
				new AutoCompleteItemEinrichtungType('id2', 'label2'),
				new AutoCompleteItemEinrichtungType('id3', 'label3')
			]
		}
		const { getAllByRole } = render(AutoComplete, options)
		expect(getAllByRole('textbox').length).toEqual(1)
	})
})
