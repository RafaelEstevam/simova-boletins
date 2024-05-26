import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      appointments: [
        {id: 1, color: '#fc0', code: "1", description: "Issue 10"},
        {id: 2, color: '#fc0', code: "1", description: "Issue 10"},
        {id: 3, color: '#fc0', code: "1", description: "Issue 10"},
      ],
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
    appointments: (state) => state.appointments
  }
})