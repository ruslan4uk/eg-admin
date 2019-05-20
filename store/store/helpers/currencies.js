export default {
    namespaced: true,

    state() {
        return {
            currencies: {}
        }
    },

    getters: {
        currencies(state) {
            return state.currencies
        }
    },

    mutations: {
        SET_CURRENCIES(state, payload) {
            state.currencies = payload.data
        }
    },

    actions: {
        async getCurrencies({commit}) {
            await this.$axios.get('helpers/currencies').then(res => {
                commit('SET_CURRENCIES', res.data)
            })
        }
    }
}