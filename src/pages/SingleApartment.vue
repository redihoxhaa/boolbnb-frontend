<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
import MessageSender from "../components/partials/MessageSender.vue";
import ImageGrid from "../components/partials/ImageGrid.vue";
import Carosello from "../components/partials/Carosello.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";

// /IMPORTS

export default {
  props: [],
  components: { MessageSender, ImageGrid, Carosello, HomeMenu, AdvancedSearch },
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

    setTimeout(() => {
      this.registerVisit();
    }, 5000);
  }
};
</script>

<template>

  <div class="container">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
    <AdvancedSearch />
  </div>

  <div class="container mt-4" v-if="apartment">
    <!-- Immagini dell'appartamento -->
    <div class="mb-5 pb-5">
      <div v-if="apartment.images">
        <div class="d-none d-md-block">

          <ImageGrid :images="apartment.images.split(',')" />
        </div>

        <div class="d-block d-md-none">
          <Carosello :images="apartment.images.split(',')" />
        </div>

      </div>
      <div class="pic-container" v-else>
        <img src="../assets/img/apartment-default.webp" class="center" alt="Apartment Image" />
      </div>
    </div>
    <div class="row">
      <!-- Dettagli dell'appartamento -->
      <div class="col-md-8 mb-4 flex-grow-1">
        <div class="card b-none">
          <div class="card-body">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <div class="d-flex gap-3 p-5">
              <div class="bg-body-secondary rounded text-center box-sz">
                <div class="mt-5">
                  <div>icona letto</div>
                  <span>{{ apartment.rooms }} Rooms</span>
                </div>
              </div>
              <div class="bg-body-secondary rounded text-center box-sz">
                <div class="mt-5">
                  <div>icona letto</div>
                  <span>{{ apartment.beds }} Beds</span>
                </div>
              </div>
              <div class="bg-body-secondary rounded text-center box-sz">
                <div class="mt-5">
                  <div>icona letto</div>
                  <div>{{ apartment.bathrooms }} Bathrooms</div>
                </div>
              </div>
              <div class="bg-body-secondary rounded text-center box-sz">
                <div class="mt-5">
                  <div>icona letto</div>
                  <span>{{ apartment.square_meters }} Square Meters</span>
                </div>
              </div>
            </div>
            <h5>Apartment Description</h5>
            <p class="card-text">{{ apartment.description }}</p>
            <ul class="mt-3 p-0">
              <!-- <li class="list-group-item">Rooms: {{ apartment.rooms }}</li>
              <li class="list-group-item">Beds: {{ apartment.beds }}</li>
              <li class="list-group-item">Bathrooms: {{ apartment.bathrooms }}</li>
              <li class="list-group-item">Square Meters: {{ apartment.square_meters }}</li>
              <li class="list-group-item">Address: {{ apartment.address }}</li> -->
              <!-- SPONSORIZZAZIONE -->
              <li v-if="apartment.sponsorships && apartment.sponsorships.length > 0"
                class="list-group-item bg-info text-white">Sponsorship Package:
                {{ apartment.sponsorships[apartment.sponsorships.length - 1].package_name }}</li>
              <li v-if="apartment.services && apartment.services.length > 0" class="list-group-item">Services:
                <div class="mini-container">
                  <ul class="d-flex flex wrap justify-content-between text-center gap-8 row p-0">
                    <li v-for="service in apartment.services" :key="service.name" class="w-mx mt-2 p-2">
                      {{ service.name }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <h5>Location</h5>
          </div>
        </div>
      </div>
      <!-- Form per inviare un messaggio -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <MessageSender :apartmentID="apartment.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.container {
  padding: 20px;
}


.center {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}

.apartment-card {
  margin-top: 20px;
}

.mini-container {
  max-width: 400px;
}

.b-none {
  border-style: none;
}



.w-mx {
  max-width: 200px;
  list-style: none;
}

img {
  width: 100%;
}

.box-sz {
  height: 160px;
  width: 150px;
}

.pic-container {
  height: 500px;
  overflow: hidden;
  border-radius: 16px;
}
</style>../components/partials/Carosello.vue
