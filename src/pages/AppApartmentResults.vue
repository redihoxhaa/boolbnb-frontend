<script>
// IMPORTS
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";
import { store } from "../store";
import axios from "axios";
import ApartmentCard from "../components/partials/ApartmentCard.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import MapReasearch from "../components/partials/MapReasearch.vue";
import MapReasearchMobile from "../components/partials/MapReasearchMobile.vue";
// /IMPORTS

export default {
  components: { AdvancedSearch, ApartmentCard, HomeMenu, MapReasearch, MapReasearchMobile },
  data() {
    return {
      store,
      apartmentResults: [],
      loaderStatus: true,
      center: null,
      isDragging: false,
      startX: 0,
      scrollLeft: 0
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

    startDragging(event) {
      this.isDragging = true;
      this.startX = event.pageX - this.$refs.scrollContainer.offsetLeft;
      this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
    },

    stopDragging() {
      this.isDragging = false;
    },

    dragging(event) {
      if (!this.isDragging) return;
      const x = event.pageX - this.$refs.scrollContainer.offsetLeft;
      const walk = (x - this.startX) * 2; // Adjust scrolling speed
      this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
    }
  },
  mounted() {

    this.getApartments();
  },
};
</script>

<template>

  <div class="container-fluid sticky-top">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
  </div>
  <div class="container-fluid py-0">
    <div class="advanced-searchbar d-flex justify-content-center">
      <AdvancedSearch :addressProp="this.$route.params.address" />
    </div>
  </div>

  <div class="d-flex justify-content-center mb-5 pb-5" v-if="loaderStatus">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="content" v-else>
    <div class="container-fluid custom" v-if="apartmentResults.length && loaderStatus === false">
      <div class="row m-0">
        <div class="col-12 col-lg-6 px-0">
          <h5 class="results mt-5 mt-md-0">{{ apartmentResults.length }} Results found</h5>

          <div class="row apartments-list flex-nowrap m-0 g-3 user-select-none" ref="scrollContainer"
            @mousedown="startDragging" @mouseup="stopDragging" @mousemove="dragging">
            <div v-for="apartment in apartmentResults" :key="apartment.id"
              class="apartment-card col-12 col-md-6 col-xxl-4 ">
              <ApartmentCard :apartment="apartment" />
            </div>
          </div>
        </div>
        <!-- Mappa desktop -->
        <div class="col-6 map-div">
          <div class="my-map">
            <MapReasearch :apartments="apartmentResults" :center="center" />
          </div>
        </div>

        <!-- Mappa mobile -->
        <div class="col-12 mt-5 mb-5">
          <div class="mobile-map">
            <MapReasearchMobile :apartments="apartmentResults" :center="center" />
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

.apartments-list {
  overflow-x: scroll;
}

.mobile-map {
  width: 100%;
}

.results {
  font-weight: 600;
}

.map-div {
  position: relative;
  display: none;

  .my-map {
    position: sticky;
    top: 85px;
    margin-top: -122px;
  }
}

.sticky-top {
  background-color: white;
}

::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}


::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: radial-gradient(circle, rgba(40, 40, 40, 0.1) 50%, rgba(252, 176, 69, 0) 100%);
  border-radius: 10px;
}

@media screen and (min-width: 992px) {
  .apartments-list {
    flex-wrap: wrap !important;
    overflow-x: unset;
  }

  .advanced-searchbar {
    width: 50%;
    justify-content: start;
  }

  .mobile-map {
    display: none;
  }

  .map-div {
    display: block;
  }
}
</style>
