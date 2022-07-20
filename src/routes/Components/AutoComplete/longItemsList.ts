const text = 'einfach nicht nika nerven'

export default text.split(' ').map((w) => {
	return { label: w }
})
