<script>
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";
import ApartmentCard from "../components/partials/ApartmentCard.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import { store } from "../store";
import axios from "axios";

export default {
  props: [],
  components: { AdvancedSearch, HomeMenu, ApartmentCard },
  data() {
    return {
      store,
      apartments: null,
      loaderStatus: true,
    };
  },
  methods: {
    // Funzione per ottenere tutti gli appartamenti
    getApartments() {
      axios.get(this.store.allApartmentsAPI).then((response) => {
        console.log(response.data)
        this.apartments = response.data.sponsored_apartments;
        this.apartments = this.apartments.concat(response.data.non_sponsored_apartments);
      });
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
  </div>


  <div class="d-flex justify-content-center mb-5 pb-5" v-if="loaderStatus && !apartments">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="container" v-else>
    <h1 class="page-title pb-5">All Apartments</h1>
    <div class="apartment-list row g-5">
      <div v-for="apartment in apartments" class="col-lg-3 col-md-4 col-sm-6">
        <ApartmentCard :apartment="apartment" />
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.apartment-list {}

.apartment-card {

  /* transition: transform 0.3s ease; */
}

.apartment-card:hover {
  /* transform: translateY(-5px); */
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