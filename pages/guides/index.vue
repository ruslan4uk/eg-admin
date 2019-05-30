<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3 class="mb-5">Guides</h3>
                <b-table striped hover 
                        :items="users.data" 
                        :fields="fields" 
                        :tbody-tr-class="rowClass"
                        :busy="subLoading">
                    <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                    <template slot="avatar" slot-scope="data">
                        <b-img-lazy 
                            v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                            :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                            :src="baseImgPath + data.item.avatar" 
                            rounded="circle"></b-img-lazy>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button pill variant="success" size="sm" class="mr-1" @click="setActive(data.item.id, 2)">
                            <fa :icon="['fas', 'check']" />
                        </b-button>

                        <b-button pill variant="info" size="sm" class="mr-1" @click="showUser(data.item.id)">
                            <fa :icon="['fas', 'search']" />
                        </b-button>

                        <b-button pill variant="danger" size="sm" class="mr-1" @click="deleteUser(data.item.id)">
                            <fa :icon="['fas', 'trash']" />
                        </b-button>
                    </template>
                </b-table>

                <b-pagination-nav 
                    class="mt-3 custom-pagination"
                    align="center"
                    :link-gen="linkGen" 
                    :number-of-pages="users.last_page" 
                    use-router />   
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    middleware: ['auth'],

    watchQuery: ['page'],

    data() {
        return {
            fields: ['avatar', 'name', 'email', 'created_at', 'actions'],
            isBusy: false
        }
    },

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { users: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Guide not found' })
        })
    },    

    methods: {
        rowClass(item, type) {
            if (!item) return
            if (item.active === 2) return 'table-info'
        },

        linkGen(pageNum) {
            return { 
                path: this.$route.path,
                query: pageNum !== 1 ? { page: pageNum } : null
            }
        },

        setActive(id, active) {
            this.$axios.put(this.$route.path + '/' + id, {active: active}).then(res => {
                this.users.data[this.users.data.findIndex(x => x.id === id)].active = active
                this.$bvToast.toast('Пользователь подтвержден', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })    
            })
        },

        deleteUser(id) {
            this.$axios.delete(this.$route.path + '/' + id).then(res => {
                this.users.data.splice(this.users.data.findIndex(x => x.id === id), 1)
                this.$bvToast.toast('Пользователь удален', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })   
            })
        },

        showUser(id) {
            this.$router.push({ name: 'guides-id', params: {id: id} })
        }

    },
}
</script>

<style scoped>

</style>