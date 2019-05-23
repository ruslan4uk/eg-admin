<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h3 class="mb-5">Articles</h3>
                <b-button variant="success" class="mb-4" @click="addArticle">Добавить статью</b-button>
                <b-table striped hover 
                        :items="article.data" 
                        :fields="fields" 
                        :tbody-tr-class="rowClass"
                        :busy="subLoading">
                    <div slot="table-busy" class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong>Loading...</strong>
                    </div>
                    <template slot="avatar" slot-scope="data">
                        <b-img-lazy 
                            v-bind="{width: 50, height: 50, blank: true, blankColor: '#bbb',}" 
                            :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                            :src="baseImgPath + data.item.avatar" 
                            rounded="circle"></b-img-lazy>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <b-button pill variant="info" size="sm" class="mr-1" @click="showArticle(data.item.id)">
                            <fa :icon="['fas', 'search']" />
                        </b-button>

                        <b-button pill variant="danger" size="sm" class="mr-1" @click="deleteArticle(data.item.id)">
                            <fa :icon="['fas', 'trash']" />
                        </b-button>
                    </template>
                </b-table>

                <b-pagination-nav 
                    class="mt-3 custom-pagination"
                    align="center"
                    :link-gen="linkGen" 
                    :number-of-pages="article.last_page" 
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
            fields: ['avatar', 'name', 'created_at', 'actions'],
            isBusy: false
        }
    },

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path, {params: { page: query.page }})
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { article: res.data.data }
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

        deleteArticle(id) {
            this.$axios.delete(this.$route.path + '/' + id).then(res => {
                this.article.data.splice(this.article.data.findIndex(x => x.id === id), 1)
                this.$bvToast.toast('Статья удалена', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })   
            })
        },

        showArticle(id) {
            this.$router.push({ name: 'articles-id', params: {id: id} })
        },

        addArticle() {
            this.$axios.get(this.$route.path + '/create').then(res => {
                this.$router.push({name: 'articles-id', params: {id: res.data.data.id}})
            })
        }

    },
}
</script>

<style scoped>

</style>