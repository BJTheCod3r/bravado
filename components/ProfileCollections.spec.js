import { mount } from '@cypress/vue'
import ProfileCollections from './profile/ProfileCollections.vue'
import ProfileSearchBox from './profile/ProfileSearchBox.vue'
import ProfileCard from './profile/ProfileCard.vue'

import { profiles, randomText } from '../test_data'


describe('ProfileCollections', () => {

    const randomProfiles = profiles(Math.floor(Math.random() * 10))
    const selectedProfiles = ((randomProfiles.map(profile => profile.email)).sort(() => 0.5 - Math.random())).slice(0, Math.floor(Math.random() * randomProfiles.length))

    it('renders the profile collections with random data', () => {
        mount(ProfileCollections, {
            components: {
                ProfileSearchBox: ProfileSearchBox,
                ProfileCard: ProfileCard
            },
            mocks: {
                $store: {
                    state: {
                        profiles: {
                            searchParam: randomText(Math.floor(Math.random() * 5)),
                            profiles: randomProfiles,
                            selected: selectedProfiles
                        }
                    }
                }
            }
        })

        cy.get('input').should('be.visible')

    })

    //here we can test methods, test computed values after a change etc
})