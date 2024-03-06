<script>
// IMPORTS

import { store } from "../store";

// /IMPORTS

export default {
  props: ["apartmentResults"],
  emits: ["search"],
  components: {},
  data() {
    return {
      store,
    };
  },
  methods: {
    visitApartment(apartmentID) {
      this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
    },
  },
  mounted() {
    this.store.showHeader = true;
  },
};
</script>

<template>
  <h1>Apartment Results</h1>
  <h5 v-for="apartment in apartmentResults" @click="visitApartment(apartment.id)">
    {{ apartment.title }}
  </h5>
</template>

<style lang="scss" scoped>
// USES

// /USES
</style>
