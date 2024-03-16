<script>
import { store } from '../../store';
import axios from 'axios';
import ApartmentCard from './ApartmentCard.vue';
import Button from './Button.vue';

export default {
  props: [],
  components: { ApartmentCard, Button },
  data() {
    return {
      store,
      apartments: null,
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    // Funzione per ottenere tutti gli appartamenti

    getSponsoredApartments() {
      axios
        .get(this.store.allApartmentsAPI + this.store.sponsoredApartmentsURI)
        .then((response) => {
          this.apartments = response.data;
        });
    },

    // Funzione per visitare l'appartamento

    visitApartment(apartmentID) {
      this.$router.push({
        name: 'single-apartment',
        params: { id: apartmentID },
      });
    },
    startDragging(event) {
      this.isDragging = true;
      this.startX = event.pageX - this.$refs.scrollContainer.offsetLeft;
      this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
    },

    stopDragging() {
      this.isDragging = false;
    },

    dragging(event) {
      if (!this.isDragging) return;
      const x = event.pageX - this.$refs.scrollContainer.offsetLeft;
      const walk = (x - this.startX) * 2; // Adjust scrolling speed
      this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
    },
  },
  mounted() {
    this.getSponsoredApartments();
  },
};
</script>

<template>
  <section class="mt-5 p-4 pt-5 p-sm-0" id="sponsored-apartments" v-if="apartments && apartments.length">
    <div class="container d-md-flex gap-md-5">
      <div class="header text-center text-md-start mt-5 mb-3">
        <h6>EXPLORE OUR</h6>
        <h2>
          <div class="fw-bold">Sponsored</div>
          Premium Apartments
        </h2>
        <div class="text-center text-md-start mt-4 pb-5 mb-5 mt-md-5">
          <Button :buttonText="'Explore All'" buttonRedirect="all-apartments" />
        </div>
      </div>
      <div class="scrolling-container mb-5 pb-4 d-flex gap-4 user-select-none" ref="scrollContainer"
        @mousedown="startDragging" @mouseup="stopDragging" @mousemove="dragging">
        <ApartmentCard v-for="apartment in apartments" :apartment="apartment" class="house-card" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  .scrolling-container {
    display: flex;
    flex-direction: column;
  }

  .scroll-snap {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
}

::-webkit-scrollbar {
  width: 7px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: radial-gradient(circle,
      rgba(40, 40, 40, 0.1) 50%,
      rgba(252, 176, 69, 0) 100%);
  border-radius: 10px;
}

#sponsored-apartments {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

// Small devices (landscape phones, 576px and up)

@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up)

@media (min-width: 768px) {
  .scrolling-container {
    overflow-x: scroll;
    flex-direction: row !important;
    scroll-snap-type: x mandatory;

    .house-card {
      width: 220px;
    }
  }

  #sponsored-apartments {
    margin-top: 100px !important;
    margin-bottom: 100px !important;
  }
}

// Large devices (desktops, 992px and up)

@media (min-width: 992px) {
  .scrolling-container {
    .house-card {
      width: 212px;
    }
  }
}

// X-Large devices (large desktops, 1200px and up)

@media (min-width: 1200px) {
  .scrolling-container {
    .house-card {
      width: 190px;
    }
  }
}

// XX-Large devices (larger desktops, 1400px and up)

@media (min-width: 1400px) {
  .scrolling-container {
    .house-card {
      width: 230px;
    }
  }
}
</style>
