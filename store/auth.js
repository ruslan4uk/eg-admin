export default {
    namespaced: true,

    state() {
        return {
            busy: false,
            loggedIn: false,
            strategy: 'local',
            user: false,
            baseImgPath: '',
            subLoading: false,
        }
    },

    getters: {
        authenticated(state) {
            return state.loggedIn;
        },
        user(state) {
            return state.user;
        },
        baseImgPath(state) {
            return state.baseImgPath
        },
        loggedIn(state) {
            return state.loggedIn
        },
        subLoading(state) {
            return state.subLoading
        }
    },

    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },

        SET_LICENSE(state, payload) {
            state.user.user_license = payload
        },
        SET_AVATAR(state, payload) {            
            state.avatar = payload
        },

        SET_SUB_LOADING(state, payload) {
            state.subLoading = payload
        }
    },

    actions: {
        
    }
}