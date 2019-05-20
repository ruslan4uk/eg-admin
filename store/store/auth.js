export default {
    namespaced: true,

    state() {
        return {
            busy: false,
            loggedIn: false,
            strategy: 'local',
            user: false,
            baseImgPath: 'http://localhost:8000/storage/'
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
            state.user.avatar = payload
        }
    },

    actions: {
        
    }
}