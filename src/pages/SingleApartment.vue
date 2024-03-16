<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
import MessageSender from "../components/partials/MessageSender.vue";
import ImageGrid from "../components/partials/ImageGrid.vue";
import Carosello from "../components/partials/Carosello.vue";
import HomeMenu from "../components/partials/HomeMenu.vue";
import Map from "../components/partials/Map.vue";
import { DateTime } from 'luxon';

// /IMPORTS

export default {
  props: [],
  components: { MessageSender, ImageGrid, Carosello, HomeMenu, Map },
  data() {
    return {
      store,
      apartment: null,
      user: null,
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
          document.title = 'MalHome - ' + this.apartment.title;
          this.getUser(response.data.user_id);
        });
    },
    registerVisit() {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      axios.post(this.store.sendVisitAPI, {
        apartment_id: this.apartment.id
      })
        .then(response => {

        })
        .catch(error => {
          console.error(error);
        });
    },
    getUser(id) {
      axios
        .get(this.store.userInfoAPI, {
          params: {
            user_id: id,
          },
        }).then(response => {
          this.user = response.data;
        })
    },
    showSponsoredTag(endDate) {
      const currentDate = DateTime.now();
      if (endDate > currentDate.toISODate()) {
        return true
      } else {
        return false
      }
    },

  },

  created() {
    this.getApartment();
  },
  mounted() {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      this.registerVisit();
    }, 5000);
  }
};
</script>

<template>

  <div class="custom-border">
    <div class="custom-container mb-4 mt-4">
      <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
    </div>
  </div>

  <div class="container mt-5" v-if="apartment">

    <!-- Immagini dell'appartamento -->
    <div class="mb-5 pb-5 images-grid">
      <div v-if="apartment.images">
        <div class="d-none d-md-block">

          <ImageGrid :images="apartment.images.split(',')" />
        </div>

        <div class="d-block d-md-none">
          <Carosello :images="apartment.images.split(',')" />
        </div>
      </div>

      <!-- Image Default Apartment -->
      <div class="pic-container" v-else>
        <img src="../assets/img/apartment-default.webp" class="center" alt="Apartment Image" />
      </div>

      <!-- Host Info Carousel-->
      <div class="user-info">
        <div class="user-pic">
          <img src="../assets/img/profile_default.jpg" alt="User Pic" v-if="!user.user_photo">
          <img :src="this.store.imagesAPI + user.user_photo" alt="User Pic" v-else>
        </div>
        <div class="user-name">
          <div class="user-tag">Host</div>
          <div>{{ user.name ? user.name : 'Nome Cognome' }}</div>
        </div>
      </div>

    </div>

    <!-- Dettagli dell'appartamento -->
    <div class="row g-5">

      <!-- Informazioni appartmaneto -->
      <div class="col-lg-8 mb-4 flex-grow-1">
        <div class="card b-none">

          <!-- Title -->
          <h5 class="card-title">{{ apartment.title }}</h5>

          <!-- Address -->
          <span class="card-address">{{ apartment.address }}</span>

          <!-- Icon Main Info -->
          <div class="mt-6 g-3 row">

            <!-- Rooms -->
            <div class="text-center col-6 col-md-6 col-lg-3">
              <div class="d-flex box text-center justify-content-center align-items-center ">
                <div class="d-flex flex-column">
                  <svg class="m-auto mb-4" width="30" height="30" viewBox="0 0 18 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.34652 15.6434V8.31058L0.938607 9.38607L0 8.13459L2.34652 6.3356V3.91086H3.91086V5.14278L8.6039 1.56434L17.2078 8.13459L16.2692 9.36651L14.8613 8.31058V15.6434H2.34652ZM3.91086 14.0791H7.82172V10.9504H9.38607V14.0791H13.2969V7.11777L8.6039 3.53933L3.91086 7.11777V14.0791ZM2.34652 3.12869C2.34652 2.47688 2.57465 1.92284 3.03092 1.46657C3.48719 1.01031 4.04122 0.782172 4.69303 0.782172C4.91465 0.782172 5.10042 0.707214 5.25033 0.557298C5.40025 0.407381 5.47521 0.221616 5.47521 0H7.03955C7.03955 0.65181 6.81142 1.20585 6.35515 1.66212C5.89888 2.11838 5.34484 2.34652 4.69303 2.34652C4.47142 2.34652 4.28565 2.42148 4.13574 2.57139C3.98582 2.72131 3.91086 2.90707 3.91086 3.12869H2.34652Z"
                      fill="black" />
                  </svg>

                  <span class="">{{ apartment.rooms }} Rooms</span>
                </div>
              </div>
            </div>

            <!-- Beds -->
            <div class="text-center col-6 col-md-6 col-lg-3">
              <div class="d-flex box text-center justify-content-center align-items-center ">
                <div class="d-flex flex-column">
                  <svg class="m-auto mb-4" width="30" height="30" viewBox="0 0 16 12" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 11.8615V7.16851C0 6.81653 0.0716991 6.49715 0.215097 6.21035C0.358496 5.92355 0.547521 5.66935 0.782172 5.44773V3.25765C0.782172 2.60584 1.01031 2.0518 1.46657 1.59553C1.92284 1.13927 2.47688 0.911133 3.12869 0.911133H6.25738C6.55721 0.911133 6.83749 0.966537 7.09821 1.07734C7.35894 1.18815 7.60011 1.34133 7.82172 1.53687C8.04334 1.34133 8.28451 1.18815 8.54523 1.07734C8.80596 0.966537 9.08624 0.911133 9.38607 0.911133H12.5148C13.1666 0.911133 13.7206 1.13927 14.1769 1.59553C14.6331 2.0518 14.8613 2.60584 14.8613 3.25765V5.44773C15.0959 5.66935 15.285 5.92355 15.4284 6.21035C15.5717 6.49715 15.6434 6.81653 15.6434 7.16851V11.8615H14.0791V10.2972H1.56434V11.8615H0ZM8.6039 4.82199H13.2969V3.25765C13.2969 3.03603 13.222 2.85027 13.0721 2.70035C12.9221 2.55044 12.7364 2.47548 12.5148 2.47548H9.38607C9.16445 2.47548 8.97869 2.55044 8.82877 2.70035C8.67885 2.85027 8.6039 3.03603 8.6039 3.25765V4.82199ZM2.34652 4.82199H7.03955V3.25765C7.03955 3.03603 6.96459 2.85027 6.81468 2.70035C6.66476 2.55044 6.47899 2.47548 6.25738 2.47548H3.12869C2.90707 2.47548 2.72131 2.55044 2.57139 2.70035C2.42148 2.85027 2.34652 3.03603 2.34652 3.25765V4.82199ZM1.56434 8.73286H14.0791V7.16851C14.0791 6.9469 14.0041 6.76113 13.8542 6.61121C13.7043 6.4613 13.5185 6.38634 13.2969 6.38634H2.34652C2.1249 6.38634 1.93914 6.4613 1.78922 6.61121C1.6393 6.76113 1.56434 6.9469 1.56434 7.16851V8.73286Z"
                      fill="black" />
                  </svg>
                  <span class="">{{ apartment.beds }} Beds</span>
                </div>
              </div>
            </div>

            <!-- Bathrooms -->
            <div class="text-center col-6 col-md-6 col-lg-3">
              <div class="d-flex box text-center justify-content-center align-items-center ">
                <div class="d-flex flex-column">
                  <svg class="m-auto mb-4" width="30" height="30" viewBox="0 0 16 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.91086 5.60411C3.48067 5.60411 3.11239 5.45094 2.80604 5.14459C2.49969 4.83824 2.34652 4.46996 2.34652 4.03977C2.34652 3.60957 2.49969 3.2413 2.80604 2.93495C3.11239 2.6286 3.48067 2.47542 3.91086 2.47542C4.34106 2.47542 4.70933 2.6286 5.01568 2.93495C5.32203 3.2413 5.47521 3.60957 5.47521 4.03977C5.47521 4.46996 5.32203 4.83824 5.01568 5.14459C4.70933 5.45094 4.34106 5.60411 3.91086 5.60411ZM2.34652 15.7724C2.1249 15.7724 1.93914 15.6974 1.78922 15.5475C1.6393 15.3976 1.56434 15.2118 1.56434 14.9902C1.13415 14.9902 0.765877 14.837 0.459526 14.5307C0.153175 14.2243 0 13.856 0 13.4258V8.7328H2.34652V8.14617C2.34652 7.6508 2.51599 7.23364 2.85493 6.8947C3.19387 6.55576 3.61103 6.38629 4.10641 6.38629C4.36713 6.38629 4.6083 6.43843 4.82991 6.54272C5.05153 6.64701 5.25359 6.79041 5.4361 6.97291L6.53114 8.18528C6.63543 8.28957 6.73646 8.38734 6.83423 8.4786C6.932 8.56985 7.03955 8.65459 7.15688 8.7328H12.5148V2.3581C12.5148 2.17559 12.4496 2.01916 12.3192 1.88879C12.1889 1.75843 12.0324 1.69325 11.8499 1.69325C11.7717 1.69325 11.6967 1.70955 11.625 1.74214C11.5533 1.77473 11.4849 1.82361 11.4197 1.88879L10.442 2.86651C10.5072 3.08813 10.5202 3.30648 10.4811 3.52158C10.442 3.73668 10.3638 3.93548 10.2465 4.11799L8.09548 1.9279C8.27799 1.81058 8.47353 1.73562 8.68211 1.70303C8.89069 1.67044 9.09927 1.69325 9.30785 1.77147L10.2856 0.793753C10.4941 0.585173 10.7321 0.422221 10.9993 0.304895C11.2665 0.187569 11.5501 0.128906 11.8499 0.128906C12.4756 0.128906 13.0036 0.344004 13.4338 0.774198C13.864 1.20439 14.0791 1.73236 14.0791 2.3581V8.7328H15.6434V13.4258C15.6434 13.856 15.4903 14.2243 15.1839 14.5307C14.8776 14.837 14.5093 14.9902 14.0791 14.9902C14.0791 15.2118 14.0041 15.3976 13.8542 15.5475C13.7043 15.6974 13.5185 15.7724 13.2969 15.7724H2.34652ZM1.56434 13.4258H14.0791V10.2971H1.56434V13.4258Z"
                      fill="#1C1B1F" />
                  </svg>
                  <span class="">{{ apartment.bathrooms }} Bathroom</span>
                </div>
              </div>
            </div>

            <!-- Square Meters -->
            <div class="text-center col-6 col-md-6 col-lg-3">
              <div class="d-flex box text-center justify-content-center align-items-center ">
                <div class="d-flex flex-column">
                  <svg class="m-auto mb-2" width="40" height="40" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g mask="url(#mask0_453_1503)">
                      <path
                        d="M3 13.5C2.5875 13.5 2.23438 13.3531 1.94063 13.0594C1.64688 12.7656 1.5 12.4125 1.5 12V6C1.5 5.5875 1.64688 5.23438 1.94063 4.94063C2.23438 4.64688 2.5875 4.5 3 4.5H15C15.4125 4.5 15.7656 4.64688 16.0594 4.94063C16.3531 5.23438 16.5 5.5875 16.5 6V12C16.5 12.4125 16.3531 12.7656 16.0594 13.0594C15.7656 13.3531 15.4125 13.5 15 13.5H3ZM3 12H15V6H12.75V9H11.25V6H9.75V9H8.25V6H6.75V9H5.25V6H3V12Z"
                        fill="#1C1B1F" />
                    </g>
                  </svg>

                  <span class="">{{ apartment.square_meters }} Square Meters</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Description -->
          <div>
            <h5 class="info-section-title">Description</h5>
            <p class="card-text me-10">{{ apartment.description }}</p>
          </div>

          <!-- Servizi -->
          <li v-if="apartment.services && apartment.services.length > 0" class="list-group-item">
            <h5 class="info-section-title">Services</h5>
            <div>
              <ul class="list-service">
                <li v-for="service in apartment.services">
                  <img v-if="service.name == 'Private Bathroom'" class="service-icon"
                    src="../assets/img/bathrooms_icon.svg" alt="">
                  <img v-if="service.name == 'Wifi'" class="service-icon" src="../assets/img/wifi_icon.svg" alt="">
                  <img v-if="service.name == 'Parking'" class="service-icon" src="../assets/img/parking_icon.svg"
                    alt="">
                  <img v-if="service.name == 'Breakfast included'" class="service-icon"
                    src="../assets/img/breakfast_icon.svg" alt="">
                  <img v-if="service.name == 'Swimming Pool'" class="service-icon"
                    src="../assets/img/swimmingpool_icon.svg" alt="">
                  <img v-if="service.name == 'Cable TV'" class="service-icon" src="../assets/img/tv_icon.svg" alt="">
                  <img v-if="service.name == 'Air Conditioning'" class="service-icon"
                    src="../assets/img/air_conditioning_icon.svg" alt="">
                  <img v-if="service.name == 'Heating'" class="service-icon" src="../assets/img/heating_icon.svg"
                    alt="">
                  <img v-if="service.name == 'Gym'" class="service-icon" src="../assets/img/gym_icon.svg" alt="">
                  <img v-if="service.name == 'Pets Allowed'" class="service-icon" src="../assets/img/pets_icon.svg"
                    alt="">
                  <img v-if="service.name == 'Room Service'" class="service-icon"
                    src="../assets/img/room_service_icon.svg" alt="">
                  <img v-if="service.name == 'Laundry Service'" class="service-icon"
                    src="../assets/img/laundry_icon.svg" alt="">
                  <img v-if="service.name == 'Concierge'" class="service-icon" src="../assets/img/concierge_icon.svg"
                    alt="">
                  <img v-if="service.name == 'Meeting Facilities'" class="service-icon"
                    src="../assets/img/meeting_icon.svg" alt="">
                  <img v-if="service.name == 'Airport Shuttle'" class="service-icon"
                    src="../assets/img/airport_shuttle_icon.svg" alt="">
                  <img v-if="service.name == '24-hour Front Desk'" class="service-icon"
                    src="../assets/img/front_desk_icon.svg" alt="">
                  <img v-if="service.name == 'Restaurant'" class="service-icon" src="../assets/img/restaurant_icon.svg"
                    alt="">
                  <img v-if="service.name == 'Bar/Lounge'" class="service-icon" src="../assets/img/bar_icon.svg" alt="">
                  <img v-if="service.name == 'Business Center'" class="service-icon"
                    src="../assets/img/business_icon.svg" alt="">
                  <img v-if="service.name == 'Childcare Services'" class="service-icon"
                    src="../assets/img/childcare_icon.svg" alt="">
                  <span>{{ service.name }}</span>
                </li>
              </ul>
            </div>
          </li>

          <!-- Location -->
          <div>
            <h5 class="info-section-title">Location</h5>
            <Map :apartment="apartment" />
          </div>

        </div>

      </div>

      <!-- Form contatti -->
      <div class="col-lg-4 sticky-container mt-0 mt-lg-5 mb-5 mb-lg-0">

        <div class="form-sticky mb-5">

          <!-- Form -->
          <MessageSender :apartmentID="apartment.id" />

          <!-- Sponsor -->
          <div class="sponsor-alert"
            v-if="apartment.sponsorships && apartment.sponsorships.length > 0 && showSponsoredTag(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_date)">
            <div class="sponsor-alert-image">
              <img src="../assets/img/diamond_sponsored_icon.svg" alt="">
            </div>
            <div class="sponsor-alert-text">
              <h6>Sponsored Apartment</h6>
              <p>the apartment appeared among the first results because it was sponsored.</p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="container" v-else>
    <div class="image-holder skeleton-loader my-5">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.custom-container {
  padding: 0 10vw;
  margin-bottom: 40px;
}

.custom-border {
  border-bottom: 1px solid #dddddd;
}

.box {
  background-color: rgb(231, 231, 231);
  height: 150px;
  border-radius: 12px;
}

.image-holder {
  height: 400px;
  background-color: gray;
  border-radius: 18px;
  margin-bottom: 100vh;
}

.skeleton-loader {
  background: linear-gradient(to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%),
    lightgray;
  background-repeat: repeat-y;
  background-size: 300px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}

@keyframes shine {
  to {
    background-position: 100% 0,
      0 0;
  }
}

.name-holder {
  width: 20px;
  height: 14px;
  background-color: grey;
}

.container {
  padding: 8px 20px;
}

.center {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  height: 100%;
  object-fit: cover;
}

.apartment-card {
  margin-top: 20px;
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

.card-title {
  font-size: 25px;
  font-weight: 400;
}

.card-address {
  font-size: 16px;
  font-weight: 400;
}

.apartment-icon {
  width: 20px;
}

.images-grid {
  position: relative;
}

.user-info {
  position: absolute;
  display: flex;
  gap: 16px;
  align-items: center;
  left: 30px;
  bottom: 70px;
  color: white;
  font-weight: 500;
  font-size: 20px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.400);

  .user-tag {
    font-size: 12px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.400);
    font-weight: 700;
    line-height: 8px;
  }
}

.user-pic {
  border-radius: 50%;
  overflow: hidden;
  width: 70px;
  height: 70px;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.400);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.list-service {
  list-style: none;
  padding: 0;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  row-gap: 20px;
  padding-right: 40px;

  span {
    vertical-align: middle;
  }
}

.service-icon {
  width: 20px;
  margin-right: 6px;
}

.info-section-title {
  margin-top: 40px;
  margin-bottom: 20px;
}

.sponsor-alert {
  margin-top: 20px;
  border: 1px solid #dddddd;
  border-radius: 16px;
  display: flex;
  padding: 20px 20px 10px 10px;

  .sponsor-alert-image {
    margin-right: 14px;
  }

  img {
    width: 40px;
    padding: 2px;
  }

  .sponsor-alert-text {

    h6 {
      font-size: 14px;
      font-weight: 600;
    }

    p {
      font-size: 11px;
    }
  }

}

.sticky-container {
  position: relative;
}

.form-sticky {
  position: sticky;
  top: 20px;
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .user-info {
    left: 30px;
    bottom: 55px;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 960px) {
  .image-holder {
    height: 500px;
  }

  .skeleton-loader {
    background: linear-gradient(to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%),
      lightgray;
    background-repeat: repeat-y;
    background-size: 500px 500px;
    background-position: 0 0;
    animation: shine 1s infinite;
  }

  @keyframes shine {
    to {
      background-position: 100% 0,
        0 0;
    }
  }

  .user-info {
    position: unset;
    margin-top: 20px;
    display: flex;
    gap: 16px;
    align-items: center;
    color: $our-black;
    font-weight: 500;
    font-size: 18px;
    text-shadow: unset;

    .user-tag {
      font-size: 12px;
      text-shadow: unset;
      font-weight: 800;
      line-height: 8px;
    }
  }

  .user-pic {
    border-radius: 50%;
    overflow: hidden;
    width: 70px;
    height: 70px;

    box-shadow: unset;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {}
</style>
