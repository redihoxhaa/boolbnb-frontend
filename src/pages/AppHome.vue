<script>
import HomeMenu from "../components/partials/HomeMenu.vue";
import HomeSearch from "../components/partials/HomeSearch.vue";

export default {
  name: "AppHome",
  props: [],
  components: { HomeMenu, HomeSearch },
  data() {
    return {};
  },
  mounted() {
    // Emit evento al componente genitore con il valore false
    this.$emit("header-toggle", false);
  },
  methods: {
    handleSearch(apartmentQuery) {
      this.$emit('search', apartmentQuery);
    }
  }
};
</script>

<template>
  <header>
    <div class="menu-container">
      <HomeMenu />
    </div>
    <div>
      <HomeSearch @search="handleSearch" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  height: 100vh;
  width: 100vw;
  background-image: url(/src/assets/img/homepage_background.png);

  .menu-container {
    margin: 0 auto;
    padding: 10px;
  }
}
</style>
