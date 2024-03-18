import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./pages/AppHome.vue";
import AppApartmentResults from "./pages/AppApartmentResults.vue";
import SingleApartment from "./pages/SingleApartment.vue";
import AllApartments from "./pages/AllApartments.vue";
import AboutUs from "./pages/AboutUs.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/apartments",
      name: "all-apartments",
      component: AllApartments,
    },
    {
      path: "/apartments/results/:address/:radius?/:rooms?/:beds?/:bathrooms?/:services?",
      name: "apartments-results",
      component: AppApartmentResults,
    },
    {
      path: "/single-apartments/results/:id",
      name: "single-apartment",
      component: SingleApartment,
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUs,
    },
  ],
});
export { router };
