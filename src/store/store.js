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
    },
    setBulletins(state, payload){
      state.bulletins = payload
    },
    setEmployee(state, payload){
      state.employee = payload
    },
    setEmployees(state, payload){
      state.employees = payload
    }
  },

  actions: {
    handleFilterAppointments({ commit }, appointments) {
      commit('setAppointments', appointments);
    },
    handleFilterBulletins({ commit }, bulletins) {
      commit('setBulletins', bulletins);
    },
    handleSetEmployee({commit}, employee){
      commit('setEmployee', employee);
    },
    handleFilterEmployees({commit}, employees){
      commit('setEmployees', employees);
    }
  },

  getters: {
    getAppointments: (state) => {
      return state.appointments
    },
    getBulletins: (state) => {
      return state.bulletins
    },
    getEmployee: (state) => {
      return state.employee
    },
    getEmployees: (state) => {
      return state.employees
    }
  }
})