export default {
    namespaced: true,

    state() {
        return {
            // tour: {},
            tours: {}
        }
    },

    getters: {
        // tour(state) {
        //     return state.tour
        // },

        tours(state) {
            return state.tours
        }
    },

    mutations: {
        // SET_TOUR (state, payload) {
        //     state.tour = payload 
        //     // console.log(state.tour);
        // },

        SET_TOURS (state, payload) {
            state.tours = payload 
        }
    },

    actions: {
        // async getTour({commit}, payload) {
        //     await this.$axios.get('profile/tour/' + payload).then(res => {
        //         commit('SET_TOUR', res.data)
        //     })
        // },

        async getTours({commit}) {
            await this.$axios.get('profile/tour').then(res => {
                commit('SET_TOURS', res.data)
            })
        }
    }

}