<template>
    <b-container>
        <b-row>
            <b-col>
                <h3 class="mb-5">Guide / {{ users.name }}</h3>
                <b-row>
                    <b-col md="4" lg="3">
                        <b-img-lazy 
                            fluid-grow
                            v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                            :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                            :src="baseImgPath + users.avatar" 
                            rounded
                            class="mb-3"></b-img-lazy>

                        <b-button pill variant="success" size="md" class="mr-1 w-100" @click="setActive(2)">
                            <fa :icon="['fas', 'check']" /> Одобрить
                        </b-button>
                    </b-col>

                    <b-col md="8" lg="9">
                        <b-card>
                            <h5>Основная информация</h5>
                            <hr>
                            <div>Имя: <strong>{{ users.name }}</strong></div>
                            <hr>
                            <div>Владение языками: 
                                <strong v-for="(language, index) in users.user_language" :key="index">{{ language.name }}, </strong>
                            </div>
                            <hr>
                            <div>Ваше местоположение: 
                                <strong v-for="(city, index) in users.user_city" :key="index">
                                    {{ city.city_country.name }}, {{ city.name }} |
                                </strong>
                            </div>
                            <hr>
                            <div>
                                <h6>Контакты: </h6>
                                <div v-for="(contact, index) in users.user_contact_type" :key="index">
                                    <strong>{{ contact.contact_type[0].name }}:</strong> {{ contact.text }} 
                                </div>
                            </div>
                            <hr>
                            <div>
                                Услуги:
                                <strong v-for="(service, index) in users.user_service" :key="index">
                                    {{ service.name }},
                                </strong>
                            </div>
                            <hr>
                            <h6>О себе:</h6>
                            <div class="textarea-pre-wrap">{{ users.about }}</div>
                        </b-card>

                        <b-card class="my-5">
                            <h5 class="mb-4">Лицензии</h5>
                            <b-row>
                                <b-col md="3" v-for="(image, index) in users.user_license" :key="index">
                                    <b-img-lazy 
                                        fluid-grow
                                        v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                                        :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                                        :src="baseImgPath + image.image_crop" 
                                        rounded></b-img-lazy>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    middleware: ['auth'],

    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        return store.$axios.get(route.path)
            .then((res) => {
                return { users: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Guide not found' })
        })
    },

    methods: {
        setActive(active) {
            this.$axios.put(this.$route.path, {active: active}).then(res => {
                this.$bvToast.toast('Пользователь подтвержден', {
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