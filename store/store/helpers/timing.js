export default {
    namespaced: true,

    state() {
        return {
            timing: {}
        }
    },

    getters: {
        timing (state) {
            return state.timing
        }
    },

    mutations: {
        SET_TIMING (state, payload) {
            state.timing = payload
        }
    },

    actions: {
        async getTiming ({ commit }) {
            await this.$axios('/helpers/timing').then(res => {
                commit('SET_TIMING', res.data.data)
            })
        }
    }

}