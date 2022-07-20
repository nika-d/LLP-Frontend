/// <reference types="cypress" />

context('Lehrenden Eintragung', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/LehrendenEintragung')
	})

	it('filter bar should be closed', () => {
		cy.getBySel('filter-container').should('not.exist')
	})

	it('filter bar opens and closes again when pressing filter toggle button twice', () => {
		cy.getBySel('filter-container-toggle').click()
		cy.getBySel('filter-container').should('exist')
		cy.wait(1000)
		cy.getBySel('filter-container-toggle').click()
		cy.getBySel('filter-container').should('have.css', 'display').and('eql', 'none')
	})
})
