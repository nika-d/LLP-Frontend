export class Route {
	public readonly path: string
	public readonly displayName: string

	constructor(path, displayName) {
		this.path = path
		this.displayName = displayName
	}
}

export class Chapter {
	public readonly ownRoute: Route
	public readonly containedRoutes: Route[]

	constructor(ownRoute: Route, containedRoutes: Route[]) {
		this.ownRoute = ownRoute
		this.containedRoutes = containedRoutes
	}
}

export class MenuContent {
	public readonly chapters: Chapter[]

	constructor(chapters: Chapter[]) {
		this.chapters = chapters
	}
}
