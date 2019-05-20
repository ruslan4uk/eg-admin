export default {
    namespaced: true,

    state() {
        return {
            price_type: {}
        }
    },

    getters: {
        price_type(state) {
            return state.price_type
        }
    },

    mutations: {
        SET_PRICETYPE(state, payload) {
            state.price_type = payload.data
        }
    },

    actions: {
        async getPriceType({commit}) {
            await this.$axios.get('helpers/price_type').then(res => {
                commit('SET_PRICETYPE', res.data)
            })
        }
    }
}