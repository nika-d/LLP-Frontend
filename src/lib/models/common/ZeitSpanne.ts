export default class ZeitSpanne {
	static FORMATTER = new Intl.DateTimeFormat('de-DE', {
		weekday: 'short',
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
	static UHRZEIT_FORMATTER = new Intl.DateTimeFormat('de-DE', {
		hour: '2-digit',
		minute: '2-digit'
	})

	#start = new Date()
	#end = new Date()

	constructor(startZeit, endZeit) {
		this.#start = new Date(startZeit)
		this.#end = new Date(endZeit)
		this.#start.toString = () => ZeitSpanne.FORMATTER.format(this.#start)
		this.#end.toString = () => ZeitSpanne.UHRZEIT_FORMATTER.format(this.#end)
	}

	tagIst(date) {
		return (
			this.#start.getFullYear() === date.getFullYear() &&
			this.#start.getMonth() === date.getMonth() &&
			this.#start.getDay() === date.getDay()
		)
	}

	static welcheStartetZuerst(zeitSpanne1, zeitSpanne2) {
		return zeitSpanne1.#start < zeitSpanne2.#start
			? zeitSpanne1
			: zeitSpanne1.#start > zeitSpanne2.#start
			? zeitSpanne2
			: undefined
	}

	liegtZwischen(date1, date2) {
		return date1 < this.#start && this.#start < date2
	}

	toString() {
		return this.#start.toString() + ' bis ' + this.#end.toString()
	}
}
