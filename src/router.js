import { createRouter, createWebHistory } from 'vue-router';
import AppHome from './pages/AppHome.vue';
import PostList from './pages/PostList.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/blog',
            name: 'posts',
            component: PostList
        },
    ]
});
export { router };