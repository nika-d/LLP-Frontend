import { render } from '@testing-library/svelte'
import TextInput from '$lib/uiComponents/TextInput.svelte'
import { describe, test } from 'vitest'

describe('TextInput', function () {
	test('should render a textbox', () => {
		const { getByRole } = render(TextInput, { placeholder: 'platzhalter' }) //render-Methode von @testing-library/svelte
		expect(() => getByRole('textbox')).not.toThrow() //statt should.js kann auch was anderes für assertions genutzt werden
	})
})
