import { act, fireEvent, render } from '@testing-library/svelte'
import Chip from '../../uiComponents/Chip.svelte'

describe('Chip', function () {
	let renderResult, renderedChip

	beforeEach(() => {
		renderResult = render(Chip, { option: 'TestChip' })
		renderedChip = renderResult.component
	})

	test('should per default be enabled and inactive', () => {
		expect(renderedChip.active).toBe(false)
		expect(renderedChip.disabled).toBe(false)
	})

	test('should change to active when clicked', async () => {
		await fireEvent.click(renderResult.getByText('TestChip'))
		expect(renderedChip.active).toBe(true)
	})

	test('should not be able to be activated when disabled', async () => {
		renderedChip.$set({ disabled: true })
		expect(renderedChip.active).toBe(false)
		await fireEvent.click(renderResult.getByText('TestChip'))
		expect(renderedChip.active).toBe(false)
	})

	test('should get deactivated when disabled', async () => {
		await fireEvent.click(renderResult.getByText('TestChip'))
		expect(renderedChip.active).toBe(true)
		await act(() => renderedChip.$set({ disabled: true }))
		expect(renderedChip.active).toBe(false)
		await act(() => renderedChip.$set({ disabled: false }))
		expect(renderedChip.active).toBe(false)
	})
})
