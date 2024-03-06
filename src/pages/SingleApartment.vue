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
  <div class="container" v-if="apartment">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="apartment-card card">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title">{{ apartment.title }}</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div v-for="(image, index) in apartment.images.split(',')" :key="index"
                      :class="{ 'carousel-item': true, active: index === 0 }">
                      <img :src="`${this.store.imagesAPI}${image.trim()}`" class="d-block w-100"
                        alt="Apartment Image" />
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
                <p class="card-text mt-3">{{ apartment.description }}</p>
              </div>
              <div class="col-md-6">
                <ul class="list-group list-group-flush">
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
    apartment.sponsorships[apartment.sponsorships.length - 1]
      .package_name
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
