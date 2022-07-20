import { DUMMY_RAUM_ID } from './raeume'
import { TermineModel } from '$lib/models/TermineModel'
import modelsFromJson from '$lib/models/common/modelsFromJson'
import { TerminModelType } from '$lib/models/dataTypes/TerminModelType'
import { TerminModel } from '$lib/models/TerminModel'
import createStudienstruktur, {
	LehrformateModel,
	ModuleModel,
	StudiengaengeModel,
	SubmoduleModel,
	VeranstaltungenModel
} from '$lib/models/StudienstrukturModels'

import v from './studienstrukturJsons/veranstaltungen_in_submodul_1513703.json'
import s from './studienstrukturJsons/submodule.json'
import m from './studienstrukturJsons/module.json'
import st from './studienstrukturJsons/studiengaenge.json'
import l from './studienstrukturJsons/lehrformate.json'

const json = {
	// API responses from different calls
	studienstruktur: {
		studiengaenge: [st[0]],
		module: [m[0]],
		submodule: [s[0]],
		veranstaltungen: v,
		lehrformate: l
	},
	/* für gruppe 13a */
	termine: [
		{
			id: '20212-2322-3._FS_1a-30b-1',
			veranstaltungsId: '77600',
			raumId: null,
			start: '2021-11-15T08:15:00+01:00',
			ende: '2021-11-15T08:30:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|l0k0v77|https://teams.microsoft.com/l/team/19%3a0bacd2948de64fcca3b08156928ff8a6%40thread.tacv2/conversations?groupId=cc7ee9b8-c500-4aea-977c-83b48287a570&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '1a-30b',
			lehrTaetigkeiten: [{ id: '81251', personId: '8096', einrichtungsId: '163' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-544-3._FS_1a-30b-1',
			veranstaltungsId: '77602',
			raumId: null,
			start: '2021-11-15T08:30:00+01:00',
			ende: '2021-11-15T10:00:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|bmv9dfa|https://teams.microsoft.com/l/team/19%3aVCs5LT3h1moO1PxJKdKUkGN_YwD7fhgqtamodpfViL01%40thread.tacv2/conversations?groupId=82ea02c4-adfb-403b-ac88-7619e8762e94&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '1a-30b',
			lehrTaetigkeiten: [
				{ id: '90724', personId: '17', einrichtungsId: '128' },
				{ id: '589923', personId: '9', einrichtungsId: '15' }
			],
			lehrendesFehlt: false
		},
		{
			id: '20212-452-3._FS_1a-30b-1',
			veranstaltungsId: '77603',
			raumId: null,
			start: '2021-11-15T10:15:00+01:00',
			ende: '2021-11-15T11:45:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|bmv9dfa|https://teams.microsoft.com/l/team/19%3aVCs5LT3h1moO1PxJKdKUkGN_YwD7fhgqtamodpfViL01%40thread.tacv2/conversations?groupId=82ea02c4-adfb-403b-ac88-7619e8762e94&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '1a-30b',
			lehrTaetigkeiten: [
				{ id: '89111', personId: '3083', einrichtungsId: '51' },
				{ id: '589918', personId: '9', einrichtungsId: '15' },
				{ id: '658770', personId: '9666', einrichtungsId: '52' }
			],
			lehrendesFehlt: false
		},
		{
			id: '20212-494-3._FS_1a-30b-1',
			veranstaltungsId: '77604',
			raumId: null,
			start: '2021-11-16T08:00:00+01:00',
			ende: '2021-11-16T09:30:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|bmv9dfa|https://teams.microsoft.com/l/team/19%3aVCs5LT3h1moO1PxJKdKUkGN_YwD7fhgqtamodpfViL01%40thread.tacv2/conversations?groupId=82ea02c4-adfb-403b-ac88-7619e8762e94&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '1a-30b',
			lehrTaetigkeiten: [{ id: '89893', personId: '4578', einrichtungsId: '84' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-520-3._FS_11b-14b-1',
			veranstaltungsId: '77605',
			raumId: null,
			start: '2021-11-19T10:00:00+01:00',
			ende: '2021-11-19T11:30:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|5bojilr|https://teams.microsoft.com/l/team/19%3a3f0b499120ad42ac809a9dea8c194303%40thread.tacv2/conversations?groupId=132f1fb4-2ae1-4587-9d68-f3fef53d1749&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '11b-14b',
			lehrTaetigkeiten: [{ id: '90480', personId: '10368', einrichtungsId: '18' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-5781-3._FS_11b-14b-1',
			veranstaltungsId: '77606',
			raumId: null,
			start: '2021-11-19T14:30:00+01:00',
			ende: '2021-11-19T16:00:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|5bojilr|https://teams.microsoft.com/l/team/19%3a3f0b499120ad42ac809a9dea8c194303%40thread.tacv2/conversations?groupId=132f1fb4-2ae1-4587-9d68-f3fef53d1749&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '11b-14b',
			lehrTaetigkeiten: [{ id: '90826', personId: '6001', einrichtungsId: '15' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-580-3._FS_11b-14b-1',
			veranstaltungsId: '77607',
			raumId: null,
			start: '2021-11-19T16:15:00+01:00',
			ende: '2021-11-19T17:45:00+01:00',
			campus: 'eLive',
			treffpunkt:
				'|5bojilr|https://teams.microsoft.com/l/team/19%3a3f0b499120ad42ac809a9dea8c194303%40thread.tacv2/conversations?groupId=132f1fb4-2ae1-4587-9d68-f3fef53d1749&tenantId=afe91939-923e-432c-bc66-cbc3ec18d02c|',
			gruppenbezeichnung: '11b-14b',
			lehrTaetigkeiten: [{ id: '90909', personId: '44', einrichtungsId: '20' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-613A-3._FS_13a-15b-1',
			veranstaltungsId: '77608',
			raumId: 2002,
			start: '2021-11-17T08:15:00+01:00',
			ende: '2021-11-17T09:45:00+01:00',
			campus: 'CCM',
			treffpunkt: 'Müller-Saal (Wilhelm Waldeyer-Haus, Anatomie), Philippstr. 11, 10115 Berlin',
			gruppenbezeichnung: '13a-15b',
			lehrTaetigkeiten: [{ id: '91644', personId: '711', einrichtungsId: '15' }],
			lehrendesFehlt: false
		},
		{
			id: '20212-2314-3._FS_13a-13b-1',
			veranstaltungsId: '74476',
			raumId: DUMMY_RAUM_ID,
			start: '2021-11-16T16:00:00+01:00',
			ende: '2021-11-16T18:00:00+01:00',
			campus: 'CBF',
			treffpunkt: '',
			gruppenbezeichnung: '13a-13b',
			lehrTaetigkeiten: [],
			lehrendesFehlt: true
		}
	]
}

export function createModelsfuerEineModulwoche(): {
	studiengaengeModel: StudiengaengeModel
	moduleModel: ModuleModel
	submoduleModel: SubmoduleModel
	veranstaltungenModel: VeranstaltungenModel
	lehrformateModel: LehrformateModel
	termineModel: TermineModel
} {
	const termineModel = new TermineModel(modelsFromJson(json.termine, TerminModelType, TerminModel))
	const {
		studiengaengeModel,
		moduleModel,
		submoduleModel,
		veranstaltungenModel,
		lehrformateModel
	} = createStudienstruktur(termineModel, json.studienstruktur)
	return {
		studiengaengeModel,
		moduleModel,
		submoduleModel,
		veranstaltungenModel,
		lehrformateModel,
		termineModel
	}
}
