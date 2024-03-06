import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppApartmentResults from './pages/AppApartmentResults.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments/results',
            name: 'apartments-results',
            component: AppApartmentResults,
            props: true,
        },
    ]
});
export { router };