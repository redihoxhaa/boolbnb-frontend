import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import AppApartmentResults from './pages/AppApartmentResults.vue'
import SingleApartment from './pages/SingleApartment.vue'
import AllApartments from './pages/AllApartments.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments',
            name: 'all-apartments',
            component: AllApartments
        },
        {
            path: '/apartments/results/:address/:radius?/:rooms?/:beds?/:bathrooms?/:services?',
            name: 'apartments-results',
            component: AppApartmentResults,
            props: true,
        },
        {
            path: '/single-apartments/results/:id',
            name: 'single-apartment',
            component: SingleApartment,
            props: true,
        },
    ]
});
export { router };