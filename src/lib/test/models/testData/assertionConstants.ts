import v from './studienstrukturJsons/veranstaltungen_in_submodul_1513703.json'
import l from './studienstrukturJsons/lehrformate.json'
import s from './studienstrukturJsons/submodule.json'
import m from './studienstrukturJsons/module.json'
import st from './studienstrukturJsons/studiengaenge.json'
import { einrichtungen } from './einrichtungen'
import personenJsons from './fakePersonen1.json'
import { fakePersonen2 as personenMap } from './fakePersonen2'

const personenIds = Array.from(personenMap.keys())
const personen = Array.from(personenMap.values())

export default {
	STUDIENGANG_A_ID: st[0].id, // 6
	STUDIENGANG_A_CODE: st[0].code, // MSM2

	MODUL_A_ID: m[0].id, // 15137
	MODUL_A_TITEL: m[0].titel, // Bewegung

	SUBMODUL_A_ID: s[0].id, // 1513703

	VERANSTALTUNG_A_ID: v[4].id, // 77603
	VERANSTALTUNG_A_KURZ_TITEL: v[4].kurzTitel, // Vorlesung

	VERANSTALTUNG_B_ID: v[0].id, // 74476
	VERANSTALTUNG_B_LEHRFORMAT_NAME: l[3].bezeichnungLang, // Untersuchungskurs

	LEHRFORMAT_A_BEZEICHNUNG_LANG: l[11].bezeichnungLang, // Integriertes interdisziplinäres Seminar
	LEHRFORMAT_B_BEZEICHNUNG_LANG: l[10].bezeichnungLang, // POL

	EINRICHTUNGEN_ANZAHL: einrichtungen.size,

	PERSON_A_GUID: personenJsons[0].id, // 3RICDyet5hAwiobV92pylr2f8Sc=
	PERSON_A_NACHNAME: personenJsons[0].nachname, // Hermann
	PERSON_A_EMAIL: personenJsons[0].email, // paul.hermann@charite.de
	PERSON_B_GUID: personenIds[0], // /K4Ysl4S4U9x4N7g+D/Vuw293iw=
	PERSON_B_NACHNAME: personen[0].nachname, // Mustermann
	PERSON_C_GUID: personenIds[2], // 00J2lj6tJ8APwu6cztcUq5hiPcg=
	PERSON_D_VORNAME: personen[1].vorname, // Hansi
	PERSON_E_VOLLER_NAME: personen[6].nachname + ', ' + personen[6].vorname, // Lagewiese, Mark
	PERSON_F_VOLLER_NAME: personen[3].nachname + ', ' + personen[3].vorname, // Wilke, John P.
	PERSON_F_EINRICHTUNGS_IDS: personen[3].einrichtungsIds // ['12', '15']
}
