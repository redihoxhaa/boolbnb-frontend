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
      apartment: null,
    };
  },
  methods: {
    getApartment() {
      axios
        .get(this.store.allApartmentsAPI + this.store.singleApartmentURI, {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.apartment = response.data;
        });
    },
  },
  created() {
    this.getApartment();
  },
  mounted() {
    this.store.showHeader = true;
  },
};
</script>

<template>
  <div v-if="apartment">
    <div>{{ apartment.id }}</div>
    <div>{{ apartment.title }}</div>
  </div>
</template>

<style lang="scss" scoped>
// USES

// /USES
</style>
