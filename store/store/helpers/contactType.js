export default {
    namespaced: true,

    state() {
        return {
            contactType: {}
        }
    },

    getters: {
        contactType(state) {
            return state.contactType
        }
    },

    mutations: {
        SET_CONTACTTYPE(state, payload) {
            state.contactType = payload.data
        }
    },

    actions: {
        async getContactType({commit}) {
            await this.$axios.get('helpers/contact_type').then(res => {
                commit('SET_CONTACTTYPE', res.data)
            })
        }
    }
}