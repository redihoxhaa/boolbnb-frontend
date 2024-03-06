<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";

// /IMPORTS

export default {
  props: [],
  components: {},
  data() {
    return {
      store,
      apartments: null,
    };
  },
  methods: {
    getApartments() {
      axios.get(this.store.allApartmentsAPI).then((response) => {
        this.apartments = response.data;
      });
    },
  },
  mounted() {
    this.getApartments();
    this.store.showHeader = true;
  },
};
</script>

<template>
  <ul class="apartments" v-if="apartments">
    <li v-for="apartment in apartments">{{ apartment.title }}</li>
  </ul>
</template>

<style lang="scss" scoped>
// USES

// /USES
</style>
