import { ModelsByIdStore } from '$lib/models/common/ModelsByIdStore'
import RaeumeModel from '$lib/models/RaeumeModel'
import RaumModel from '$lib/models/RaumModel'
import RaumModelType from '$lib/models/dataTypes/RaumModelType'

export const DUMMY_RAUM_ID = '3014'

const raeume = [
	{
		id: 1001,
		titel: 'Audimax (Hörsaal 1 + 2)',
		addresse: 'Lehrgebäude, Forum 3',
		zugang: 'wird von Hörsaalbetreuung geöffnet',
		kontakt: 'Veranstaltungsservice (450 573123)',
		link: 'http://www.charite.de/service/lageplan/plan/map/cvk_forum_3/'
	},
	{
		id: 2002,
		titel: 'Kopsch–Hörsaal (Wilhelm Waldeyer-Haus, Anatomie)',
		addresse: 'Philippstr. 11, 10115 Berlin',
		zugang: 'wird von Hörsaalbetreuung geöffnet',
		kontakt: 'Veranstaltungsservice (450 673088)',
		link: 'http://www.charite.de/service/lageplan/plan/map/ccm_wilhelm_waldeyer_haus/'
	},
	{
		id: DUMMY_RAUM_ID,
		titel: 'Untersuchungsraum T609+T609a Turnhalle (ggü. vom B',
		addresse: 'Hauptgebäude Ost, 2. Kellergeschoss',
		campus: 'CBF',
		zugang: 'Schlüsselabholung: Pforte Nordrampe',
		kontakt: 'Sicherheits- und Empfangsdienst (8445 2911)',
		link: 'https://www.charite.de/service/lageplan/plan/map/cbf_haus_v_eingang_nord_aufzug_21_22/'
	}
]

export default raeume

export const raeumeModel = ModelsByIdStore.fromJson(raeume, RaumModelType, RaumModel, RaeumeModel)
