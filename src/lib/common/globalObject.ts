// eslint-disable-next-line no-var
declare var global

export const globalObject = typeof window === 'undefined' ? global : window
