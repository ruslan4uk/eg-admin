export default {
    namespaced: true,

    state() {
        return {
            languagies: {}
        }
    },

    getters: {
        languagies(state) {
            return state.languagies
        }
    },

    mutations: {
        SET_LANGUAGIES(state, payload) {
            state.languagies = payload.data
        }
    },

    actions: {
        async getLanguagies({commit}) {
            await this.$axios.get('helpers/languagies').then(res => {
                commit('SET_LANGUAGIES', res.data)
            })
        }
    }
}