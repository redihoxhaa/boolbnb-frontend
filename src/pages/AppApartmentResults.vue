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

  <div class="container">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
    <AdvancedSearch :addressProp="this.$route.params.address" />
  </div>


  <div class="d-flex justify-content-center mb-5 pb-5" v-if="loaderStatus">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="content" v-else>
    <div class="container-fluid my-5" v-if="apartmentResults.length && loaderStatus === false">
      <div class="row m-0">
        <div class="col-lg-6">
          <div class="d-flex justify-content-between align-items-center">
            <h4>{{ apartmentResults.length }} Results found</h4>
            <button class="button-filters d-flex align-items-center gap-2"><img src="/src/assets/img/instant_mix.svg"
                alt="" /> Filters</button>
          </div>
          <div class="d-flex mt-4 justify-content-between">
            <div>
              <div class="d-flex gap-5">
                <div>
                  <h5>Location</h5>
                  <div class="d-flex align-items-center gap-2"><img src="/src/assets/img/distance.svg" alt="" />
                    Indirizzo
                  </div>
                  <span class="small">Change address</span>
                </div>
                <div>
                  <h5>Filters</h5>
                  <ul class="d-flex list-unstyled gap-3 flex-wrap">
                    <li>Wi-fi <button class="cancel-button">X</button></li>
                    <li>Wi-fi <button class="cancel-button">X</button></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end align-items-center search-button-container"><button
                class="button-search" @click="goToResults" @keyup.enter="goToResults">
                <img src="/src/assets/img/search-icon.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="row m-0 g-3">
            <div v-for="apartment in apartmentResults" :key="apartment.id" class="apartment-card col-lg-4 col-md-6">
              <ApartmentCard :apartment="apartment" />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-none d-lg-block">
            <MapReasearch :apartments="apartmentResults" :center="center" />
          </div>
        </div>
      </div>
    </div>
    <h4 class="text-center" v-else>No apartment was found</h4>
  </div>
</template>


<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-button-container {
  display: flex;
  align-items: center;
  padding-left: 5px;

  .button-search {
    background-color: #bfe373;
    border: none;
    border-radius: 50%;
    aspect-ratio: 1;
    width: 50px;
    height: 50px;

    &:hover {
      background-color: #bfe373;
      transition: background-color 0.2s ease-in-out;
    }
  }
}

.cancel-button {
  all: unset;
  padding-left: 12px;
  font-weight: 900;
}

h5 {
  font-weight: bold;
  margin-bottom: 15px;
}

li {
  background-color: #D0D0D0;
  padding: 8px 30px;
  border-radius: 30px;

}

.button-filters {
  all: unset;
  border-radius: 15px;
  border: 1px solid #8D8D8D;
  padding: 8px 15px;
}




// .apartment-card {
//   border-radius: 12px;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   overflow: hidden;
//   background-color: #fff;
//   transition: transform 0.3s ease;
// }

// .apartment-card:hover {
//   transform: translateY(-5px);
// }

// .card-header {
//   height: 200px;
//   overflow: hidden;
// }

// .card-image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// .card-content {
//   padding: 20px;
// }

// .title {
//   font-size: 24px;
//   margin-bottom: 10px;
//   color: #333;
// }

// .description {
//   font-size: 16px;
//   margin-bottom: 15px;
//   color: #555;
// }

// .details {
//   display: flex;
//   flex-wrap: wrap;
//   margin-bottom: 10px;
// }

// .detail {
//   margin-right: 20px;
//   font-size: 14px;
//   color: #666;
// }

// .detail strong {
//   font-weight: bold;
// }

// .detail-button {
//   background-color: #ff8c00;
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 14px;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
// }

// .detail-button:hover {
//   background-color: #ff6b00;
// }</style>
