<script>
import axios from "axios";
import { store } from "../store";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      apartment: null,
      store,
    };
  },

  mounted() {
    this.map = null;

    axios
      .get(this.store.allApartmentsAPI)
      .then(response => {
        this.apartment = response.data.results;

        if (this.apartment.lat && this.apartment.lon) {
          const latitude = parseFloat(this.apartment.lat);
          const longitude = parseFloat(this.apartment.lon);
          let center = [latitude, longitude];

          this.map = tt.map({
            key: "",
            container: "map",
            center: center,
          });

        } else {
          console.error(
            "I dati dell'appartamento non contengono latitudine e/o longitudine valide."
          );
        }
      })
      .catch(error => console.error(error));
  },
};
</script>

<template>
  <div class="tomtom">
    <div id="map" class="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
  border-radius: 11px;
}

.tomtom {
  height: 400px;
}

@media screen and (max-width:767px) {
  .map {
    height: 400px;
    width: 100%;
  }
}
</style>