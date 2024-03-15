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
      radiusCounter: 0,
      isDropdownOpen: false,
      suggestions: [],
      services: [],
      store,
      apartmentResults: [],
      selectedServices: [],
      closeSuggestion: false,
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

    // Funzione per selezionare l'indirizzo suggerito
    selectAddress(suggestion) {
      this.address = suggestion.address.freeformAddress;
      this.suggestions = [];
    },

    // Funzione per ricercare gli appartamenti
    goToResults() {
      const params = {
        address: this.address,
        rooms: this.roomsCounter || 0, // Se non è selezionato alcun numero di stanze, impostalo a 0
        beds: this.bedsCounter || 0, // Se non è selezionato alcun numero di letti, impostalo a 0
        bathrooms: this.bathroomsCounter || 0, // Se non è selezionato alcun numero di bagni, impostalo a 0
        radius: this.radiusCounter || 5,
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
        params.radius = this.radiusCounter;
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

    // Funzione per incrementare contatore letti, camere e raggio
    increaseValue(counter) {
      this[counter]++;
    },

    // Funzione per decrementare contatore letti, camere, e raggio
    decreaseValue(counter) {
      if (this[counter] > 0) {
        this[counter]--;
      }
    },

    // Funzione per mostrare il dropdown
    toggleDropdown() {
      this.isDropdownOpen = true;
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
      } else {
        const index = this.selectedServices.indexOf(serviceID);
        if (index !== -1) {
          this.selectedServices.splice(index, 1);
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
    class="wrapper pe-5 d-flex justify-content-between flex-column flex-md-row gap-4 gap-md align-items-center align-items-md-start">
    <!-- Container -->
    <div class="search-container m-0 d-flex">
      <!-- Input container -->
      <div class="input-container" @click="preventClose">
        <!-- Address group -->
        <div class="address-group">
          <label for="address" class="">Location</label>
          <input type="text" id="address" v-model="address" placeholder="What are you dreaming of?"
            @input="getAddresses" />
          <ul id="suggestionsMenu" class="suggestions-menu"
            :class="{ 'd-none': !suggestions.length || closeSuggestion }">
            <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectAddress(suggestion)">
              {{ suggestion.address.freeformAddress }}
            </li>
          </ul>
        </div>

        <div class="dropdown-group border-bottom-0">
          <span>Radius</span>
          <div class="dropdown-input-group">
            <input type="range" class="form-range dropdown-input" min="0" max="50" step="1" id="radius"
              v-model="this.radiusCounter" />
          </div>
        </div>




        <!-- Search button -->
        <div class="search-button-container">
          <button @click="goToResults" @keyup.enter="goToResults">
            <img src="/src/assets/img/search-icon.svg" alt="" />
          </button>
        </div>
      </div>


      <!-- Modal -->
      <div class="modal fade" id="servicesModal" tabindex="-1" role="dialog" aria-labelledby="servicesModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">

            <!-- Input group -->
            <div class="select-section" @click="toggleDropdown">
              <div class="select-group">
                <label for="rooms">Rooms</label>
                <div class="d-flex justify-content-start">
                  <input type="number" min="0" v-model="this.roomsCounter" id="rooms" />
                  <span>+</span>
                </div>
              </div>

              <div class="select-group">
                <label for="beds">Beds</label>
                <div class="d-flex justify-content-start">
                  <input type="number" min="0" v-model="this.bedsCounter" id="beds" />
                  <span>+</span>
                </div>
              </div>

              <div class="select-group">
                <label for="beds">Bathrooms</label>
                <div class="d-flex justify-content-start">
                  <input type="number" min="0" v-model="this.bathroomsCounter" id="bathrooms" />
                  <span>+</span>
                </div>
              </div>

              <div class="select-group">
                <label for="radius">Radius</label>
                <div class="d-flex justify-content-start">
                  <input type="number" min="0" max="50" step="5" v-model="this.radiusCounter" id="radius" />
                  <span>km</span>
                </div>
              </div>

              <div class="dropdown-content" v-if="isDropdownOpen" @click="preventClose">
                <div class="dropdown-group">
                  <span>Rooms</span>
                  <div class="dropdown-input-group">
                    <button @click.stop="decreaseValue('roomsCounter')">-</button>
                    <input type="text" v-model="this.roomsCounter" id="rooms" class="dropdown-input" />
                    <button @click.stop="increaseValue('roomsCounter')">+</button>
                  </div>
                </div>
                <div class="dropdown-group">
                  <span>Beds</span>
                  <div class="dropdown-input-group">
                    <button @click.stop="decreaseValue('bedsCounter')">-</button>
                    <input type="text" v-model="this.bedsCounter" id="beds" class="dropdown-input" />
                    <button @click.stop="increaseValue('bedsCounter')">+</button>
                  </div>
                </div>
                <div class="dropdown-group">
                  <span>Bathrooms</span>
                  <div class="dropdown-input-group">
                    <button @click.stop="decreaseValue('bathroomsCounter')">
                      -
                    </button>
                    <input type="text" v-model="this.bathroomsCounter" id="bathrooms" class="dropdown-input" />
                    <button @click.stop="increaseValue('bathroomsCounter')">
                      +
                    </button>
                  </div>
                </div>


              </div>
            </div>

            <h5 class="text-center">Services</h5>
            <ul class="services container d-flex gap-3 text-center">
              <li class="service text-nowrap" :class="{ selected: selectedServices.includes(service.id) }"
                v-for="service in services" @click="addService(service.id)">
                {{ service.name }}
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>

    <!-- Filtri -->
    <div class="d-flex justify-content-between align-items-center">
      <button class="button-filters d-flex align-items-center gap-2" data-bs-toggle="modal"
        data-bs-target="#servicesModal">
        <div class="pic-service-container">

          <img src="/src/assets/img/instant_mix_white.svg" class="" alt="filters icon" />

        </div>
        <span class="p-0 m-0">Filters</span>
      </button>
    </div>


  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.wrapper {}

.search-container {
  position: relative;
  background-color: #fff;
  padding: 10px 20px;
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

  .input-container {
    flex-grow: 1;
    display: flex;

    .address-group {
      flex-grow: 1;
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

    .dropdown-content {
      position: absolute;
      background-color: #ffff;
      min-width: 280px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      padding: 16px 26px 12px;
      border-radius: 20px;
      z-index: 1;
      top: 68px;

      &>*:not(:last-child) {
        border-bottom: 1px solid #dddddd;
      }

      .dropdown-group {
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        span {
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .dropdown-input-group {
          .dropdown-input {
            width: 60px;
            background: none;
            padding: 4px 0;
            text-align: center;
            border-radius: 4px;
            margin: 16px 10px;
          }

          button {
            border: 1px solid $acid-yellow;
            background: none;
            padding: 6px;
            display: inline-block;
            width: 28px;
            aspect-ratio: 1;
            border-radius: 50%;
            text-align: center;
            line-height: 50%;

            &:hover {
              background-color: $acid-yellow;
              transition: background-color 0.2s ease-in-out;
            }
          }
        }
      }
    }
  }

  .search-button-container {
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

.services {
  list-style-type: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;

  .service {
    font-size: 14px;
    background-color: #f0f0f0;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  .selected {
    background-color: $acid-yellow;
  }
}

input[type='range'] {
  width: 100% !important;
  display: flex;
}

input[type='range']::-webkit-slider-thumb {
  background-color: var(--thumb-color, $acid-yellow);
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
}

input[type='number'] {
  width: 16px !important;
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

.range-disclaimer {
  font-size: 10px;
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: -8px;
  padding-right: 9px;
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
  padding: 8px 15px;
  font-size: 12px;

}

.pic-service-container {
  width: 12px;

  img {
    width: 100%;

  }
}
</style>
