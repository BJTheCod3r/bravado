export default {
    SET_PROFILES(state, profiles) {
      state.profiles = profiles
    },
    SET_SEARCH_PARAM(state, q) {
      state.searchParam = q
    },
    UPDATE_SELECTED(state, email) {
      if (!state.selected.includes(email)) {
        state.selected.push(email)
      }
      else {
        state.selected.splice(state.selected.indexOf(email), 1)
      }
    }
  }
  