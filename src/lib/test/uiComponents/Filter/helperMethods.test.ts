import * as helpers from '$lib/uiComponents/Filter/helperMethods'
import filterTexts from '$lib/uiTexts/filter.json'

describe('Filter helper methods', function () {
	describe('getArrayIntersection', function () {
		test('should calculate the intersection', function () {
			const a1 = [1, 2, 3],
				a2 = [2, 3, 4]
			const testee = helpers.getArrayIntersection(a1, a2)

			expect(testee).toEqual(expect.arrayContaining([2, 3]))
			expect(testee.length).toBe(2)
		})
	})
	describe('getArrayDiff', function () {
		test('should calculate the difference', function () {
			const a1 = [1, 2, 3],
				a2 = [2, 3, 4]
			const testee = helpers.getArrayDiff(a1, a2)

			expect(testee).toEqual(expect.arrayContaining([1, 4]))
			expect(testee.length).toBe(2)
		})
	})

	describe('getNewFilterInformationText', function () {
		test('should provide a reasonable text for a multiple choice filter', function () {
			expect(helpers.getNewFilterInformationText([], [])).toBe(filterTexts.ALLE)
			expect(helpers.getNewFilterInformationText([], ['1', '2'])).toBe(filterTexts.KEINE)
			expect(helpers.getNewFilterInformationText(['1', '2'], ['1', '2'])).toBe(filterTexts.ALLE)
			expect(helpers.getNewFilterInformationText(['1'], ['1', '2'])).toBe('1')
			expect(helpers.getNewFilterInformationText(['1', '2'], ['1', '2', '3'])).toBe(
				filterTexts.MEHRERE
			)
		})
	})

	describe('checkIfObjectContainsTexts_classInstance', function () {
		class SomeClass {
			private prop1 = 'hello'
			private prop2 = '12345'
			private prop3 = [5, 6, 7]
			public func1 = () => null
		}
		const complicatedObject = new SomeClass()

		test('should return true if object contains all texts', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['123', 'll'], complicatedObject)
			).toBeTruthy()
		})
		test('should deal with arrays', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts([',6,'], complicatedObject)
			).toBeTruthy()
		})
		test('should not be case sensitive', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['123', 'lL'], complicatedObject)
			).toBeTruthy()
		})
		test('should return false if object contains only some texts', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['123', 'piep'], complicatedObject)
			).toBeFalsy()
		})
		test('should return false if object does not contain any text', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['hello', 'x'], complicatedObject)
			).toBeFalsy()
		})

		test('should return false if search string matches (only) property name', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['prop1'], complicatedObject)
			).toBeFalsy()
		})
	})

	describe('checkIfObjectContainsTexts_objectIsMap', function () {
		const object = {
			prop1: 'hello',
			prop2: '12345',
			prop3: [5, 6, 7]
		}
		test('should return true if object contains all texts', function () {
			expect(
				helpers.checkIfNonPrimitiveObjectContainsTexts(['hello', '12345'], object)
			).toBeTruthy()
		})
		test('should return false if search string matches (only) property name', function () {
			expect(helpers.checkIfNonPrimitiveObjectContainsTexts(['prop1'], object)).toBeFalsy()
		})
	})
})
