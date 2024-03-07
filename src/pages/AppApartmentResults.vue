<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
// /IMPORTS

export default {
  components: {},
  data() {
    return {
      store,
      apartmentResults: null,
    };
  },
  methods: {
    // Funzione per ricercare gli appartamenti
    getApartments() {
      axios
        .get(this.store.allApartmentsAPI + this.store.searchApartmentsURI, {
          params: {
            address: this.$route.params.address,
            rooms: this.$route.params.rooms,
            beds: this.$route.params.beds,
            radius: this.$route.params.radius,
          },
        })
        .then((response) => {
          console.log("chiamata effettuata");
          this.apartmentResults = response.data;
          console.log(this.apartmentResults);
        });
    },

    // Funzione per visitare l'appartamento
    visitApartment(apartmentID) {
      this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
    },
  },
  created() {
    this.store.showHeader = true;
    this.getApartments();
  },
};
</script>

<template>
  <div class="container" v-if="apartmentResults">
    <h1 class="page-title">Apartment Results</h1>
    <div class="apartment-list">
      <div v-for="apartment in apartmentResults" :key="apartment.id" class="apartment-card">
        <div class="card-header">
          <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" class="card-image" alt="Apartment Image"
            v-if="apartment.images" />
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
