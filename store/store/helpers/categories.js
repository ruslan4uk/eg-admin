export default {
    namecpaced: true,
    
    state() {
        return {
            categories: {}
        }
    },

    getters: {
        categories(state) {
            return state.categories
        }
    },

    mutations: {
        SET_CATEGORIES (state, payload) {
            state.categories = payload
        }
    },

    actions: {
        async getCategories ({ commit }) {
            await this.$axios.get('/helpers/categories').then(res => {
                commit('SET_CATEGORIES', res.data.data)
            })
        }
    }
}