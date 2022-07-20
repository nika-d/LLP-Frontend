export default function fetchToStoredMap(target_store, mappingFunction, api) {
	/*console.log('FETCH', api.substr(37))*/

	fetch(api)
		.then((response) => response.json())
		.then((jsonData) => {
			target_store.update((oldValues) => {
				/*console.log('CATCH ', api.substr(37))*/
				/*console.log('before fetch: ')
                console.log(oldValues)*/
				let fetchedValues = mappingFunction(jsonData)
				fetchedValues.forEach((newValue, newValueKey) => oldValues.set(newValueKey, newValue))
				let newValues = new Map(oldValues.entries())
				return newValues
			})
			target_store.fetched = true
		})
}
