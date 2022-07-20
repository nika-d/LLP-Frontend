import type AutoCompleteItemEinrichtungType from './AutoCompleteItemEinrichtungType'

export class LehrTaetigkeitType {
	public readonly lehrendeName: string
	public readonly einrichtung: AutoCompleteItemEinrichtungType
	public readonly kriteriumVerletzt: boolean
	public readonly einrichtungAutocompleteCandidates: AutoCompleteItemEinrichtungType[]

	constructor(
		lehrendeName: string,
		einrichtung: AutoCompleteItemEinrichtungType,
		kriteriumVerletzt: boolean,
		einrichtungAutocompleteCandidates: AutoCompleteItemEinrichtungType[]
	) {
		this.lehrendeName = lehrendeName
		this.einrichtung = einrichtung
		this.kriteriumVerletzt = kriteriumVerletzt
		this.einrichtungAutocompleteCandidates = einrichtungAutocompleteCandidates
	}

	public toString(): string {
		return this.lehrendeName + ', ' + this.einrichtung.label
	}
}
