<template>
    <b-container>
        <b-row>
            <b-col>
                <h3 class="mb-5">Dashboard</h3>
                <b-card class="shadow p-3 mb-5 bg-white rounded">
                    <b-row>
                        <b-col class="text-center">
                            <h1>{{ dashboard.user_count }}</h1>
                            <h3>Users</h3>
                        </b-col>

                        <b-col class="text-center">
                            <h1>{{ dashboard.tour_count }}</h1>
                            <h3>Tours</h3>
                        </b-col>

                        <b-col class="text-center">
                            <h1>{{ dashboard.comment_count }}</h1>
                            <h3>Comments</h3>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    middleware: ['auth'],

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { dashboard: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Guide not found' })
        })
    },    


}
</script>

<style scoped>

</style>