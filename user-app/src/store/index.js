import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedFoods: JSON.parse(sessionStorage.getItem('selection'))
  },
  mutations: {
    changeSelectedFoods(state, selection) {
      sessionStorage.setItem('selection', JSON.stringify(selection))
      state.selectedFoods = selection
    },
    deleteSelectedFoodByIndex(state, selection) {
      state.selectedFoods.splice(selection, 1)
      sessionStorage.setItem('selection', JSON.stringify(state.selectedFoods))
    }
  },
  getters: {
    totalNumber(state) {
      return state.selectedFoods.reduce((total, food) => total + food.step, 0);
    },
    totalPrice(state) {
      return state.selectedFoods.reduce((total, food) => total + food.step * food.price, 0);
    },
  },
  actions: {

  },
  modules: {
  }
})
