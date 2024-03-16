<script>
import axios from "axios";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { store } from "./store";

export default {
  components: { Header, Footer },
  data() {
    return {
      store,
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<template>
  <router-view></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
