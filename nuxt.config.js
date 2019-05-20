import pkg from './package'

export default {
  mode: 'universal',
  debug: false,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/style.sass'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/mixins/validation',
    '@/plugins/mixins/user',
    '@/plugins/axios',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        //import whole set
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
    }],
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:8000/api/v1/admin',
  },

  /**
   * Auth
   */
  auth: {
    plugins: [
      '~/plugins/axios'
    ],
    watchLoggedIn: true,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/admin-login', method: 'post', propertyName: 'token' },
          user: { url: '/auth/me', method: 'post', propertyName: 'data' },
          logout: { url: '/auth/logout', method: 'post' },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/'
    },
    watchLoggedIn: true,
  },

  /**
   * Router middleware config
   */
  router: {
    linkActiveClass: 'active',
    middleware: [
        'clearValidationErrors'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
