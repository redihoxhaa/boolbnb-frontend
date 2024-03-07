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
      apartmentResults: {},
    };
  },
  methods: {
    toggleHeader(value) {
      this.store.showHeader = value; // Aggiorniamo la variabile showHeader con il valore ricevuto dall'evento
    },
    getApartments(apartmentQuery) {
      axios
        .get(this.store.allApartmentsAPI + this.store.searchApartmentsURI, {
          params: {
            address: apartmentQuery.address,
            radius: apartmentQuery.radius,
          },
        })
        .then((response) => {
          console.log("chiamata effettuata");
          this.apartmentResults = response.data;
          console.log(this.apartmentResults);
          this.$router.push({ name: "apartments-results" });
        });
    },
  },
};
</script>

<template>
  <Header v-if="store.showHeader" />
  <router-view @header-toggle="toggleHeader" @search="getApartments"
    :apartmentResults="this.apartmentResults"></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
