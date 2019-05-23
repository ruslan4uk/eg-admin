<template>
    <b-container class="mb-5">
        <b-row>
            <b-col cols="12">
                <h3 class="mb-5">Articles / {{ article.name ? article.name : 'Create' }}</h3>
                <b-form @submit.prevent="saveArticle">
                    <b-row>
                        <b-col md="9">

                            <ArticleUploader 
                                :url="'/articles/' + article.id + '/upload'"
                                :img="article.avatar"
                                @change="setAvatar"/>
                                
                            <b-form-group>
                                <label for="name">Article name</label>
                                <b-form-input v-model="article.name" placeholder="Название" id="name"></b-form-input>
                                <div class="invalid-feedback d-block" v-if="errors.name">
                                    Обязательное поле
                                </div>
                            </b-form-group>

                            <b-form-group class="position-relative">
                                <label for="city">City / Country</label>
                                <b-form-input v-model="city" :disabled="disabled" @input="searchCity($event)"></b-form-input>
                                <div class="suggest shadow" v-if="isSuggest" v-click-outside="hide">
                                    <div class="suggest__item" 
                                        v-for="(item, index) in suggest" :key="index">
                                        <a href="" @click.prevent="changeCity(item)">{{ item.name }}, {{ item.city_country.name }}</a>    
                                    </div>
                                </div>
                                <div class="suggest__delete" @click="cityDelete" v-if="disabled">
                                    <fa :icon="['fas', 'trash']" />
                                </div>
                                <div class="invalid-feedback d-block" v-if="errors.city_id || errors.country_id">
                                    Обязательное поле
                                </div>
                            </b-form-group>
                            
                            <b-form-group>
                                <label for="text">Article text</label>
                                <vue-editor 
                                    id="text"
                                    placeholder="Write Something..." 
                                    v-model="article.text">
                                </vue-editor>
                                <div class="invalid-feedback d-block" v-if="errors.text">
                                    Обязательное поле
                                </div>
                            </b-form-group>

                            <b-form-group>
                                <b-form-checkbox
                                    id="checkbox-1"
                                    v-model="article.active"
                                    name="checkbox-1"
                                    value="1"
                                    unchecked-value="0" >
                                    Active
                                </b-form-checkbox>

                            </b-form-group>

                            <b-button type="submit" variant="success">Save</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import ClickOutside from "vue-click-outside";
import ArticleUploader from '@/components/ArticleUploader'

export default {
    middleware: ['auth'],

    components: {
        ArticleUploader,
    },

    data() {
        return {
            suggest: {},
            isSuggest: false,
            city: '',
            disabled: false,
        }
    },

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

        store.commit('auth/SET_SUB_LOADING', true)

        return store.$axios.get(route.path)
            .then((res) => {
                store.commit('auth/SET_SUB_LOADING', false)
                return { article: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Article not found' })
        })
    },    

    methods: {
        saveArticle() {
            this.$axios.put(this.$route.path, this.article).then( res=> {
                this.$bvToast.toast('Статья сохранена', {
                    title: 'Внимание!',
                    autoHideDelay: 5000,
                    variant: 'success',
                    solid: true,
                    toaster: 'b-toaster-bottom-right',
                })  
            })
        },

        setAvatar(path) {
            this.article.avatar = path;
        },

        searchCity(value) {
            this.$axios.get('/city?q=' + value).then(res => {
                this.suggest = res.data.data
                this.isSuggest = true
            })
        },

        changeCity(item) {
            this.city = item.name + ', ' + item.city_country.name
            this.suggest = {}
            this.isSuggest = false 
            this.article.city_id = item.id 
            this.article.country_id = item.city_country.id
            this.disabled = true
        }, 

        cityDelete() {
            this.article.city_id = null,
            this.article.country_id = null 
            this.disabled = false 
            this.city = ''
        },

        hide() {
            this.isSuggest = false
        }
    },


    created() {
        if(this.article.city_id) {
            this.city = this.article.article_city.name + ', ' + this.article.article_city.city_country.name
            this.disabled = true
        }
    },


    directives: {
        ClickOutside
    },



}
</script>

<style scoped lang="sass">
.suggest 
    position: absolute
    width: 100% 
    z-index: 3
    border-left: 1px solid #ccc 
    border-right: 1px solid #ccc 
    &__item
        & a 
            width: 100% 
            padding: 0.5rem 1rem
            display: block
            background: #ffffff
            border-bottom: 1px solid #ccc
            &:hover 
                background: #fafafa

    &__delete 
        position: absolute 
        top: 2.5rem
        right: 0.5rem 
        z-index: 4
</style>