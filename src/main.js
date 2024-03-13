import { createApp } from 'vue';
import '../src/assets/scss/style.scss';
import App from './App.vue';
import { router } from './router';
import "bootstrap";
import '@mdi/font/css/materialdesignicons.css'; // Se si utilizzano Material Design Icons

// Vuetify
import 'vuetify/styles';
import 'vuetify/dist/vuetify.min.css'; // Aggiunta per importare il foglio di stile di Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app');
