import { ChoiceViewModel } from './ChoiceViewModel'

export default function (possibleChoices: Array<unknown>): { [key: string]: ChoiceViewModel } {
	const choiceViewModels: { [key: string]: ChoiceViewModel } = {}

	possibleChoices.forEach((choice) => {
		if (choiceViewModels[choice.toString()]) {
			choiceViewModels[choice.toString()].equivalentChoices.push(choice)
		} else {
			choiceViewModels[choice.toString()] = new ChoiceViewModel(choice)
		}
	})
	return choiceViewModels
}
