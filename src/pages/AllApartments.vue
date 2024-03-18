<script>
import AdvancedSearch from "../components/partials/AdvancedSearch.vue";
import ApartmentCard from "../components/partials/ApartmentCard.vue";
import ApartmentCardSkeletonLoader from "../components/partials/ApartmentCardSkeletonLoader.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import { store } from "../store";
import axios from "axios";

export default {
  props: [],
  components: { AdvancedSearch, HomeMenu, ApartmentCard, ApartmentCardSkeletonLoader },
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
    document.title = 'MalHome - All Apartments';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getApartments();
  },
};
</script>

<template>

  <div class="custom-container mb-4 mt-4">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
  </div>


  <div class="custom-border">
    <div class="" v-if="loaderStatus && !apartments">
      <div class="custom-container">
        <h1 class="page-title pb-5 pt-4">All Apartments</h1>
        <div class="apartment-list row g-5">
          <div v-for="n in 10" class="col-custom-xxl col-xl-3 col-lg-4 col-md-4 col-sm-6">
            <ApartmentCardSkeletonLoader />
          </div>

        </div>
      </div>

    </div>

    <div class="custom-container" v-else>
      <h1 class="page-title pb-5 pt-4">All Apartments</h1>
      <div class="apartment-list row g-5">
        <div v-for="apartment in apartments" class="col-custom-xxl col-xl-3 col-lg-4 col-md-4 col-sm-6">
          <ApartmentCard :apartment="apartment" />
        </div>

      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.custom-border {
  border-top: 1px solid #dddddd;
  padding-top: 20px;
}

.spaceholder {
  height: 80vh;
}

.container {
  padding: 20px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.custom-container {
  padding: 0 10vw;
  margin-bottom: 40px;
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

@media screen and (min-width: 1800px) {
  .col-custom-xxl {
    width: 20% !important;
  }
}

@media screen and (min-width: 2000px) {
  .col-custom-xxl {
    width: 16.66666667% !important;
  }
}
</style>