export default {
    namespaced: true,

    store() {
        return {
            helpers: {}
        }
    },

    getters: {
        helpers(state) {
            return state.helpers
        }
    },

    mutations: {
        SET_HELPERS(state, payload) {
            state.helpers = payload.data
        }
    },

    actions: {
        // async getAllHelpers({ dispatch }) {
        //     this.dispatch('helpers/languagies/getLanguagies', {root:true})
        //     this.dispatch('helpers/categories/getCategories', {root:true})
        //     this.dispatch('helpers/peopleCategory/getPeopleCategory', {root:true})
        //     this.dispatch('helpers/timing/getTiming', {root:true})
        //     this.dispatch('helpers/priceType/getPriceType', {root:true})
        //     this.dispatch('helpers/currencies/getCurrencies', {root:true})
        //     this.dispatch('helpers/services/getServices', {root:true})
        //     this.dispatch('helpers/contactType/getContactType', {root:true})
        // },

        async getHelpers({ commit }) {
            await this.$axios.get('helpers/all').then( res => {
                commit('SET_HELPERS', res.data)
            })
        }
    }
}