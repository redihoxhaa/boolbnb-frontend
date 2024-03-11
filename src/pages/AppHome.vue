<script>
import HomeMenu from "../components/partials/HomeMenu.vue";
import HomeSearch from "../components/partials/HomeSearch.vue";
import SponsoredApartments from "../components/partials/SponsoredApartments.vue";
import { store } from "../store";

export default {
  name: "AppHome",
  props: [],
  components: { HomeMenu, HomeSearch, SponsoredApartments },
  data() {
    return {
      store,
    };
  },
  mounted() {
    this.store.showHeader = false;
  },
  methods: {},
};
</script>

<template>
  <header>
    <div class="custom-container d-flex flex-column justify-content-between ">
      <HomeMenu />
      <HomeSearch />
    </div>
  </header>
  <SponsoredApartments />
</template>

<style lang="scss" scoped>
header {
  height: 100vh;
  max-width: 100vw;
  background-image: url(/src/assets/img/homepage_background.png);
  background-repeat: no-repeat;
  background-size: cover;

  .custom-container {
    margin: 0 auto;
    padding: 10px;
    height: 100%;
  }
}
</style>
