import uiTexts from '$lib/uiTexts/lehrendenEintragung.json'
import type { TerminType } from './dataTypes/TerminType'
import LehrTaetigkeiten from '../view/LehrTaetigkeiten.svelte'
import MultipleChoiceFilter from '$lib/uiComponents/Filter/MultipleChoice/MultipleChoiceFilter.svelte'
import StudienStrukturZelle from '../view/StudienStrukturZelle.svelte'
import LehrTeatigkeitenFilter from '../view/LehrTaetigkeitenFilter.svelte'

const configConstants = [
	{
		caption: uiTexts.CURRICULUM,
		column: true,
		getDataFunction: null,
		columnWidth: null,
		cellComponent: StudienStrukturZelle
	},
	{
		caption: uiTexts.STUDIENGANG,
		column: false,
		getDataFunction: (termin: TerminType) => termin.studiengang,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.MODUL,
		column: false,
		getDataFunction: (termin: TerminType) => termin.modul,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.VERANSTALTUNG,
		column: false,
		getDataFunction: (termin: TerminType) => termin.veranstaltung,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.LEHRFORMAT,
		column: false,
		getDataFunction: (termin: TerminType) => termin.lehrformat,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.GRUPPEN,
		column: true,
		getDataFunction: (termin: TerminType) => termin.gruppen,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.CAMPUS,
		column: true,
		getDataFunction: (termin: TerminType) => termin.campus,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.RAUM,
		column: true,
		getDataFunction: (termin: TerminType) => termin.raum,
		columnWidth: null,
		cellComponent: null,
		filterComponent: MultipleChoiceFilter
	},
	{
		caption: uiTexts.ZEIT,
		column: true,
		getDataFunction: (termin: TerminType) => termin.zeit,
		columnWidth: null,
		cellComponent: null
	},
	{
		caption: uiTexts.LEHRENDEN,
		column: true,
		getDataFunction: (termin: TerminType) => termin.lehrenden,
		columnWidth: null,
		cellComponent: LehrTaetigkeiten
	},
	{
		caption: uiTexts.LEHRENDE_FEHLT,
		column: false,
		getDataFunction: (termin: TerminType) => termin.lehrendesFehlt,
		columnWidth: null,
		filterComponent: LehrTeatigkeitenFilter
	}
]

export const filtersConstants = configConstants.filter((c) => c.filterComponent)
export const columnsConstants = configConstants.filter((c) => c.column)
