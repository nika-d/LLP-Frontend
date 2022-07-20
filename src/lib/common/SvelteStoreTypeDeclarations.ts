/** Callback to inform of a value updates. */
import type { Readable } from 'svelte/store'

export declare type Subscriber<T> = (value: T) => void
/** Unsubscribes from value updates. */
export declare type Unsubscriber = () => void
/** Cleanup logic callback. */
export declare type Invalidator<T> = (value?: T) => void
/** Callback to update a value. */
export declare type Updater<T> = (value: T) => T

export declare type Stores = Readable<unknown> | [Readable<unknown>, ...Array<Readable<unknown>>]
