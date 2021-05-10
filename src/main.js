import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config"

// Importing styles
// import './assets/styles/select.css'
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import './assets/styles/style.css'

// Importing icons
import './assets/icons'

createApp(App).use(router, PrimeVue).mount('#app')
