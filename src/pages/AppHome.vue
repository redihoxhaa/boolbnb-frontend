<script>
import HomeMenu from "../components/partials/HomeMenu.vue";
import HomeSearch from "../components/partials/HomeSearch.vue";
import SponsoredApartments from "../components/partials/SponsoredApartments.vue";
import { store } from "../store";
import ButtonToLink from "../components/partials/ButtonToLink.vue";

export default {
  name: "AppHome",
  props: [],
  components: { HomeMenu, HomeSearch, SponsoredApartments, ButtonToLink },
  data() {
    return {
      store,
    };
  },
  mounted() {
  },
  methods: {},
};
</script>

<template>
  <header class="p-4 p-sm-0">
    <div class="container d-flex flex-column justify-content-between ">
      <div class="home-top">
        <HomeMenu :textColorBSProp="'text-white'" linkColorBS="text-white" logoPath="src\assets\img\logo-white.svg"
          navColor="navbar-dark" />
      </div>
      <div class="home-bottom">
        <h1 class="main-title col-12 col-sm-8 col-md-9 col-lg-6">Redefining <span>tourist</span> lifestyles through our
          premium
          apartments
        </h1>
        <div class="home-search">
          <HomeSearch />
        </div>
        <div class="call-to-action fw-light pb-2 fs-5 col-9 col-md-7 col-lg-5 col-xl-4">Are you interested in
          listing your
          apartment
          to
          increase
          bookings?
        </div>
        <div class="mt-3 mb-5">
          <ButtonToLink :buttonText="'List your apartment'"
            :buttonRedirect="'http://127.0.0.1:8000/admin/apartments/create'" />

        </div>
        <img class="bosco-verticale" src="../assets/img/bosco-verticale.webp" alt="">
      </div>
    </div>
  </header>
  <SponsoredApartments />
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

header {
  background-image: url(/src/assets/img/cielo.webp);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow-x: hidden;

  .container {
    margin: 0 auto;
    padding-top: 10px;
    padding: 20px 0;
  }

  .main-title {
    color: #fff;
    font-size: 65px;
    line-height: 110%;
    margin-top: 105px;
    font-weight: 400;

    span {
      font-weight: bold;
      color: $acid-yellow;
    }
  }

  .call-to-action {
    color: white;
    margin-top: 160px;
  }
}

.bosco-verticale {
  position: absolute;
  right: -100px;
  bottom: 0;
  z-index: 1;
  max-height: 830px;
  pointer-events: none
}

.home-search {
  margin-top: 50px;
}

// X-Small devices (portrait phones, less than 576px)
@media only screen and (max-width: 515.98px) {
  .bosco-verticale {
    display: none;
  }
}


// X-Small devices (portrait phones, less than 576px)
@media only screen and (max-width: 575.98px) {
  .bosco-verticale {
    height: 700px;
    left: 380px !important;

  }
}

// Small devices (landscape phones, less than 768px)
@media only screen and (max-width: 767.98px) {
  header {
    .container {
      .main-title {
        font-size: 50px;
        margin-top: 50px;
      }

      .bosco-verticale {
        height: 800px;
        left: 410px;

      }
    }


  }


}



// Medium devices (tablets, less than 992px)
@media only screen and (max-width: 991.98px) {
  .bosco-verticale {
    height: 900px;
    left: 530px;
    right: 0;
  }
}

// Large devices (desktops, less than 1200px)
@media only screen and (max-width: 1199.98px) {
  .bosco-verticale {
    max-height: 950px;
    right: -300px;

  }
}

// X-Large devices (large desktops, less than 1400px)
@media only screen and (max-width: 1399.98px) {}
</style>
