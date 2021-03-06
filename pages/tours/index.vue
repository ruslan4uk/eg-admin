<template>
    <b-container>
        <b-row>
            <b-col>
                <h3 class="mb-5">Tours</h3>

                <b-table striped hover 
                        :items="tours.data" 
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
                    <template slot="user" slot-scope="data">
                        <div class="d-flex align-items-center">
                        <b-img-lazy 
                            v-bind="{width: 50, height: 50, blank: true, blankColor: '#bbb',}" 
                            :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                            :src="baseImgPath + data.item.user.avatar" 
                            rounded="circle"
                            class="mr-2"></b-img-lazy> 
                            <strong>{{ data.item.user.name }}</strong>
                        </div>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button pill variant="success" size="sm" class="mr-1" @click="setActive(data.item.id, 2)">
                            <fa :icon="['fas', 'check']" />
                        </b-button>

                        <b-button pill variant="info" size="sm" class="mr-1" @click="showTour(data.item.id)">
                            <fa :icon="['fas', 'search']" />
                        </b-button>

                        <b-button pill variant="danger" size="sm" class="mr-1" @click="deleteTour(data.item.id)">
                            <fa :icon="['fas', 'trash']" />
                        </b-button>
                    </template>
                </b-table>

                <b-pagination-nav 
                    class="mt-3 custom-pagination"
                    align="center"
                    :link-gen="linkGen" 
                    :number-of-pages="tours.last_page" 
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
            fields: ['avatar', 'name', 'user', 'created_at', 'actions'],
            isBusy: false
        }
    },

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { tours: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Guide not found' })
        })
    },    

    methods: {
        rowClass(item, type) {
            if (!item) return
            if (item.active === 1) return 'table-info'
        },

        linkGen(pageNum) {
            return { 
                path: this.$route.path,
                query: pageNum !== 1 ? { page: pageNum } : null
            }
        },

        setActive(id, active) {
            this.$axios.put(this.$route.path + '/' + id, {active: active}).then(res => {
                this.tours.data[this.tours.data.findIndex(x => x.id === id)].active = active
                this.$bvToast.toast('Экскурсия подтверждена', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })    
            })
        },

        deleteTour(id) {
            this.$axios.delete(this.$route.path + '/' + id).then(res => {
                this.tours.data.splice(this.tours.data.findIndex(x => x.id === id), 1)
                this.$bvToast.toast('Экскурсия удалена', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })   
            })
        },

        showTour(id) {
            this.$router.push({ name: 'tours-id', params: {id: id} })
        }

    },
}
</script>

<style scoped>

</style>