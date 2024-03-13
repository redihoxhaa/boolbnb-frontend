import { createApp } from 'vue'
import '../src/assets/scss/style.scss'
import App from './App.vue'
import { router } from './router';
import "bootstrap";



createApp(App).use(router).mount('#app')
