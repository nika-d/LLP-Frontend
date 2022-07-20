import Alert from 'src/routes/Components/Alert.svelte'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/svelte'

describe('Alert, eine Component mit Bootstrap ohne Popper', () => {
	test('schließt bei click', async () => {
		const { getByRole, getByText } = render(Alert),
			alertDiv = getByRole('alert')
		expect(alertDiv).toBeInTheDocument()
		expect(getByText('blub')).toBeInTheDocument()
		fireEvent.click(getByRole('alert'))
		expect(alertDiv).not.toBeInTheDocument()
	})
})
