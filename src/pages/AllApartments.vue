<template>
  <div class="container">
    <h1 class="page-title">Apartment List</h1>
    <ul class="apartment-list">
      <li v-for="apartment in apartments" :key="apartment.id" class="apartment-item">
        <div class="apartment-content" @click="visitApartment(apartment.id)">
          <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" class="card-image w-25"
            alt="Apartment Image" />
          <h2 class="title">{{ apartment.title }}</h2>
          <p class="description">{{ apartment.description }}</p>
          <div class="details">
            <div class="detail"><strong>Rooms:</strong> {{ apartment.rooms }}</div>
            <div class="detail"><strong>Beds:</strong> {{ apartment.beds }}</div>
            <div class="detail">
              <strong>Bathrooms:</strong> {{ apartment.bathrooms }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";

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

    visitApartment(apartmentID) {
      this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
    },
  },
  mounted() {
    this.getApartments();
    this.store.showHeader = true;
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
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
  list-style: none;
  padding: 0;
}

.apartment-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.apartment-content {
  padding: 20px;
}

.apartment-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.description {
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
}

.details {
  display: flex;
}

.detail {
  margin-right: 20px;
  font-size: 14px;
  color: #666;
}

.detail strong {
  font-weight: bold;
}
</style>
