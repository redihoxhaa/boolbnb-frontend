<script>
import { store } from "../../store";
import axios from "axios";

export default {
  name: "HomeSearch",
  data() {
    return {
      address: "",
      roomsCounter: 0,
      bedsCounter: 0,
      radiusCounter: 0,
      isDropdownOpen: false,
      suggestions: [],
      store,
    };
  },
  methods: {
    getAddresses() {
      if (this.address.trim() !== "") {
        axios
          .get(
            `https://api.tomtom.com/search/2/search/${encodeURIComponent(
              this.address.trim()
            )}.json?key=${this.store.tomTomAPIKey}`
          )
          .then((response) => {
            if (!response.data) {
              throw new Error("The research was unsuccessful");
            }
            this.suggestions = response.data.results ? response.data.results : [];
          })
          .catch((error) => console.error("Error:", error));
      } else {
        this.suggestions = [];
      }
    },
    selectAddress(suggestion) {
      this.address = suggestion.address.freeformAddress;
      this.suggestions = [];
    },
    searchApartment() {
      const apartmentQuery = {
        address: this.address,
        rooms: this.roomsCounter,
        beds: this.bedsCounter,
        radius: this.radiusCounter,
      };
      this.$emit("search", apartmentQuery);
    },
    increaseValue(counter) {
      if (counter === "radiusCounter") {
        this[counter] += 10;
      } else {
        this[counter]++;
      }
    },
    decreaseValue(counter) {
      if (this[counter] > 0) {
        if (counter === "radiusCounter") {
          this[counter] -= 10;
        } else {
          this[counter]--;
        }
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    preventClose(event) {
      event.stopPropagation();
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<template>
  <!-- Container -->
  <div class="search-container d-flex">
    <!-- Input container -->
    <div class="input-container" @click="preventClose">
      <!-- Address group -->
      <div class="address-group">
        <label for="address" class="">Location</label>
        <input type="text" id="address" v-model="address" placeholder="What are you dreaming of?"
          @input="getAddresses" />
        <ul id="suggestionsMenu" class="suggestions-menu" :class="{ 'd-none': !suggestions.length }">
          <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectAddress(suggestion)">
            {{ suggestion.address.freeformAddress }}
          </li>
        </ul>
      </div>

      <!-- Input group -->
      <div class="select-section" @click="toggleDropdown">
        <!-- Rooms -->
        <div class="select-group">
          <label for="rooms">Rooms</label>
          <input type="number" min="0" v-model="this.roomsCounter" id="rooms" />
        </div>

        <!-- Beds -->
        <div class="select-group">
          <label for="beds">Beds</label>
          <input type="number" min="0" v-model="this.bedsCounter" id="beds" />
        </div>

        <!-- Radius -->
        <div class="select-group">
          <label for="radius">Radius</label>
          <input type="number" min="0" step="10" v-model="this.radiusCounter" id="radius" />
        </div>

        <!-- Dropdown -->
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
            <span>Radius</span>
            <div class="dropdown-input-group">
              <button @click.stop="decreaseValue('radiusCounter')">-</button>
              <input type="text" v-model="this.radiusCounter" id="radius" class="dropdown-input" />
              <button @click.stop="increaseValue('radiusCounter')">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search button -->
    <div class="search-button-container">
      <button @click="searchApartment" @keyup.enter="searchApartment">
        <img src="/src/assets/img/search-icon.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 14px;
  max-width: 800px;
  display: flex;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #484848;
  }

  input {
    border: none;
    font-size: 14px;
    color: #c2c6cc;
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
      background-color: #f9f9f9;
      min-width: 280px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      padding: 16px 26px 12px;
      border-radius: 6px;
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
            border: 1px solid #bfe373;
            background: none;
            padding: 6px;
            display: inline-block;
            width: 28px;
            aspect-ratio: 1;
            border-radius: 50%;
            text-align: center;
            line-height: 50%;

            &:hover {
              background-color: #bfe373;
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

    button {
      background-color: #bfe373;
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
    border: 1px solid #ddd;
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 999;
  }

  .suggestions-menu li {
    padding: 8px 12px;
    cursor: pointer;
  }

  .suggestions-menu li:hover {
    background-color: #f9f9f9;
  }
}
</style>
