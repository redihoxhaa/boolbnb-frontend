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
      <div class="home-top">
        <HomeMenu />
      </div>
      <div class="home-bottom">
        <h1 class="main-title">Redefining tourist lifestyles through our premium apartment</h1>
        <HomeSearch />
      </div>
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
    padding-top: 10px;
    padding: 10px 2rem 2rem;
    height: 100%;
  }

  .main-title {
    color: #fff;
    font-size: 4vw;
    line-height: 110%;
    width: 60%;
    font-weight: 400;
    margin-bottom: 2%;
  }
}
</style>
