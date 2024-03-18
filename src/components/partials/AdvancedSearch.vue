<script>
import { store } from '../../store';
import axios from 'axios';

export default {
  props: ['addressProp'],
  data() {
    return {
      address: '',
      roomsCounter: 0,
      bedsCounter: 0,
      bathroomsCounter: 0,
      radiusCounter: 1,
      isDropdownOpen: false,
      suggestions: [],
      services: [],
      store,
      modalShower: false,
      apartmentResults: [],
      selectedServices: [],
      closeSuggestion: false,
      selections: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
      selectedIndices: {
        rooms: 0,
        beds: 0,
        bathrooms: 0
      },
      filtersCounter: 0,
    };
  },
  created() {
    this.getServices();
  },
  methods: {
    // Funzione per ottenere gli indirizzi suggeriti
    getAddresses() {
      if (this.address.trim() !== '') {
        axios
          .get(
            `https://api.tomtom.com/search/2/search/${encodeURIComponent(
              this.address.trim()
            )}.json?key=${this.store.tomTomAPIKey}`
          )
          .then((response) => {
            if (!response.data) {
              throw new Error('The research was unsuccessful');
            }
            this.closeSuggestion = false;
            this.suggestions = response.data.results
              ? response.data.results
              : [];
          })
          .catch((error) => console.error('Error:', error));
      } else {
        this.suggestions = [];
      }
    },

    closeModal() {
      setTimeout(() => {
        this.$refs.closeModal.click();
      }, 100); // Ritardo di mezzo secondo (500 millisecondi)
    },

    // Funzione per selezionare l'indirizzo suggerito
    selectAddress(suggestion) {
      this.address = suggestion.address.freeformAddress;
      this.suggestions = [];
    },

    // Funzione per ricercare gli appartamenti
    goToResults() {

      this.isDropdownOpen = false;
      this.closeSuggestion = true;

      const params = {
        address: this.address,
        rooms: this.roomsCounter || 0, // Se non è selezionato alcun numero di stanze, impostalo a 0
        beds: this.bedsCounter || 0, // Se non è selezionato alcun numero di letti, impostalo a 0
        bathrooms: this.bathroomsCounter || 0, // Se non è selezionato alcun numero di bagni, impostalo a 0
        radius: this.radiusCounter || 1,
      };

      if (this.roomsCounter) {
        params.rooms = this.roomsCounter;
      }

      if (this.bedsCounter) {
        params.beds = this.bedsCounter;
      }

      if (this.bathroomsCounter) {
        params.bathrooms = this.bathroomsCounter;
      }

      if (this.radiusCounter) {
        if (this.radiusCounter > 50) {
          this.radiusCounter = 50;
          params.radius = this.radiusCounter;
        } else if (this.radiusCounter < 1) {
          this.radiusCounter = 1;
          params.radius = this.radiusCounter;
        } else {
          params.radius = this.radiusCounter;
        }
      }

      // Gestione dei servizi
      if (this.selectedServices.length > 0) {
        // Selezioni almeno un servizio, converti l'array di ID in una stringa separata da virgole
        params.services = this.selectedServices.join(',');
      }

      this.$router.push({
        name: 'apartments-results',
        params,
      });

    },

    // Funzione per ottenere i servizi
    getServices() {
      axios.get(this.store.allServicesAPI).then((response) => {
        this.services = response.data;
        // console.log(this.services)
      });
    },

    dumpFilters() {
      this.selectedServices = [];
      this.selectedIndices['rooms'] = 0;
      this.selectedIndices['beds'] = 0;
      this.selectedIndices['bathrooms'] = 0;
      this.roomsCounter = 1;
      this.bedsCounter = 1;
      this.bathroomsCounter = 1;
      this.filtersCounter = 0;
    },

    countFilters() {
      this.filtersCounter = this.selectedServices.length;

      if (this.selectedIndices.rooms > 0) {
        this.filtersCounter++;
      }

      if (this.selectedIndices.beds > 0) {
        this.filtersCounter++;
      }

      if (this.selectedIndices.bathrooms > 0) {
        this.filtersCounter++;
      }
    },

    setCounter(value, counter) {
      if (counter === 'rooms') {
        this.roomsCounter = value + 1;
      } else if (counter === 'beds') {
        this.bedsCounter = value + 1;
      } else if (counter === 'bathrooms') {
        this.bathroomsCounter = value + 1;
      }

      this.selectedIndices[counter] = value;
      this.countFilters();
    },


    dumpAddress() {
      this.address = "";
      this.closeSuggestion = true;
    },

    // Funzione per mostrare il dropdown
    toggleDropdown() {
      this.isDropdownOpen = true;
      this.closeSuggestion = true;
    },

    //Funzione per chiudere il dropdown
    closeDropdown() {
      this.isDropdownOpen = false;
      this.closeSuggestion = true;
    },

    // Funzione per evitare il click attraverso il dropdown
    preventClose(event) {
      event.stopPropagation();
    },

    // Funzione per selezionare i servizi
    addService(serviceID) {
      if (!this.selectedServices.includes(serviceID)) {
        this.selectedServices.push(serviceID);
        this.filtersCounter++;
      } else {
        const index = this.selectedServices.indexOf(serviceID);
        if (index !== -1) {
          this.selectedServices.splice(index, 1);
          this.filtersCounter--;
        }
      }
    },
  },
  mounted() {
    this.address = this.addressProp;
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<template>
  <div
    class="wrapper d-flex justify-content-between flex-column flex-sm-row gap-4 gap-md align-items-start align-items-md-start"
    ref="wrapper">
    <!-- Container -->
    <div class="search-container m-0 d-flex">

      <div class="dropdown-content" v-if="isDropdownOpen" @click="preventClose">
        <div class="dropdown-input-group d-flex flex-column">
          <input type="range" class="form-range dropdown-input" min="1" max="50" step="1" id="radius"
            v-model="this.radiusCounter" />
          <div class="km-infos d-flex justify-content-between">
            <div>1 km</div>
            <div>50 km</div>
          </div>
        </div>
      </div>


      <!-- Input container -->
      <div class="input-container" @click="preventClose">
        <!-- Address group -->
        <div class="address-group d-flex align-items-center justify-content-between">
          <div class="left-part flex-grow-1">

            <label for="address" class="pb-1">Location</label>
            <div class="d-flex">
              <input type="text" id="address" v-model="address" placeholder="What are you dreaming of?"
                @input="getAddresses" @click="closeDropdown" />
            </div>
            <ul id="suggestionsMenu" class="suggestions-menu"
              :class="{ 'd-none': !suggestions.length || closeSuggestion }">
              <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectAddress(suggestion)">
                {{ suggestion.address.freeformAddress }}
              </li>
            </ul>
          </div>
          <div class="right-part">
            <button class="x-button" @click="dumpAddress">
              <img src="../../assets/img/delete-icon.svg" alt="delete icon">
            </button>
          </div>
        </div>

        <div class="ps-3 m-0 dropdown-group d-flex flex-column justify-content-center border-bottom-0"
          @click="toggleDropdown">
          <label class=" pb-1">Radius</label>
          <div class="radius-group">

            <input type="number" min="0" max="50" id="radius" v-model="this.radiusCounter" />
            <span class="km-indicator">km</span>

          </div>
        </div>





        <!-- Search button -->
        <div class="search-button-container">
          <button @click="goToResults" @keyup.enter="goToResults" :disabled="this.address === ''">
            <img src="/src/assets/img/search-icon.svg" alt="search icon" />
          </button>
        </div>
      </div>


      <!-- Modal -->
      <div class="modal fade" id="servicesModal" tabindex="-1" role="dialog" aria-labelledby="servicesModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content d-flex flex-column align-items-center">

            <div
              class="pic-service-container-2 d-flex align-items-center justify-content-between gap-2 py-3 pe-1 fw-bold border-bottom w-100 ">
              <div class="col-1"></div>
              <div class="col-10 d-flex gap-2 justify-content-center"><img src="/src/assets/img/instant_mix.svg"
                  class="" alt="filters icon" />
                <span>Filters</span>

              </div>

              <div class="col-1"><button type="button" class="close" ref="closeModal" data-bs-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button></div>

            </div>

            <div class="d-flex flex-column mt-3 gap-3 list-unstyled w-100 px-5">

              <div class="d-flex gap-2 align-items-center">
                <img class="rooms-icon" src="../../assets/img/rooms_icon.svg" alt="rooms" />
                <span class="fw-bold">Rooms</span>
              </div>
              <div class="room-selection d-flex gap-2 justify-content-center">
                <div v-for="(number, index) in selections" class="selection-element"
                  :class="{ 'selected': index === selectedIndices['rooms'] }" @click="setCounter(index, 'rooms')">{{
        number }}</div>
              </div>

              <div class="d-flex gap-2 align-items-center">
                <img class="beds-icon" src="../../assets/img/beds_icon.svg" alt="beds" />
                <span class="fw-bold">Beds</span>
              </div>
              <div class="beds-selection d-flex gap-2 justify-content-center">
                <div v-for="(number, index) in selections" class="selection-element"
                  :class="{ 'selected': index === selectedIndices['beds'] }" @click="setCounter(index, 'beds')">
                  {{
        number }}</div>
              </div>

              <div class="d-flex gap-2 align-items-center">
                <img class="bathroom-icon" src="../../assets/img/bathrooms_icon.svg" alt="bathrooms" />
                <span class="fw-bold">Bathrooms</span>
              </div>
              <div class="bathrooms-selection d-flex gap-2 justify-content-center">
                <div v-for="(number, index) in selections" class="selection-element"
                  :class="{ 'selected': index === selectedIndices['bathrooms'] }"
                  @click="setCounter(index, 'bathrooms')">{{
        number }}</div>
              </div>

              <div class="d-flex gap-2 align-items-center">
                <img class="service-icon" src="../../assets/img/services_icon.svg" alt="services" />
                <span class="fw-bold">Services</span>
              </div>
              <div class="services-selection services d-flex flex-column gap-5 m-0 justify-content-start"
                v-if="services && services.length">
                <div class="room-services d-flex">
                  <div class="me-4 little-tag">Room</div>
                  <div class="services-list-category d-flex flex-wrap gap-2">
                    <div class="service" @click="addService(services[0].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[0].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[0].name }}
                    </div>
                    <div class="service" @click="addService(services[1].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[1].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[1].name }}
                    </div>
                    <div class="service" @click="addService(services[2].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[2].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[2].name }}
                    </div>
                    <div class="service" @click="addService(services[3].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[3].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[3].name }}
                    </div>
                    <div class="service" @click="addService(services[4].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[4].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[4].name }}
                    </div>
                  </div>
                </div>


                <div class="comfort-services d-flex">
                  <div class="me-4 little-tag">Comfort</div>
                  <div class="services-list-category d-flex flex-wrap gap-2">
                    <div class="service" @click="addService(services[5].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[5].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[5].name }}
                    </div>
                    <div class="service" @click="addService(services[6].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[6].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[6].name }}
                    </div>
                    <div class="service" @click="addService(services[7].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[7].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[7].name }}
                    </div>
                    <div class="service" @click="addService(services[8].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[8].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[8].name }}
                    </div>
                    <div class="service" @click="addService(services[9].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[9].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[9].name }}
                    </div>
                  </div>
                </div>

                <div class="service-services d-flex">
                  <div class="me-4 little-tag">Service</div>
                  <div class="services-list-category d-flex flex-wrap gap-2">
                    <div class="service" @click="addService(services[10].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[10].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[10].name }}
                    </div>
                    <div class="service" @click="addService(services[11].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[11].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[11].name }}
                    </div>
                    <div class="service" @click="addService(services[12].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[12].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[12].name }}
                    </div>
                    <div class="service" @click="addService(services[13].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[13].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[13].name }}
                    </div>
                    <div class="service" @click="addService(services[14].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[14].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[14].name }}
                    </div>
                    <div class="service" @click="addService(services[15].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[15].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[15].name }}
                    </div>
                    <div class="service" @click="addService(services[16].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[16].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[16].name }}
                    </div>
                    <div class="service" @click="addService(services[17].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[17].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[17].name }}
                    </div>
                  </div>
                </div>

                <div class="transport-services d-flex">
                  <div class="me-4 little-tag">Transport</div>
                  <div class="services-list-category d-flex flex-wrap gap-2">
                    <div class="service" @click="addService(services[18].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[18].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[18].name }}
                    </div>
                    <div class="service" @click="addService(services[19].id)">
                      <div class="ball" :class="{ 'selected-service': selectedServices.includes(services[19].id) }"><img
                          src="../../assets/img/white-check.svg" alt=""></div>{{ services[19].name }}
                    </div>
                  </div>
                </div>


              </div>
            </div>

            <div class="d-flex w-100 align-items-center  ms-auto mt-4">
              <button class="btn black-outline ms-4 mb-4" @click="dumpFilters">Reset Filters</button>
              <!-- Search button -->
              <div class="search-button-container-2 ms-auto pb-5 px-5" @click="closeModal">
                <button @click="goToResults" @keyup.enter="goToResults" :disabled="this.address === ''">
                  <img src=" /src/assets/img/search-icon.svg" alt="search icon" />
                </button>
              </div>

            </div>
          </div>


        </div>

      </div>

    </div>

    <!-- Filtri -->
    <div class=" position-relative d-flex justify-content-between align-items-center h-100" role="button">
      <button class="button-filters d-flex align-items-center h-100 gap-2" data-bs-toggle="modal"
        data-bs-target="#servicesModal">
        <div class="pic-service-container">

          <img src="/src/assets/img/instant_mix_white.svg" class="" alt="filters icon" />

        </div>
        <span class="p-0 m-0 filters-label">Filters</span>
        <span class="filters-counter" v-if="filtersCounter > 0">{{ filtersCounter }}</span>
      </button>
    </div>


  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.black-outline {
  border: 1px solid #222222;
  background-color: #00000000;
  font-size: 12px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #00000006;
  }
}

.selected {
  background-color: $our-black;
  color: white;
}

.selected-service {
  background-color: $our-black;
}

.services {
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;

  .service {
    font-size: 14px;
    border: 1px solid $placeholder;
    padding: 0px 8px 0 0;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

}

.ball {
  width: 16px;
  height: 16px;
  border: 1px solid $our-black;
  margin: 4px;
  border-radius: 50%;


  img {
    width: 80%;
    height: 80%;
    object-fit: cover;
    margin-bottom: 8px;
    margin-left: 1.5px;
  }
}

.little-tag {
  font-size: 14px;
  font-weight: 600;
  color: $our-black;
  min-width: 70px;
}

.selection-element {
  padding: 2px 8px;
  border: 1px solid $placeholder;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
}

.service-icon {
  width: 16px;
  margin-bottom: 2px;
}

.search-container {
  position: relative;
  background-color: #fff;
  padding: 10px 10px 10px 20px;
  width: 100%;
  border-radius: 12px;
  display: flex;
  margin-bottom: 50px;
  border: 1px solid #8d8d8d;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #484848;
  }

  .x-button {
    width: 10px;
    margin: 0 15px;
    cursor: pointer;
  }

  input {
    border: none;
    font-size: 14px;
    color: #000000;
    padding: 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      font-size: 14px;
      color: #c2c6cc;
    }
  }

  .radius-group {
    position: relative;

    .km-indicator {
      position: absolute;
      left: 20px;
      bottom: 0px;

    }
  }

  .input-container {
    flex-grow: 1;
    display: flex;

    .address-group {
      width: 60%;
      border-right: 1px solid $placeholder;

      input {
        width: 100%;
      }
    }

    .select-section {
      display: flex;
      position: relative;

      .select-group {
        position: relative;
        padding: 0 20px;
        border-left: 1px solid #dddddd;

        input {
          width: 50px;
          display: block;
        }
      }
    }

  }


  .dropdown-group {
    flex-grow: 1;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    background-color: #ffff;
    width: 40%;
    right: 0;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
    padding: 24px 26px 18px;
    border-radius: 10px;
    z-index: 200;
    top: 85px;


    left-0 &>*:not(:last-child) {
      border-bottom: 1px solid #dddddd;
    }


  }

  .km-infos {
    color: $our-black;
    font-size: 10px;
    padding-top: 5px;
  }

  .search-button-container {
    display: flex;
    align-items: center;
    padding-left: 5px;
    position: absolute;
    right: 10px;

    button {
      background-color: $acid-yellow;
      border: none;
      border-radius: 50%;
      aspect-ratio: 1;
      width: 50px;
      height: 50px;

      &:hover {
        background-color: $acid-yellow-hover;
      }

      img {
        width: 40%;
      }
    }
  }

  .search-button-container-2 {
    display: flex;
    align-items: center;
    padding-left: 5px;

    button {
      background-color: $acid-yellow;
      border: none;
      border-radius: 50%;
      aspect-ratio: 1;
      width: 50px;
      height: 50px;

      &:hover {
        background-color: $acid-yellow-hover;
      }

      img {
        width: 40%;
      }
    }
  }

  .suggestions-menu {
    position: absolute;
    background-color: white;
    list-style: none;
    padding: 10px;
    margin-top: 20px;
    left: 0;
    border-radius: 20px;
    max-height: 215px;
    overflow-y: auto;
    z-index: 999;
    width: 100%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }

  .suggestions-menu li {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
  }

  .suggestions-menu li:hover {
    background-color: #f9f9f9;
  }
}


input[type='range'] {
  width: 100% !important;
  display: flex;
}

input[type='range']::-webkit-slider-thumb {
  background-color: $acid-yellow;
  /* Colore del pallino */
  width: var(--thumb-size, 16px);
  /* Dimensioni del pallino */
  height: var(--thumb-size, 16px);
  /* Dimensioni del pallino */
  border: none;
  /* Rimuovi il bordo */
  border-radius: 50%;
  /* Imposta il bordo a forma di cerchio */
  -webkit-appearance: none;
  /* Nascondi il controllo predefinito di WebKit */
  appearance: none;
  /* Nascondi il controllo predefinito di WebKit */
  outline: none;
  box-shadow: none;
  border: none;
}

input[type='number'] {
  width: 18px !important;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

.button-filters {
  all: unset;
  border-radius: 8px;
  background-color: $our-black;
  color: white;
  padding: 12px 30px;
  font-size: 12px;
  order: 0;
  margin-top: -11px;


}

.filters-label {
  display: block;
}

.pic-service-container {
  width: 12px;

  img {
    width: 100%;

  }
}

.pic-service-container2 {
  width: 12px;

  img {
    width: 100%;

  }
}

.filters-counter {
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(40%, -40%);
  border-radius: 50%;
  background-color: white;
  border: 2px solid $our-black;
  color: black;
  font-size: 10px;
  font-weight: 800;
}

@media only screen and (min-width: 460px) {
  .selection-element {
    padding: 2px 12px;
  }
}

@media only screen and (min-width: 600px) {
  .filters-label {
    display: none;
  }

  .button-filters {
    all: unset;
    border-radius: 8px;
    background-color: $our-black;
    color: white;
    padding: 25px 25px;
    font-size: 12px;
    order: 0;
    margin-top: 0;

    &:hover {
      background-color: $our-black-hover;
    }
  }

  .selection-element {
    padding: 2px 14px;
  }


}

@media only screen and (min-width: 992px) {
  .button-filters {
    padding: 8px 15px;
    order: 1
  }

  .wrapper {
    padding-right: 20px;
  }

  .filters-label {
    display: block;
  }


}
</style>
