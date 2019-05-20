export default {
    namespaced: true,

    state() {
        return {
            services: {}
        }
    },

    getters: {
        services(state) {
            return state.services
        }
    },

    mutations: {
        SET_SERVICES(state, payload) {
            state.services = payload.data
        }
    },

    actions: {
        async getServices({commit}) {
            await this.$axios.get('helpers/services').then(res => {
                commit('SET_SERVICES', res.data)
            })
        }
    }
}