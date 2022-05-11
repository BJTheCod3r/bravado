import { baseURL, randomText } from '../../test_data'

describe('User Interaction', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })

    const skipSelection = 'SKIP SELECTION'
    const suitableProfile = 'MARK AS SUITABLE'
    const searchText = randomText(2)

    it('I can filter content', () => {
        cy.get('input').type(searchText)
        cy.url().should('equal', `${baseURL}/search/${searchText}`)
        cy.contains(searchText)
    })

    it('I can make a selection and undo the selection', () => {
        cy.get('.profile-card__action span').first().click()
        cy.contains(skipSelection)
        cy.get('.profile-card__action span').first().should('have.text', skipSelection).click()

        cy.contains(suitableProfile)
    })

    it('search page is stateful and goes back to the default page', () => {
        cy.visit(`${baseURL}/search/${searchText}`)

        cy.contains(searchText)

        cy.get('input').clear()

        cy.url().should('equal', baseURL+'/')
    })
})