export default {
    async nuxtServerInit({ dispatch }) {
        await dispatch("profiles/fetchProfiles")
    }
}