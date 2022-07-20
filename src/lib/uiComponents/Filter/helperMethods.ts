export function getArrayIntersection(
	array1: Array<unknown>,
	array2: Array<unknown>
): Array<unknown> {
	return array1.filter((a1) => array2.find((a2) => a2 === a1))
}

export function getArrayDiff(array1: Array<unknown>, array2: Array<unknown>): Array<unknown> {
	return array1
		.filter((a1) => !array2.find((a2) => a2 === a1))
		.concat(array2.filter((a2) => !array1.find((a1) => a1 === a2)))
}

import filterTexts from '../../uiTexts/filter.json'

/*
Diese Methode ist ein Kandidat zum Löschen. Wenn sie im Oktober 2022 nirgends genutzt wird, weg!
* */
export function getNewFilterInformationText(
	selectedChoices: Array<string>,
	possibleChoices: Array<string>
) {
	return possibleChoices.length === 0
		? filterTexts.ALLE
		: selectedChoices.length === 0
		? filterTexts.KEINE
		: selectedChoices.length === possibleChoices.length
		? filterTexts.ALLE
		: selectedChoices.length === 1
		? selectedChoices[0]
		: filterTexts.MEHRERE
}

export function checkIfNonPrimitiveObjectContainsTexts(
	textsToFind: Array<string>,
	object: object
): boolean {
	const textsLowerCase = textsToFind.map((t) => t.toLowerCase()),
		objectAsString = JSON.stringify(Object.values(object)).toLowerCase()

	return textsLowerCase.reduce(
		(textsContained, text) => textsContained && objectAsString.includes(text),
		true
	)
}
