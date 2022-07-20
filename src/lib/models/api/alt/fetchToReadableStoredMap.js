export default function fetchToReadableStoredMap(
	targetStoreSet,
	mappingFunction,
	api,
	pendingCounter_store
) {
	/*console.log('FETCH', api.substr(37))*/

	if (pendingCounter_store) pendingCounter_store.increase()

	fetch(api)
		.then((response) => response.json())
		.then((jsonData) => {
			/*console.log('CATCH ', api.substr(37))*/

			targetStoreSet(mappingFunction(jsonData))

			if (pendingCounter_store) pendingCounter_store.decrease()
		})
}
