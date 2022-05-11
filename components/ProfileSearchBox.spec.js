import { mount } from '@cypress/vue'
import ProfileSearchBox from './profile/ProfileSearchBox.vue'

import { faker } from '@faker-js/faker'

describe('ProfileSearchBox', () => {

    beforeEach(() => {
        mount(ProfileSearchBox)
    })

    it('renders the search box', () => {
        cy.get('input').should('be.visible')
    })

    it('emits an update event button, when it gets new text input', () => {
        const name = faker.name.firstName()
        cy.get('input')
            .type(name)
            .vue()
            .then((wrapper) => {
                expect(wrapper.emitted('update')).to.have.length(name.length)
            })
    })

})