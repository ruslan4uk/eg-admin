import Vue from 'vue';

import { mapGetters } from 'vuex';

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    user: 'auth/user',
                    authenticated: 'auth/authenticated',
                    baseImgPath: 'auth/baseImgPath',
                    subLoading: 'auth/subLoading'
                }),
            }
        })
    }
}

Vue.use(User);