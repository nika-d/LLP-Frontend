import { ZeitSpanne } from '$lib/models/dataTypes/ZeitSpanne'

export function getAlphabeticalSorting(columnKey) {
	return (tableRowA, tableRowB) =>
		tableRowA[columnKey] < tableRowB[columnKey]
			? -1
			: tableRowA[columnKey] > tableRowB[columnKey]
			? 1
			: 0
}

export function getChronologicalSorting(columnKey) {
	return function (tableRowA, tableRowB) {
		const zeitA = tableRowA[columnKey],
			zeitB = tableRowB[columnKey],
			fruehereZeit = ZeitSpanne.welcheStartetZuerst(zeitA, zeitB)
		return fruehereZeit === zeitA ? -1 : fruehereZeit === zeitB ? 1 : 0
	}
}
