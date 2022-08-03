import EinrichtungModelType from '$lib/models/dataTypes/Einrichtung/EinrichtungModelType'
import EinrichtungModel from '$lib/models/EinrichtungModel'
import EinrichtungenModel from '$lib/models/EinrichtungenModel'

export const json = {
	einrichtungen: [
		{
			id: '5',
			name: 'CC01 - Institut für Geschichte der Medizin und Ethik in der Medizin - CBF'
		},
		{
			id: '13',
			name: 'CC02 - Institut für Physiologie - CCM'
		},
		{
			id: '14',
			name: 'CC02 - Institut für Vegetative Physiologie - CCM'
		},
		{
			id: '15',
			name: 'CC02 - Institut für Integrative Neuroanatomie - CCM'
		},
		{
			id: '16',
			name: 'CC02 - Institut für Funktionelle Anatomie - CCM'
		},
		{
			id: '18',
			name: 'CC02 - Institut für Biochemie - CCM'
		},
		{
			id: '20',
			name: 'CC02 - Institut für Medizinische Physik und Biophysik - CCM'
		},
		{
			id: '51',
			name: 'CC09 - Klinik für Unfall- und Wiederherstellungschirurgie - CCM/CVK'
		},
		{
			id: '52',
			name: 'CC09 - Klinik für Unfall- und Wiederherstellungschirurgie - CBF'
		},
		{
			id: '84',
			name: 'CC15 - Klinik für Neurologie mit Experimenteller Neurologie - CBF/CCM/CVK'
		},
		{
			id: '128',
			name: 'CC12 - Arbeitsbereich Physikalische Medizin - CCM'
		},
		{
			id: '135',
			name: 'CC02 - Centrum für Anatomie - CCM'
		},
		{
			id: '150',
			name: 'ECRC - Experimental and Clinical Research Center - CBB'
		},
		{
			id: '163',
			name: 'PDLE - Prodekanat Lehre - CCM'
		},
		{
			id: '12',
			name: 'CC02 - Institut für Neurophysiologie - CCM'
		}
	]
}

export const einrichtungen: Map<string, EinrichtungModelType> = (() => {
	const einrichtungenMap = new Map<string, EinrichtungModelType>()
	const einrichtungenParameter = [
		['1', 'GB IT'],
		['7', 'CC01 - Institut für Gesundheits- und Pflegewissenschaft - CVK'],
		['10', 'CN06 - Institut für PHP-Medizin, klinische Chemie - CBF/CCM/CVK'],
		[
			'120',
			'CC05 - Institut für Laboratoriumsmedizin, klinische Chemie und Pathobiochemie - CBF/CCM/CVK'
		],
		['121', 'CC07 - Klinik für Anästhesiologie mit Schwerpunkt operative Intensivmedizin - CBF'],
		['39', 'CC06 - Institut für Radiologie (mit dem Bereich Kinderradiologie) - CBF/CCM/CVK'],
		['114', 'CC17 - Institut für Medizinische Genetik und Humangenetik - CVK'],
		['63', 'CC12 - Medizinische Klinik m.S. Infektiologie und Pneumologie - CCM/CVK/CBF'],
		['50', 'CC08 - Chirurgische Klinik - CCM/CVK']
	]

	einrichtungenParameter.forEach((p) =>
		einrichtungenMap.set(p[0], new EinrichtungModelType({ name: p[1] }))
	)
	json.einrichtungen.forEach((p) => einrichtungenMap.set(p.id, new EinrichtungModelType(p)))
	return einrichtungenMap
})()

const models = new Map<string, EinrichtungModel>()
einrichtungen.forEach((e, id) => models.set(id, new EinrichtungModel(e)))
export const einrichtungenModels = models
export const einrichtungenModel = new EinrichtungenModel(models)
