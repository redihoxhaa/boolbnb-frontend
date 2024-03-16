<script>
import { store } from '../../store';
import axios from 'axios';

export default {
  name: 'HomeSearch',
  data() {
    return {
      address: '',
      roomsCounter: 0,
      bedsCounter: 0,
      radiusCounter: 0,
      isDropdownOpen: false,
      suggestions: [],
      store,
      apartmentResults: [],
      closeSuggestion: false,
    };
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
      this.$router.push({
        name: 'apartments-results',
        params: {
          address: this.address,
          // rooms: this.roomsCounter,
          // beds: this.bedsCounter,
          // radius: this.radiusCounter,
        },
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
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<template>
  <!-- Container -->

  <div class="search-container container-fluid d-flex">
    <!-- Input container -->
    <div class="input-container" @click="preventClose">
      <!-- Address group -->
      <div class="address-group">
        <label for="address" class="">Location</label>
        <input type="text" id="address" v-model="address" placeholder="What are you dreaming of?"
          @input="getAddresses" />
        <ul id="suggestionsMenu" class="suggestions-menu" :class="{ 'd-none': !suggestions.length || closeSuggestion }">
          <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectAddress(suggestion)">
            {{ suggestion.address.freeformAddress }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Search button -->
    <div class="search-button-container">
      <button @click="goToResults" @keyup.enter="goToResults">
        <img src="/src/assets/img/search-icon.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.search-container {
  z-index: 5;
  position: relative;
  background-color: #fff;
  padding: 12px 20px;
  margin: 0;
  border-radius: 14px;
  // min-width: 80%;
  max-width: 500px;
  display: flex;

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
      color: $placeholder;
    }
  }

  .input-container {
    flex-grow: 1;
    display: flex;

    .address-group {
      flex-grow: 1;

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
      // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      padding: 16px 26px 12px;
      border-radius: 20px;
      z-index: 5;
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
              background-color: $acid-yellow-hover;
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

      &:hover {
        background-color: $acid-yellow-hover;
        transition: background-color 0.2s ease-in-out;
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
    max-height: 130px;
    overflow-y: auto;
    z-index: 999;
    width: 100%;
    // box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
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
</style>
