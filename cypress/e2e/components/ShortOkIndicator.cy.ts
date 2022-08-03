/// <reference types="cypress" />

context('ShortOkIndicator', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/Components/Indicators')
	})

	it('should showup and disappear', () => {
		cy.get('[data-cy="short-ok-indicator"]').should('exist')
		cy.wait(2001)
		cy.get('[data-cy="short-ok-indicator"]').should('not.exist')
	})
})
