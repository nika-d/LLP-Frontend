import { ModelsStore } from '$lib/models/common/ModelsStore'
import { ItemStore } from '$lib/common/ItemStore'

class Model extends ItemStore<string> {}
class MyModelsStore extends ModelsStore<string, Model> {}

describe('Abstract Models Store', function () {
	test('should not be able to set a new value', function () {
		const storeInstance = new MyModelsStore([new Model('abc')])
		try {
			storeInstance.set()
		} catch (e) {
			expect(e.message).toBe('Darf nie gesetzt werden')
		}
	})
})
