// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// every new command has to have a JSDocs annotation, in order for the IDE to recognize the newly
// added command on the cy object.

/**
 * @memberof cy
 * @method getBySel
 * @param {string} selector
 * @returns Chainable
 */
Cypress.Commands.add('getBySel', (selector) => {
	return cy.get(`[data-cy=${selector}]`)
})
