import { faker } from '@faker-js/faker'

export const profiles = (count = 1) => {
    const profiles = []
    for (let i = 0; i < count; i++) {
        profiles.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            title: faker.company.catchPhraseNoun(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            avatar: faker.image.avatar()
        })
    }

    return profiles
}

export const randomText = (count = 1) => {
    return faker.random.alphaNumeric(count)
}

export const baseURL = 'http://localhost:3000'