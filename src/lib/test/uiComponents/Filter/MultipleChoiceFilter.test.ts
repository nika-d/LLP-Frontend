import MultipleChoiceFilter from '$lib/uiComponents/Filter/MultipleChoice/MultipleChoiceFilter.svelte'
import Filter from '$lib/uiComponents/Filter/Filter'
import { render, fireEvent } from '@testing-library/svelte'
import VeranstaltungModelType from '$lib/models/dataTypes/Studienstruktur/VeranstaltungModelType'
import v from '../../models/testData/studienstrukturJsons/veranstaltungen_in_submodul_1513703.json'
import c from '../../models/testData/assertionConstants'
import filterTexts from '$lib/uiTexts/filter.json'

const drueckenZurAuswahlText = 'DrückenZurAuswahl'

describe('MutlipleChoiceFilter', function () {
	test('should include a badge in the dropdown button showing the number of selected items', async () => {
		const possibleChoices = ['Auswahl A', 'Eine sehr lange Auswahlmöglichkeit', 'C', '20']
		const filter = new Filter()
		const { getByText, getByLabelText } = render(MultipleChoiceFilter, {
			possibleChoices: possibleChoices,
			filter: filter,
			caption: drueckenZurAuswahlText
		})
		expect(() => getByText(drueckenZurAuswahlText)).not.toThrow()
		expect(() => getByText('Alle')).not.toThrow()
		expect(() => getByText('Auswahl A')).not.toThrow()
		expect(() => getByLabelText('Eine sehr lange Auswahlmöglichkeit')).not.toThrow()

		expect(getByText('Eine sehr lange Auswahlmöglichkeit').outerHTML).toContain('<label ')

		expect(getByText(drueckenZurAuswahlText).innerHTML).toContain('>Alle<')
		expect(getByText(drueckenZurAuswahlText).innerHTML).not.toContain('>3<')

		await fireEvent.click(getByText('Auswahl A'))
		expect(getByText(drueckenZurAuswahlText).innerHTML).toContain('>3<')
		expect(getByText(drueckenZurAuswahlText).innerHTML).not.toContain('>Alle<')

		await fireEvent.click(getByText('Auswahl umkehren'))
		expect(getByText(drueckenZurAuswahlText).innerHTML).toContain('>1<')
		expect(getByText(drueckenZurAuswahlText).innerHTML).not.toContain('>3<')

		await fireEvent.click(getByText('Auswahl A'))
		expect(getByText('DrückenZurAuswahl').innerHTML).toContain('>Keine<')
		expect(getByText(drueckenZurAuswahlText).innerHTML).not.toContain('>1<')

		await fireEvent.click(getByText('Auswahl umkehren'))
		expect(getByText(drueckenZurAuswahlText).innerHTML).toContain('>Alle<')
		expect(getByText(drueckenZurAuswahlText).innerHTML).not.toContain('>Keine<')
	})
	test('should present choices with same text as single choice and treat them as equivalents', async () => {
		const alleVeranstaltungen: Array<VeranstaltungModelType> = new Array(...v).map(
			(e) => new VeranstaltungModelType(e)
		)
		const eineVeranstaltung = alleVeranstaltungen[4]
		const aehnlicheVeranstaltung = alleVeranstaltungen[5]
		expect(eineVeranstaltung.kurzTitel).toEqual(aehnlicheVeranstaltung.kurzTitel)
		expect(eineVeranstaltung.langTitel).not.toEqual(aehnlicheVeranstaltung.langTitel)

		let filterFunction = () => true
		const filter = new Filter(
			(updatedFunction) => (filterFunction = updatedFunction as () => boolean)
		)

		const { getByText, getByLabelText } = render(MultipleChoiceFilter, {
			possibleChoices: alleVeranstaltungen,
			filter: filter,
			caption: drueckenZurAuswahlText
		})

		await fireEvent.click(getByText(c.VERANSTALTUNG_A_KURZ_TITEL))
		let veranstaltungAcheckbox = getByLabelText(c.VERANSTALTUNG_A_KURZ_TITEL, { exact: false })
		expect(veranstaltungAcheckbox).not.toHaveAttribute('checked', false)
		expect(alleVeranstaltungen.filter(filterFunction)).not.toContain(eineVeranstaltung)
		expect(alleVeranstaltungen.filter(filterFunction)).not.toContain(aehnlicheVeranstaltung)

		await fireEvent.click(getByText(filterTexts.AUSWAHL_UMKEHREN))
		veranstaltungAcheckbox = getByLabelText(c.VERANSTALTUNG_A_KURZ_TITEL, { exact: false })
		// expect(veranstaltungAcheckbox).toHaveAttribute('checked', true)
		expect(alleVeranstaltungen.filter(filterFunction)).toContain(eineVeranstaltung)
		expect(alleVeranstaltungen.filter(filterFunction)).toContain(aehnlicheVeranstaltung)
	})
})
