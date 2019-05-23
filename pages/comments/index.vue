<template>
     <b-container>
        <b-row>
            <b-col>
                <h3 class="mb-5">Comments</h3>
                
                <b-table striped hover
                        :items="comments.data" 
                        :fields="fields" 
                        :tbody-tr-class="rowClass"
                        :busy="subLoading"
                        class="alilgn-items-center">
                    <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                    <template slot="author" slot-scope="data">
                        <div class="d-flex align-items-center justify-items-start">
                            <b-img-lazy 
                                v-bind="{width: 50, height: 50, blank: true, blankColor: '#bbb',}" 
                                :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                                :src="baseImgPath + data.item.comment_author.avatar" 
                                rounded="circle"
                                class="mr-3"></b-img-lazy>
                            <nuxt-link :to="{ name: 'guides-id', params: {id: data.item.comment_author.id} }">
                                <strong>{{ data.item.comment_author.name }}</strong>
                            </nuxt-link>
                        </div>
                    </template>

                    <template slot="guide" slot-scope="data">
                        <div class="d-flex align-items-center justify-items-start">
                            <b-img-lazy 
                                v-bind="{width: 50, height: 50, blank: true, blankColor: '#bbb',}" 
                                :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                                :src="baseImgPath + data.item.comment_guide.avatar" 
                                rounded="circle"
                                class="mr-3"></b-img-lazy>
                            <nuxt-link :to="{ name: 'guides-id', params: {id: data.item.comment_guide.id} }">
                                <strong>{{ data.item.comment_guide.name }}</strong>
                            </nuxt-link>
                        </div>
                    </template>

                    <template slot="actions" slot-scope="data">
                        <!-- <b-button pill variant="success" size="sm" class="mr-1" @click="setActive(data.item.id, 2)">
                            <fa :icon="['fas', 'check']" />
                        </b-button> -->

                        <b-button pill variant="danger" size="sm" class="mr-1" @click="deleteComment(data.item.id)">
                            <fa :icon="['fas', 'trash']" />
                        </b-button>
                    </template>
                </b-table>

                <b-pagination-nav 
                    class="mt-3 custom-pagination"
                    align="center"
                    :link-gen="linkGen" 
                    :number-of-pages="comments.last_page" 
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
            fields: ['author', 'guide', 'text', 'created_at', 'actions'],
            isBusy: false
        }
    },

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { comments: res.data.data }
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
                this.comments.data[this.comments.data.findIndex(x => x.id === id)].active = active
                this.$bvToast.toast('Пользователь подтвержден', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })    
            })
        },

        deleteComment(id) {
            this.$axios.delete(this.$route.path + '/' + id).then(res => {
                this.comments.data.splice(this.comments.data.findIndex(x => x.id === id), 1)
                this.$bvToast.toast('Комментарий удален', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })   
            })
        },

    },
}
</script>

<style scoped>

</style>