import VeranstaltungModelType from '$lib/models/dataTypes/Studienstruktur/VeranstaltungModelType'
import v from '../../models/testData/studienstrukturJsons/veranstaltungen_in_submodul_1513703.json'
import c from '../../models/testData/assertionConstants'
import mapPossibleChoicesToUniqueChoiceViews from '$lib/uiComponents/Filter/MultipleChoice/mapChoicesToUniqueChoiceViewsModels'
import { ChoiceViewModel } from '$lib/uiComponents/Filter/MultipleChoice/ChoiceViewModel'

describe('mapPossibleChoicesToUniqueChoiceViews', function () {
	test('should transform non-primitives', async () => {
		const possibleChoices: Array<VeranstaltungModelType> = new Array(...v).map(
			(e) => new VeranstaltungModelType(e)
		)

		const mapped = mapPossibleChoicesToUniqueChoiceViews(possibleChoices)

		const elementWithTwoEquivalents = mapped[c.VERANSTALTUNG_A_KURZ_TITEL]
		expect(elementWithTwoEquivalents.equivalentChoices.length).toEqual(2)
	})

	test('should transform primitives', () => {
		const possibleChoices = ['Auswahl A', 'Eine sehr lange Auswahlmöglichkeit', 'C', '20']

		const mapped = mapPossibleChoicesToUniqueChoiceViews(possibleChoices)
		expect(mapped['Auswahl A']).toHaveProperty('equivalentChoices')
	})

	test('should bundle same primitives to eqivalent option', () => {
		const mehrfachVorkommenderWert = 'Auswahl A'
		const possibleChoices = [
			mehrfachVorkommenderWert,
			mehrfachVorkommenderWert,
			'Eine sehr lange Auswahlmöglichkeit',
			'C',
			'20'
		]

		const mapped = mapPossibleChoicesToUniqueChoiceViews(possibleChoices)
		expect(mapped[mehrfachVorkommenderWert]).toBeInstanceOf(ChoiceViewModel)
		expect(mapped[mehrfachVorkommenderWert].equivalentChoices.length).toBe(2)
	})
})
