import { mount } from '@cypress/vue'
import ProfileCard from './profile/ProfileCard.vue'

import { profiles } from '../test_data'

describe('ProfileCard', () => {

    const profile = profiles()[0]

    const skipSelection = 'SKIP SELECTION'
    const suitable = 'MARK AS SUITABLE'
    const profileSelected = 'profile-card--selected'
    const switchStatus = '.profile-card__action span'

    it('renders the profile card with random data', () => {

        const searchParams = [...(Object.values(profile).slice(0, 5)), '']
        mount(ProfileCard, {
            propsData: {
                profile: profile,
                searchParam: searchParams[Math.floor(Math.random() * searchParams.length)],
                selected: Math.random() < 0.5
            }
        })

        cy.contains('h2', profile.name).should('be.visible')
        cy.contains('.profile-card__owner span', profile.email).should('be.visible')
        cy.contains('.profile-card__title', profile.title).should('be.visible')
        cy.contains('.profile-card__address', `${profile.address}, ${profile.city}`).should('be.visible')
        cy.get('img').should('have.attr', 'src').and('include', profile.avatar)
    })

    it('emits an update-status when status update action is clicked on', () => {
        mount(ProfileCard, {
            propsData: {
                profile: profile,
                selected: Math.random() < 0.5
            }
        })

        cy.get(switchStatus).click()
            .vue()
            .then((wrapper) => {
                expect(wrapper.emitted('update-status')).to.have.length(1)
            })
    })

    it('has highlight class when a search param matches with any of the possible data', () => {
        const searchParams = Object.values(profile).slice(0, 5)
        const searchParam = searchParams[Math.floor(Math.random() * searchParams.length)]
        mount(ProfileCard, {
            propsData: {
                profile: profile,
                selected: Math.random() < 0.5,
                searchParam: searchParam
            }
        })

        cy.contains('.highlight', searchParam).should('be.visible')
    })

    it('it adds profile-card--selected class to card body and changes action text', () => {
        mount(ProfileCard, {
            propsData: {
                profile: profile,
                selected: false
            }
        })

        cy.get('.profile-card').should('not.have.class', profileSelected)
        cy.contains(switchStatus, suitable).should('be.visible')

        cy.get(switchStatus)
            .click()
            .vue()
            .then((wrapper) => {
                wrapper.setProps({ selected: true })
            })
        cy.get('.profile-card').should('have.class', profileSelected)
        cy.contains(switchStatus, skipSelection).should('be.visible')
    })

    it('it removes profile-card--selected class to card body and changes action text', () => {
        mount(ProfileCard, {
            propsData: {
                profile: profile,
                selected: true
            }
        })

        cy.get('.profile-card').should('have.class', profileSelected)
        cy.contains(switchStatus, skipSelection).should('be.visible')

        cy.get(switchStatus)
            .click()
            .vue()
            .then((wrapper) => {
                wrapper.setProps({ selected: false })
            })
        cy.get('.profile-card').should('not.have.class', profileSelected)
        cy.contains(switchStatus, suitable).should('be.visible')
    })
})