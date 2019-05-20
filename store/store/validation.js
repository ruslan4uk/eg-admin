export default {

    namespaced: true,

    state() {
        return {
            errors: {},
        }
    },

    getters: {
        errors(state) {
            return state.errors;
        }
    },

    mutations: {
        SET_VALIDATION_ERRORS(state, errors) {
            state.errors = errors;
        }
    },

    actions: {
        setErrors({ commit }, errors) {
            commit('SET_VALIDATION_ERRORS', errors);
        },
        clearErrors({ commit }) {
            commit('SET_VALIDATION_ERRORS', {});
        }
    },
}