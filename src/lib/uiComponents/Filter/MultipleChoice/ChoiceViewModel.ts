export class ChoiceViewModel {
	private readonly key: string
	public readonly equivalentChoices = []

	constructor(firstChoice: unknown) {
		this.key = firstChoice.toString()
		this.equivalentChoices.push(firstChoice)
	}

	public toString(): string {
		return this.key
	}
}
