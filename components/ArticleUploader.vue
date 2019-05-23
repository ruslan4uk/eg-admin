<template>
    <div>
        <div class="uploader mb-4">
            <div class="">
                <div class="spinner">
                    <b-spinner variant="primary" type="grow" label="Spinning" v-if="spinner"></b-spinner>
                </div>
                
                <img :src="baseImgPath + img" alt="" v-if="img" class="border25">                 
            </div>
        
            <!-- <a href="" class="profile__avatar-upload">Добавить фото</a> -->
            <label for="profile-avatar" class="profile__avatar-upload">Upload photo</label>
            <input type="file" @change="changeAvatar" name="avatar" ref="avatar" id="profile-avatar" class="profile__avatar-uploader">
        </div>
    </div>
</template>

<script>
export default {
    props: ['url', 'img'],

    data() {
        return {
            timestamp: Date.now(),
            spinner: false
        }
    },
    
    methods: {
        changeAvatar() {
            this.spinner = true,

            this.image = this.$refs.avatar.files[0];   
            let formData = new FormData
            formData.append('file', this.image)
            this.$axios.post(this.url, formData, {headers: {'Content-Type': 'multipart/form-data'}})
                .then(response => {
                    this.$emit('change', response.data.data + '?t=' + this.timestamp)
                    this.spinner = false
                })
        },
        getAvatar(avatar) {
            return this.baseImgPath + avatar + '?t=' + this.timestamp
        }
    },

    watch: {
        'img': function() {
            this.timestamp = Date.now()
        }
    },

}
</script>

<style scoped lang="sass">
.uploader 
    min-height: 10rem
    max-width: 100% 
    position: relative
    border: 2px solid #ccc
    border-radius: 25px
    & input 
        position: absolute
        left: -9999px
    & label
        cursor: pointer
        position: absolute
        left: 50% 
        top: 50%
        transform: translate3d(-50%, -50%, 0)
        padding: 1rem 1.5rem
        font-weight: 500
        background: #fff
        border-radius: 25px 
    & .spinner
        position: absolute
        left: 50% 
        top: 50%
        transform: translate3d(-50%, -50%, 0)
        z-index: 3
    & img 
        border-radius: 25px
        display: block
        max-width: 100%
</style>