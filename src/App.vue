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
    toggleHeader(value) {
      this.store.showHeader = value; // Aggiorniamo la variabile showHeader con il valore ricevuto dall'evento
    },
  },
};
</script>

<template>
  <Header v-if="store.showHeader" />
  <router-view @header-toggle="toggleHeader"></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
