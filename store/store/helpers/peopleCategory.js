export default {
    namespaced: true,

    state() {
        return {
            people_category: {}
        }
    },

    getters: {
        people_category(state) {
            return state.people_category
        }
    },

    mutations: {
        SET_PEOPLE_CATEGORY (state, payload) {
            state.people_category = payload
        }
    },

    actions: {
        async getPeopleCategory ({ commit }) {
            await this.$axios.get('/helpers/people_category').then(res => {
                commit('SET_PEOPLE_CATEGORY', res.data.data)
            })
        }
    }
}