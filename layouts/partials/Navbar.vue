<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-5">
            <b-container>
                <b-navbar-brand href="#">ExcursGuide</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav v-if="authenticated">
                    <b-navbar-nav>
                        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
                        <b-nav-item to="/articles">Articles</b-nav-item>
                        <b-nav-item to="/guides">Guides</b-nav-item>
                        <b-nav-item to="/tours">Tours</b-nav-item>
                        <b-nav-item to="/comments">Comments</b-nav-item>
                        <b-nav-item to="/settings">Settings</b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right v-if="user.name">
                            <template slot="button-content">{{ user.name }}</template>
                            <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                    
                </b-collapse>
            </b-container>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$auth.logout()
            },
        },
    }
</script>

<style scoped>

</style>