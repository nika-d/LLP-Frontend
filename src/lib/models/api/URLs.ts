// Wenn es in Apache läuft
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiRoot = 'http://localhost/api/'
// Wenn Backend mit /bin/symfony serve gestartet wird
// http://localhost:8000/api
//https://lernziele.charite.de/api...
//https://lernziele-testumgebung.charite.de/api...
//https://lernziele-testumgebung.charite.de/zend/sym/bridge/to/api/

export enum URLs {
	studienstrukturByZeitsemester = 'https://lernziele.charite.de/api/studienstruktur/zeitsemester',
	lehrtaetigkeit = 'https://lernziele.charite.de/api/lehrtaetigkeit '
}
