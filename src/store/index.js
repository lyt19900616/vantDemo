import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedItem: 0
  },
  mutations: {
    changeTabbarItem (state, index) {
      state.selectedItem = index
    }
  },
  actions: {
  },
  modules: {
  }
})
