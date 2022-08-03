import fakePersonen from '../../src/lib/test/models/testData/fakePersonen1.json'

export default {
	TERMIN_A_LEHRTAETIGKEIT_FULL_NAME: fakePersonen[1].nachname + ', ' + fakePersonen[1].vorname,
	TERMIN_A_LEHRTAETIGKEIT_EMAIL: fakePersonen[1].email,
	TERMIN_A_FILTER_LEHRTAETIGKEIT_FULL_NAME:
		fakePersonen[2].nachname + ', ' + fakePersonen[2].vorname,
	TERMIN_A_FILTER_LEHRTAETIGKEIT_EMAIL: fakePersonen[2].email
}
