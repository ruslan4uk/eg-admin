<template>
    <b-container>
        <b-row>
            <b-col>
                <h3 class="mb-5">Guide / {{ tour.name }}</h3>
                <b-row>
                    <b-col md="4" lg="3">
                        <b-img-lazy 
                            fluid-grow
                            v-bind="{width: 50, height: 50, center: true, blank: true, blankColor: '#bbb',}" 
                            :blank-src="require('~/assets/images/general/avatar-blank.jpg')"
                            :src="baseImgPath + tour.avatar" 
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
                            <div>Название: <strong>{{ tour.name }}</strong></div>
                            <hr>
                            <div>Город и страна: <strong>{{ tour.tour_city[0].name }}, {{ tour.tour_city[0].city_country.name }}</strong></div>
                            <hr>
                            <div>Маршрут: <strong>{{ tour.tour_route }}</strong></div>
                            <hr>
                            <div>Владение языками: 
                                <strong v-for="(language, index) in tour.tour_language" :key="index">{{ language.name }}, </strong>
                            </div>
                            <hr>
                            <div>Категория эскурсии: <strong>{{ tour.tour_category[0].name }}</strong></div>
                            <hr>
                            <div>Доступна для: <strong>{{ tour.tour_people_category[0].name }}</strong></div>
                            <hr>
                            <div>Колличество человек: <strong>{{ tour.people_count }}</strong></div>
                            <hr>
                            <div>Длительность: <strong>{{ tour.tour_timing[0].name }}</strong></div>
                            <hr>
                            <div>Стоимость: <strong>{{ tour.price }}, {{ tour.tour_currency[0].name }}, {{ tour.tour_price_type[0].name }}</strong></div>
                            <hr>
                            <div>Услуги: <strong>{{ tour.tour_services }}</strong></div>
                            <hr>
                            <div>Доп расходы: <strong>{{ tour.tour_more }}</strong></div>
                            <hr>
                            <div>Что с собой взять: <strong>{{ tour.tour_other }}</strong></div>
                        </b-card>

                        <b-card class="mt-5">
                            <h5>Об экскурсии</h5>
                            <div class="textarea-pre-wrap">{{ tour.about }}</div>
                        </b-card>

                        <b-card class="my-5">
                            <h5 class="mb-4">Фотографии</h5>
                            <b-row>
                                <b-col md="3" v-for="(image, index) in tour.tour_image" :key="index">
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
                return { tour: res.data.data }
            })
            .catch((e) => {
                error({ statusCode: 404, message: 'Guide not found' })
        })
    },

    methods: {
        setActive(active) {
            this.$axios.put(this.$route.path, {active: active}).then(res => {
                this.$bvToast.toast('Экскурсия подтверждена', {
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