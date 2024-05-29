import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      appointments: [],
      bulletins: [],
      consolidatedBulletins: [],
      employees: [],
      employee: {},
      showLoading: false,
      showMenu: false,
    }
  },

  mutations: {
    setAppointments(state, payload) {
      state.appointments = payload;
    },
    setBulletins(state, payload){
      state.bulletins = payload
    },
    setConsolidatedBulletins(state, payload){
      state.consolidatedBulletins = payload
    },
    setEmployee(state, payload){
      state.employee = payload
    },
    setEmployees(state, payload){
      state.employees = payload
    },
    setShowLoading(state, show) {
      state.showLoading = show;
    },
    setShowMenu(state, show) {
      state.showMenu = show;
    },
  },

  actions: {
    handleFilterAppointments({ commit }, appointments) {
      commit('setAppointments', appointments);
    },
    handleFilterBulletins({ commit }, bulletins) {
      commit('setBulletins', bulletins);
    },
    handleSetConsolidatedBulletins({ commit }, consolidatedBulletins) {
      commit('setConsolidatedBulletins', consolidatedBulletins);
    },
    handleSetEmployee({commit}, employee){
      commit('setEmployee', employee);
    },
    handleFilterEmployees({commit}, employees){
      commit('setEmployees', employees);
    },
    handleShowLoading({ commit }, showLoading){
      commit('setShowLoading', showLoading);
    },
    handleShowMenu({ commit }, showMenu){
      commit('setShowMenu', showMenu);
    },
  },

  getters: {
    getAppointments: (state) => {
      return state.appointments
    },
    getBulletins: (state) => {
      return state.bulletins
    },
    getConsolidatedBulletins: (state) => {
      return state.consolidatedBulletins
    },
    getEmployee: (state) => {
      return state.employee
    },
    getEmployees: (state) => {
      return state.employees
    }
  }
})