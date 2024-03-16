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
      scrollLeft: 0,
      hoveredIndex: null
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
    },

    showMarkerHint(index) {
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach((marker, i) => {
        if (i === index) {
          marker.classList.add('hint');
        }
      });
    },

    hideMarkerHint() {
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => {
        marker.classList.remove('hint');
      });
    }
  },
  mounted() {
    document.title = 'MalHome - ' + this.$route.params.address;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getApartments();
  },
};
</script>

<template>

  <div class="custom-border sticky-top ">
    <div class="container-fluid">
      <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
    </div>
  </div>

  <!-- Advanced Search -->
  <div class="container-fluid pt-5">
    <div class="col-12 col-lg-6 padding-layer-search">
      <AdvancedSearch :addressProp="this.$route.params.address" />
    </div>
  </div>

  <!-- Loader -->
  <div class="container-fluid d-flex mb-5 pb-5" v-if="loaderStatus">
    <div class="content-loader col-12 col-lg-6 d-flex justify-content-center pt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="map-loader col-12 col-lg-6 skeleton-loader map-div">
    </div>
  </div>

  <!-- Content -->
  <div class="content" v-else>

    <!-- Apartment Results -->
    <div class="container-fluid custom" v-if="apartmentResults.length && loaderStatus === false">
      <div class="row m-0">

        <!-- Title Results -->
        <div class="col-12 col-lg-6 px-0">
          <h5 class="results mt-5 mt-md-0">{{ apartmentResults.length }} Results found</h5>

          <div class="row apartments-list flex-nowrap m-0 g-3 user-select-none" ref="scrollContainer"
            @mousedown="startDragging" @mouseup="stopDragging" @mousemove="dragging">
            <div v-for="(apartment, index) in apartmentResults" :key="apartment.id"
              class="apartment-card col-12 col-md-6 col-xxl-4">
              <ApartmentCard :apartment="apartment" :index="index" @show-hint="showMarkerHint"
                @hide-hint="hideMarkerHint" />
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

    <!-- Apartment Not fount -->

    <h4 class="text-left py-5 hide-footer container-fluid" v-else>No apartment was found, retry with other filters.</h4>
  </div>



</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.custom-border {
  border-bottom: 1px solid #dddddd;
}

.hide-footer {
  margin-bottom: 42vh;
}

.map-loader {
  background-color: red;
  margin-top: -100px;
  margin-left: 12px;
  width: calc(50vw - 12px);
  height: 100vh;
}

.skeleton-loader {
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%),
    lightgray;
  background-repeat: repeat-y;
  background-size: 600px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0,
      0 0;
  }
}

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

.loader {
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
  animation: animMarker 0.4s ease-in-out infinite alternate;
}


@keyframes animMarker {
  0% {
    transform: translate(0px, 8px);
  }

  100% {
    transform: translate(0px, -8px);
  }
}

@keyframes animShadow {
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
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

@media screen and (min-width: 960px) {

  .padding-layer-search {
    padding: 0 0 20px 0;
  }
}

@media screen and (min-width: 992px) {
  .apartments-list {
    flex-wrap: wrap !important;
    overflow-x: unset;
    padding-right: 20px;
  }

  .padding-layer-search {
    padding: 0 0 20px 0;
  }



  .mobile-map {
    display: none;
  }

  .map-div {
    display: block;
  }
}
</style>
