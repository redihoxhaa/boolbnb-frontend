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
    registerVisit() {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      axios.post(this.store.sendVisitAPI, {
        apartment_id: this.apartment.id
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getApartment();
  },
  mounted() {
    this.store.showHeader = true;
    setTimeout(() => {
      this.registerVisit();
    }, 5000);
  }
};
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <!-- Dettagli dell'appartamento -->
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <!-- Immagini dell'appartamento -->
            <div class="mb-3">
              <div v-if="apartment.images" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div v-for="(image, index) in apartment.images.split(',')" :key="index"
                    :class="['carousel-item', index === 0 ? 'active' : '']">
                    <img :src="`${this.store.imagesAPI}${image.trim()}`" class="d-block w-100" alt="Apartment Image" />
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <img v-else
                src="https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="img-fluid mb-2" alt="Apartment Image" />
            </div>
            <p class="card-text">{{ apartment.description }}</p>
            <ul class="list-group list-group-flush mt-3">
              <li class="list-group-item">Rooms: {{ apartment.rooms }}</li>
              <li class="list-group-item">Beds: {{ apartment.beds }}</li>
              <li class="list-group-item">Bathrooms: {{ apartment.bathrooms }}</li>
              <li class="list-group-item">Square Meters: {{ apartment.square_meters }}</li>
              <li class="list-group-item">Address: {{ apartment.address }}</li>
              <li v-if="apartment.sponsorships && apartment.sponsorships.length > 0"
                class="list-group-item bg-info text-white">Sponsorship Package:
                {{ apartment.sponsorships[apartment.sponsorships.length - 1].package_name }}</li>
              <li v-if="apartment.services && apartment.services.length > 0"
                class="list-group-item bg-success text-white">Services:
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
      <!-- Form per inviare un messaggio -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <MessageSender :apartmentID="apartment.id" />
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

img {
  height: 400px;
  width: 100%;
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
