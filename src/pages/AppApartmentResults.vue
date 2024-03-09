<script>
// IMPORTS
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";
import { store } from "../store";
import axios from "axios";
// /IMPORTS

export default {
  components: { AdvancedSearch },
  data() {
    return {
      store,
      apartmentResults: [],
      loaderStatus: true,
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
      console.log('metto lo status a true');
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
          console.log("chiamata effettuata");
          this.apartmentResults = response.data;
          console.log(this.apartmentResults);
        }).finally(() => { this.loaderStatus = false; console.log('metto lo status a true'); })
    },

    // Funzione per visitare l'appartamento
    visitApartment(apartmentID) {
      this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
    },
  },
  mounted() {
    this.store.showHeader = true;
    this.getApartments();
  },
};
</script>

<template>

  <AdvancedSearch :addressProp="this.$route.params.address" />

  <div class="d-flex justify-content-center" v-if="loaderStatus">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="content" v-else>
    <div class="container" v-if="apartmentResults.length && loaderStatus === false">
      <h1 class="page-title">Apartment Results</h1>
      <div class="apartment-list">
        <div v-for="apartment in apartmentResults" :key="apartment.id" class="apartment-card">
          <div class="card-header">
            <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" class="card-image" alt="Apartment Image"
              v-if="apartment.images" />
            <img
              src="https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="card-image" alt="Apartment Image" v-else>
          </div>
          <div class="card-content">
            <h2 class="title">{{ apartment.title }}</h2>
            <p class="description">{{ apartment.description }}</p>
            <div class="details">
              <div class="detail"><strong>Rooms:</strong> {{ apartment.rooms }}</div>
              <div class="detail"><strong>Beds:</strong> {{ apartment.beds }}</div>
              <div class="detail">
                <strong>Bathrooms:</strong> {{ apartment.bathrooms }}
              </div>
              <div class="detail">
                <strong>Square Meters:</strong> {{ apartment.square_meters }}
              </div>
            </div>
            <button @click="visitApartment(apartment.id)" class="detail-button">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
    <h4 class="text-center" v-else>No apartment was found</h4>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.apartment-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

.apartment-card {
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease;
}

.apartment-card:hover {
  transform: translateY(-5px);
}

.card-header {
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.description {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

.details {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.detail {
  margin-right: 20px;
  font-size: 14px;
  color: #666;
}

.detail strong {
  font-weight: bold;
}

.detail-button {
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.detail-button:hover {
  background-color: #ff6b00;
}
</style>
