<script>
import HomeMenu from "../components/partials/HomeMenu.vue";
import HomeSearch from "../components/partials/HomeSearch.vue";
import SponsoredApartments from "../components/partials/SponsoredApartments.vue";
import SponsoredApartmentsMobile from "../components/partials/SponsoredApartmentsMobile.vue";
import ExperienceTouristComfort from "../components/partials/ExperienceTouristComfort.vue";
import { store } from "../store";
import ButtonToLink from "../components/partials/ButtonToLink.vue";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default {
  name: "AppHome",
  props: [],
  components: { HomeMenu, HomeSearch, ButtonToLink, SponsoredApartments, SponsoredApartmentsMobile, ExperienceTouristComfort },
  data() {
    return {
      store,
      ScrollTrigger
    };
  },
  mounted() {
    document.title = 'MalHome - Homepage';
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.bosco-verticale', {
      duration: 1,
      x: '20%',
      y: '10%',
      scale: 0.8,
      ease: "power4.out",
    });
    const textContent = this.$refs.mainTitle;
    gsap.from(textContent, {
      duration: 1.5,
      opacity: 0,
      y: 20,
      stagger: 0.2,
      ease: "power3.out",
    });
  },
  methods: {},
};
</script>

<template>

  <!-- Header -->
  <header class="p-sm-0">
    <div class="custom-container mt-4">
      <HomeMenu :textColorBSProp="'text-white'" linkColorBS="text-white" logoPath="src\assets\img\logo-white.svg"
        navColor="navbar-dark" />
    </div>
    <div class="container d-flex flex-column justify-content-between">

      <!-- Above -->
      <div class="home-bottom">

        <!-- Main title -->
        <h1 ref="mainTitle" class="main-title col-12 col-sm-8 col-md-9 col-lg-6">Redefining <span>tourist</span>
          lifestyles through our
          premium apartments
        </h1>

        <!-- Home Search -->
        <div class="home-search">
          <HomeSearch />
        </div>

        <!-- Cta text-->
        <div class="call-to-action pb-5 fs-5 col-9 col-md-7 col-lg-5 col-xl-4">
          <span>
            Are you interested in listing your apartment to increase bookings?
          </span>
        </div>

        <!-- Cta Button -->
        <div class="mt-3 mb-5 pb-3">
          <ButtonToLink class="list-cta" :buttonText="'List your apartment'"
            :buttonRedirect="'http://127.0.0.1:8000/admin/apartments/create'" />
        </div>

        <!-- Background Image -->
        <img class="bosco-verticale" src="../assets/img/bosco-verticale.webp" alt="">

      </div>

    </div>

  </header>

  <!-- Sponsored Apartments -->
  <SponsoredApartments class="sponsored-desktop d-none" />
  <SponsoredApartmentsMobile class="d-md-none" />

  <!-- Experience Tourist Comfort -->
  <ExperienceTouristComfort class="pb-0 pb-md-5" />

</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.custom-container {
  padding: 0 10vw;
  margin-bottom: 40px;
}

header {
  background-image: url(/src/assets/img/cielo.webp);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow-x: hidden;

  .container {
    padding: 20px;
  }

  .main-title {
    color: #fff;
    font-size: 40px;
    line-height: 110%;
    margin-top: 0px;
    font-weight: 400;
    width: 80%;


    span {
      font-weight: bold;
      color: $acid-yellow;
    }
  }

  .call-to-action {
    color: white;
    margin-top: 140px;
    font-weight: 400;
  }
}

.list-cta {
  padding: 12px 28px;
}

.bosco-verticale {
  position: absolute;
  right: -550px;
  bottom: 0;
  z-index: 1;
  max-height: 760px;
  pointer-events: none
}

.home-search {
  margin-top: 50px;
}

// // Large devices (desktops, less than 1200px)
// @media only screen and (max-width: 1199.98px) {
//   .bosco-verticale {
//     max-height: 600px;
//     right: -180px;

//   }

//   .main-title {
//     font-size: 40px !important;
//   }

//   .call-to-action {
//     margin-top: 100px !important;
//   }
// }

// // Medium devices (tablets, less than 992px)
// @media only screen and (max-width: 991.98px) {


//   .bosco-verticale {
//     height: 800px;
//     left: 630px;
//     right: 0;
//   }

//   .main-title {
//     font-size: 30px !important;
//     margin-top: 40px;
//   }
// }

// // Small devices (landscape phones, less than 768px)
// @media only screen and (max-width: 767.98px) {
//   header {
//     .container {
//       .main-title {
//         font-size: 36px;
//         margin-top: 40px;
//       }

//       .bosco-verticale {
//         height: 500px;
//         left: 410px;

//       }
//     }

//     .call-to-action {
//       margin-top: 80px !important;
//     }

//   }
// }

// // X-Small devices (portrait phones, less than 576px)
// @media only screen and (max-width: 575.98px) {
//   .bosco-verticale {
//     height: 700px;
//     left: 380px !important;

//   }

//   .main-title {
//     font-size: 30px !important;
//     width: 70%;
//   }

//   .call-to-action {
//     margin-top: 80px !important;
//   }
// }

// // X-Small devices (portrait phones, less than 515px)
// @media only screen and (max-width: 515.98px) {
//   .main-title {
//     font-size: 25px !important;
//   }
// }

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
  .bosco-verticale {
    height: 730px;
    right: -420px;

  }

  .main-title {
    font-size: 55px;
    max-width: 75%;
    margin-top: 105px;
    padding-top: 60px;
  }
}

// Medium devices (tablets, 768px and up)
@media only screen and (min-width: 768px) {

  .bosco-verticale {
    right: -360px;
    max-height: 670px;
  }

  .sponsored-desktop {
    display: block !important;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .bosco-verticale {
    right: -240px;
    max-height: 660px;
  }

  .main-title {
    font-size: 55px;
    max-width: 70%;
  }
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .bosco-verticale {
    right: -100px;
    max-height: 640px;
  }

  .main-title {
    font-size: 55px;
    max-width: 60%;
  }
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
  .bosco-verticale {}

  .main-title {
    font-size: 55px;
    max-width: 50%;
  }
}
</style>
