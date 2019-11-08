export const state = () => ({
  menu: []
})

export const actions = {
  async nuxtServerInit({ commit }) {
    const post = await import(`~/content/menu.md`)
    commit('setMenu', post.attributes.menu)
  }
}

export const getters = {
  menu(state) {
    return state.menu
  }
}

export const mutations = {
  setMenu(state, menu) {
    state.menu = menu
  }
}
