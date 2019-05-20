import { get } from 'lodash'
export default function({ $axios, store, app, redirect }) {

    $axios.interceptors.response.use(response => {
        const newtoken = get(response, 'headers.authorization')        
        if (newtoken) {
            store.$auth.setToken('local', newtoken);
        }
        return response;
    }, error => {
        //console.log(error.response.data);

        if(error.response.status === 401) {
            store.$auth.reset()
            store.$auth.logout();
            console.log(store.$auth.getToken('local'));
        }

        if(error.response.data.message === "The token has been blacklisted") {
                store.$auth.reset()
                store.$auth.logout();
                console.log(store.$auth.getToken('local'));
        }

        switch (error.response.status) {            
            case 401:
            store.$auth.reset()
            store.$auth.logout();
            console.log(store.$auth.getToken('local'));
                break
            case 422:
                store.dispatch('validation/setErrors', error.response.data.errors);
                break;
            default:
            }
        return Promise.reject(error)
    });

    // $axios.onError(error => {
    //     if (error.response && error.response.status === 422) {
    //         store.dispatch('validation/setErrors', error.response.data.errors);
    //     }
    //     if (error.response && error.response.status === 401) {
    //         app.$auth.logout()
    //     //     // redirect('/auth/login');
    //     }
    //     return Promise.reject(error);
    // });

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors');
    });
}