export default {
  async fetchProfiles({ commit }) {
    const profiles = await this.$http.$get(`https://907db0ad-00ff-4b7a-821e-900acd481c2e.mock.pstmn.io/profiles`);
    commit('SET_PROFILES', profiles);
  },
  updateSearchParam({ commit}, q) {
    commit('SET_SEARCH_PARAM', q);
  },
  updateSelected({commit}, email) {
    commit('UPDATE_SELECTED', email)
  }

}