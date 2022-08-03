export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export function areSameValuesInBothArrays(a1: Array<unknown>, a2: Array<unknown>): boolean {
	let result = true

	for (const e1 of a1) {
		if (!a2.find((e2) => e1 == e2)) {
			result = false
			break
		}
	}

	if (result)
		for (const e2 of a2)
			if (!a1.find((e1) => e1 == e2)) {
				result = false
				break
			}

	return result
}
