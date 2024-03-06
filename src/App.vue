<script>
import axios from 'axios';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { store } from './store';

export default {
  components: { Header, Footer },
  data() {
    return {
      store,
      showHeader: true,
      apartmentResults: {},
    }
  },
  methods: {
    toggleHeader(value) {
      this.showHeader = value; // Aggiorniamo la variabile showHeader con il valore ricevuto dall'evento
    },
    getApartments(apartmentQuery) {
      console.log(apartmentQuery);
      console.log(this.store.apartmentAPI);
      axios.get(this.store.apartmentAPI, {
        params: {
          address: apartmentQuery.address,
          radius: apartmentQuery.radius,
        }
      }).then(response => {
        console.log('chiamata effettuata');
        this.apartmentResults = response.data
        console.log(this.apartmentResults);
        this.$router.push({ name: 'apartments-results' })
      })
    },
  },
}
</script>

<template>
  <Header v-if="showHeader" />
  <router-view @header-toggle="toggleHeader" @search="getApartments"
    :apartmentResults="this.apartmentResults"></router-view>
  <Footer />
</template>

<style lang="scss" scoped></style>
