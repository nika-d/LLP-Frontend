export function verkuerze(name: string) {
	let verkuerzt

	verkuerzt = String(name).replaceAll(' - ', ', ')

	verkuerzt = verkuerzt.replace('Medizinische Klinik für', 'Med.K.f.')

	verkuerzt = verkuerzt.replace('Medizinische Klinik mit Schwerpunkt', 'Med.K.m.S.')

	verkuerzt = verkuerzt.replace('Institut für', 'I.f.')

	verkuerzt = verkuerzt.replace('Klinik für', 'K.f.')

	verkuerzt = verkuerzt.replace('Arbeitsbereich', 'Arb.')

	verkuerzt = verkuerzt.replace('Abteilung für', 'Abt.f.')

	verkuerzt = verkuerzt.replace('mit Schwerpunkt ', 'm.S.')
	verkuerzt = verkuerzt.replace('für ', 'f.')
	verkuerzt = verkuerzt.replace('mit ', 'm.')
	verkuerzt = verkuerzt.replace('Klinik ', 'K.')
	verkuerzt = verkuerzt.replace('dem ', 'd.')
	verkuerzt = verkuerzt.replace('Bereich ', 'B. ')

	verkuerzt = verkuerzt.replace('Medizinische', 'Med.')
	verkuerzt = verkuerzt.replace('Medizinischen', 'Med.')
	verkuerzt = verkuerzt.replace('Medizinisches', 'Med.')
	verkuerzt = verkuerzt.replace('medizinische', 'med.')
	verkuerzt = verkuerzt.replace('medizinischen', 'med.')
	verkuerzt = verkuerzt.replace('medizinisches', 'med.')

	return verkuerzt
}
