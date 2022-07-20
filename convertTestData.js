import { readFile, writeFile } from 'fs/promises'

let json = JSON.parse(
	await readFile(new URL('./test/models/testData/eineModulwocheImMSM2.json', import.meta.url))
)

let alleTermineNeu = []

json.forEach((termin) => {
	if (termin['lehrTaetigkeiten'].length === 0) {
		console.log('empty')
		termin['missingLehrende'] = true
		console.log(termin)
	} else {
		termin['missingLehrende'] = false
	}
	alleTermineNeu.push(termin)
})

json = alleTermineNeu

let jsonString = JSON.stringify(json)

await writeFile('./test/models/testData/eineModulwocheImMSM2_missingLehrende.json', jsonString)
