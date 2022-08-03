/// <reference types="cypress" />

import texts from '../../../src/lib/uiTexts/lehrendenEintragung.json'
import filterTexts from '../../../src/lib/uiTexts/filter.json'
import tags from '../../support/data-cy'
import assertionConstantsE2E from '../../support/assertionConstantsE2E'

context('Lehrenden Eintragung', () => {
	describe('Filter Section', () => {
		before(() => {
			cy.visit('http://localhost:3000/LehrendenEintragung')
		})

		it('filte bar should be closed', () => {
			cy.getBySel(tags.FILTER_CONTAINER).should('not.be.visible')
		})

		it('filter bar opens and closes again when pressing filter toggle button twice', () => {
			cy.getBySel(tags.FILTER_CONTAINER_TOGGLE).click()
			cy.getBySel(tags.FILTER_CONTAINER).should('be.visible')
			cy.wait(1000)
			cy.getBySel(tags.FILTER_CONTAINER_TOGGLE).click()
			cy.getBySel(tags.FILTER_CONTAINER).should('not.be.visible')
		})

		it('filter should be reflected in table rows', () => {
			cy.getBySel(tags.FILTER_CONTAINER_TOGGLE).click()
			cy.getBySel(tags.FILTER_CONTAINER).should('be.visible')
			cy.contains(texts.LEHRFORMAT).click()
			cy.getBySel(tags.MULTIPLE_CHOICE_FILTER_OPTION)
				.filter(':visible')
				.first()
				.should('contain', 'POL')
				.click()
			cy.getBySel(tags.TABLE_ROW).should('have.length', 4)
		})
	})

	describe('Multi Paste', () => {
		before(() => {
			cy.visit('http://localhost:3000/LehrendenEintragung')
		})

		it('Should open when clicked on existing lehrenden', () => {
			cy.contains(assertionConstantsE2E.TERMIN_A_LEHRTAETIGKEIT_FULL_NAME).first().click()
			cy.getBySel(tags.MULTI_PASTE_INSERT_BUTTON).should('exist')
		})

		it('Should change the button to save button when clicked', () => {
			cy.getBySel(tags.MULTI_PASTE_INSERT_BUTTON).click()
			cy.getBySel(tags.MULTI_PASTE_SAVE_BUTTON).should('be.visible')
		})

		it('Should hide button when clicking on name again, and clear all prefilled quick paste entries', () => {
			cy.contains(assertionConstantsE2E.TERMIN_A_LEHRTAETIGKEIT_FULL_NAME).first().click()
			cy.getBySel(tags.MULTI_PASTE_INSERT_BUTTON).should('not.exist')
			cy.getBySel(tags.MULTI_PASTE_SAVE_BUTTON).should('not.exist')
			cy.contains(assertionConstantsE2E.TERMIN_A_LEHRTAETIGKEIT_EMAIL).should('not.be.visible')
		})

		it('Should insert only into visible (per filter selected) rows', () => {
			//add filter
			cy.getBySel(tags.FILTER_CONTAINER_TOGGLE).click()
			cy.contains(texts.LEHRFORMAT).click()
			cy.getBySel(tags.MULTIPLE_CHOICE_FILTER_OPTION)
				.filter(':visible')
				.first()
				.should('contain', 'POL')
				.click()
			cy.getBySel(tags.TABLE_ROW).should('have.length', 4)

			//
			cy.contains(assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_FULL_NAME).click()
			cy.getBySel(tags.MULTI_PASTE_INSERT_BUTTON).should('be.visible').click()
			cy.get('.lehrendenSelectInput').should(
				'contain.text',
				assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_EMAIL
			)

			//The one that triggered the multi paste should not contain the lehrtaetigkeit a second time
			cy.contains(assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_FULL_NAME)
				.parent()
				.should('not.contain.text', assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_EMAIL)
		})

		it('Should save for selected rows', () => {
			cy.getBySel(tags.MULTI_PASTE_SAVE_BUTTON).click()

			cy.getBySel(tags.LEHRENDE_NAME_ANZEIGE)
				.filter(`:contains(${assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_FULL_NAME})`)
				.its('length')
				.should('eq', 4)

			// remove filter
			cy.contains(texts.LEHRFORMAT).click()
			cy.getBySel(tags.MULTIPLE_CHOICE_FILTER_OPTION)
				.filter(':visible')
				.first()
				.should('contain', 'POL')
				.click()
			cy.getBySel(tags.TABLE_ROW).should('have.length', 12)

			//still only 4 rows filled with name
			cy.getBySel(tags.LEHRENDE_NAME_ANZEIGE)
				.filter(`:contains(${assertionConstantsE2E.TERMIN_A_FILTER_LEHRTAETIGKEIT_FULL_NAME})`)
				.its('length')
				.should('eq', 4)
		})
	})

	describe('Delete LehrendenEintragung', () => {
		before(() => {
			cy.visit('http://localhost:3000/LehrendenEintragung')
		})

		it('Should be visible to the user', () => {
			cy.getBySel(tags.DELETE_BUTTON).should('be.visible')
		})

		it('Should remove lehrtaetigkeit on click', () => {
			const firstEntry = cy.contains(assertionConstantsE2E.TERMIN_A_LEHRTAETIGKEIT_FULL_NAME)
			cy.getBySel(tags.DELETE_BUTTON).first().click()
			firstEntry.should('not.exist')
		})
	})

	describe('Zeitspannen-Filter', () => {
		before(() => {
			cy.visit('http://localhost:3000/LehrendenEintragung')
		})

		it('Should be visible to the user', () => {
			cy.getBySel(tags.FILTER_CONTAINER_TOGGLE).click()
			cy.contains(filterTexts.ZEITSPANNE).should('be.visible')
		})

		it('Should have start empty start date', () => {
			cy.get('input[name="startdate"]').should('have.value', '')
		})

		it('Should have start empty end date', () => {
			cy.get('input[name="enddate"]').should('have.value', '')
		})

		it('Should display all rows when dates are empty', () => {
			cy.get('input[name="startdate"]').should('have.value', '')
			cy.getBySel(tags.TABLE_ROW).should('have.length', 12)
		})

		it('Should filter rows when start date is updated', () => {
			cy.contains(filterTexts.ZEITSPANNE).click()
			cy.get('input[name="startdate"]').type('2022-01-01')
			cy.getBySel(tags.TABLE_ROW).should('have.length', 6)
		})

		it('Should filter rows when end date is updated', () => {
			cy.get('input[name="enddate"]').type('2022-01-01')
			cy.getBySel(tags.TABLE_ROW).should('have.length', 0)
		})

		it('Should display all rows again when dates get reset', () => {
			cy.get('input[name="startdate"]').clear()
			cy.get('input[name="enddate"]').clear()
			cy.getBySel(tags.TABLE_ROW).should('have.length', 12)
		})

		it('Should display badge "0" when no date is set ', () => {
			cy.contains(filterTexts.ZEITSPANNE).within(() => {
				cy.getBySel('badge').should('have.text', '0')
			})
		})

		it('Should display badge "1" when one date is set ', () => {
			cy.get('input[name="enddate"]').type('2022-01-01')
			cy.contains(filterTexts.ZEITSPANNE).within(() => {
				cy.getBySel('badge').should('have.text', '1')
			})
		})

		it('Should display badge "2" when two dates are set ', () => {
			cy.get('input[name="startdate"]').type('2022-01-01')
			cy.contains(filterTexts.ZEITSPANNE).within(() => {
				cy.getBySel('badge').should('have.text', '2')
			})
		})
	})
})
