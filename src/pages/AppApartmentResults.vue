<script>
// IMPORTS
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";
import { store } from "../store";
import axios from "axios";
import ApartmentCard from "../components/partials/ApartmentCard.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import MapReasearch from "../components/partials/MapReasearch.vue";
// /IMPORTS

export default {
  components: { AdvancedSearch, ApartmentCard, HomeMenu, MapReasearch },
  data() {
    return {
      store,
      apartmentResults: [],
      loaderStatus: true,
      center: null,
    };
  },
  watch: {
    '$route'(to, from) {
      // Controlla se ci sono cambiamenti nei parametri dell'URL
      if (to.params.address !== from.params.address ||
        to.params.rooms !== from.params.rooms ||
        to.params.beds !== from.params.beds ||
        to.params.bathrooms !== from.params.bathrooms ||
        to.params.radius !== from.params.radius ||
        to.params.services !== from.params.services) {
        // Richiama la funzione getApartments() per ottenere i nuovi risultati degli appartamenti
        this.getApartments();
      }
    }
  },
  methods: {
    // Funzione per ricercare gli appartamenti
    getApartments() {
      this.apartmentResults = [];
      // console.log('metto lo status a true');
      this.loaderStatus = true;
      const params = {
        address: this.$route.params.address,
      };

      if (this.$route.params.rooms) {
        params.rooms = this.$route.params.rooms;
      }

      if (this.$route.params.beds) {
        params.beds = this.$route.params.beds;
      }

      if (this.$route.params.bathrooms) {
        params.bathrooms = this.$route.params.bathrooms;
      }

      if (this.$route.params.radius) {
        params.radius = this.$route.params.radius;
      }

      if (this.$route.params.services) {
        params.services = this.$route.params.services;
      }

      axios
        .get(this.store.allApartmentsAPI + this.store.searchApartmentsURI, { params })
        .then((response) => {
          // console.log("chiamata effettuata");
          this.apartmentResults = response.data.apartments;
          this.center = response.data.center;
        }).finally(() => {
          this.loaderStatus = false;
          // console.log('metto lo status a true'); 
        })
    },

    // Funzione per visitare l'appartamento
    visitApartment(apartmentID) {
      this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
    },
  },
  mounted() {

    this.getApartments();
  },
};
</script>

<template>

  <div class="container-fluid sticky-top">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
    <AdvancedSearch :addressProp="this.$route.params.address" />
  </div>



  <div class="d-flex justify-content-center mb-5 pb-5" v-if="loaderStatus">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="content" v-else>
    <div class="container-fluid custom" v-if="apartmentResults.length && loaderStatus === false">
      <div class="row m-0">
        <div class="col-lg-6">
          <div class="row m-0 g-3">
            <h5 class="fw-bold">{{ apartmentResults.length }} Results found</h5>
            <div v-for="apartment in apartmentResults" :key="apartment.id" class="apartment-card col-lg-4 col-md-6">
              <ApartmentCard :apartment="apartment" />
            </div>
          </div>
        </div>
        <div class="col-6 map-div">
          <div class="my-map">
            <MapReasearch :apartments="apartmentResults" :center="center" />
          </div>
        </div>
      </div>
    </div>
    <h4 class="text-center" v-else>No apartment was found</h4>
  </div>
</template>


<style lang="scss" scoped>
.container-fluid {
  padding: 10px 5%;
}

.container-fluid.custom {
  padding: 0 5%;

}

.map-div {
  position: relative;

  .my-map {
    position: sticky;
    top: 207px
  }
}

.sticky-top {
  background-color: white;
}
</style>
