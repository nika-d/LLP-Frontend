import { PersonModelType } from '$lib/models/dataTypes/PersonModelType'
import anotherJsonArray from './fakePersonen1.json'
import PersonModel from '$lib/models/PersonModel'
import PersonenModel from '$lib/models/PersonenModel'

function makeTestData(): Map<string, PersonModelType> {
	const personenMap = new Map<string, PersonModelType>()

	const personenParameter = new Map([
		[
			'/K4Ysl4S4U9x4N7g+D/Vuw293iw=',
			['Mustermann', 'Petra', ['5'], 'Dr.', 'petra.mustermann@charite.de']
		],
		[
			'/KXI3DufuRqk/SIzfWncdAjTf5A=',
			['Hinterseer', 'Hansi', ['10', '12'], null, 'Hansi.Hinterseer@charite.de']
		],
		['00J2lj6tJ8APwu6cztcUq5hiPcg=', ['Bing', 'Alexandra', [], null, 'alexandra.bing@charite.de']],
		[
			'00kffxuZSKpBXX0CwMbDTL4eUwQ=',
			['Wilke', 'John P.', ['12', '15'], null, 'John.P.Wilke@charite.de']
		],
		[
			'1L4QAL2s/nYpZGdPDjCIKbFcYn0=',
			['Schucke', 'Leo-Arnd', ['39'], 'Dr. med.', 'leo-arnd.schucke@charite.de']
		],
		['uZP+h5qES3kmCjvNcw4gHWNi+aU=', ['Kaiser', 'Julia', ['39'], 'Dr.', 'julia.kaiser@charite.de']],
		[
			'uWYkjQYfFJ0ZNDLFvlyYtr7eIKA=',
			['Lagewiese', 'Mark', ['39'], 'Dr.', 'mark.lagewiese@charite.de']
		],
		[
			'uUIV6Y9Lkl4l2XeO8AZahQoYQtg=',
			['Jakob', 'Phillip', ['39', '114'], 'Dr. med.', 'phillip.jakob@charite.de']
		],
		[
			'BCRcOxcIuq31WCku45+xWwB8VT8=',
			['Weißdorn', 'Mick', ['63'], 'Prof. Dr. ', 'mick.weissdorn@charite.de']
		],
		[
			'22cxrItF+ossyIQF5O1vcRXZD00=',
			['Ohle', 'Markus', ['16'], 'Univ.-Prof. Dr.', 'markus.ohle@charite.de']
		]
	])

	personenParameter.forEach((p, id) =>
		personenMap.set(
			id,
			new PersonModelType({
				nachname: p[0] as string,
				vorname: p[1] as string,
				einrichtungsIds: p[2] as Array<string>,
				titel: p[3] as string,
				email: p[4] as string
			})
		)
	)

	anotherJsonArray.forEach((p) => personenMap.set(p['id'], new PersonModelType(p)))
	return personenMap
}

export const fakePersonen2 = makeTestData()

const models = new Map<string, PersonModel>()
fakePersonen2.forEach((p, id) => models.set(id, new PersonModel(p)))
export const personenModels = models
export const personenModel = new PersonenModel(models)
