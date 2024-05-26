import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      appointments: [],
      bulletins: [],
      employees: [],
      employee: {}
    }
  },

  mutations: {
    setAppointments(state, payload) {
      state.appointments = payload;
    }
  },

  actions: {
    handleFilterAppointments({ commit }, appointments) {
      commit('setAppointments', appointments);
    }
  },

  getters: {
    getAppointments: (state) => {
      return state.appointments
    }
  }
})