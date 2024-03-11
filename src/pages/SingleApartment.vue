<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
import MessageSender from "../components/partials/MessageSender.vue";

// /IMPORTS

export default {
  props: [],
  components: { MessageSender },
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
  <div class="container" v-if="apartment">
    <MessageSender :apartmentID="apartment.id" />
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="apartment-card card">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title">{{ apartment.title }}</h5>
          </div>
          <div class="card-body">
            <div class="row mb-3" v-if="apartment.images">
              <div v-for="(image, index) in apartment.images.split(',')" :key="index" class="col-md-4">
                <img :src="`${this.store.imagesAPI}${image.trim()}`" class="img-fluid mb-2" alt="Apartment Image" />
              </div>
            </div>
            <img
              src="https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="card-image w-25" alt="Apartment Image" v-else>
            <p class="card-text">{{ apartment.description }}</p>
            <ul class="list-group list-group-flush mt-3">
              <li class="list-group-item">Rooms: {{ apartment.rooms }}</li>
              <li class="list-group-item">Beds: {{ apartment.beds }}</li>
              <li class="list-group-item">Bathrooms: {{ apartment.bathrooms }}</li>
              <li class="list-group-item">
                Square Meters: {{ apartment.square_meters }}
              </li>
              <li class="list-group-item">Address: {{ apartment.address }}</li>
              <li v-if="apartment.sponsorships && apartment.sponsorships.length > 0"
                class="list-group-item bg-info text-white">
                Sponsorship Package:
                {{
    apartment.sponsorships[apartment.sponsorships.length - 1].package_name
  }}
              </li>
              <li v-if="apartment.services && apartment.services.length > 0"
                class="list-group-item bg-success text-white">
                Services:
                <ul class="list-group">
                  <li v-for="service in apartment.services" :key="service.name" class="list-group-item">
                    {{ service.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apartment-card {
  margin-top: 20px;
}

.carousel-item {
  height: 300px;
  /* Imposta l'altezza delle immagini del carousel */
}
</style>

<style lang="scss" scoped>
// USES
.apartment-card {
  margin-bottom: 20px;
}

// /USES</style>
