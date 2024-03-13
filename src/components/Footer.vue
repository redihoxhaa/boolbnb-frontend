<script>
// IMPORTS



// /IMPORTS

export default {
  props: [],
  components: {},
  data() {
    return {

    }
  },
  methods: {},
  mounted() { },
}
</script>

<template>
  <footer>
    <div class="a container pt-5">
      <div class="row m-0 gap-5 justify-content-between">
        <div class="col-md-3">
          <img src="" alt="Logo">
          <p class="p-font my-4">At Luxor, we specialize in curating exquisite, luxury apartments for
            short-term rentals. Our mission is to provide discerning travelers with exceptional accommodations that
            combine elegance, comfort, and convenience. From stunning city penthouses to secluded beachfront villas, we
            strive to exceed our guests' expectations and create unforgettable experiences. Welcome to a world of luxury
            living with Luxor.</p>
          <div class="buttons d-flex gap-3 mb-5">


            <a class="btn custom-btn d-flex align-items-center gap-3" href="#"><img
                src="../assets/img/ion_logo-google-playstore.svg" alt="Playstore logo"><span>PlayStore</span></a>
            <a class="btn custom-btn d-flex align-items-center gap-3" href="#"><img src="../assets/img/vector.svg"
                alt="App Store Logo"><span>AppleStore</span> </a>
          </div>
        </div>
        <div class="col-md-2">
          <h5>Company </h5>
          <ul class="list-footer">
            <li><a class="nav-link" href="#">About us</a></li>
            <li><a class="nav-link" href="#">Legal Information</a></li>
            <li><a class="nav-link" href="#">Contact Us</a></li>
            <li><a class="nav-link" href="#">Blogs</a></li>
          </ul>

        </div>
        <div class="col-md-2">
          <h5>Help Center</h5>
          <ul class="list-footer">
            <li><a class="nav-link" href="#">Find a Property</a></li>
            <li><a class="nav-link" href="#">How To Host?</a></li>
            <li><a class="nav-link" href="#">Why Us?</a></li>
            <li><a class="nav-link" href="#">FAQs</a></li>
            <li><a class="nav-link" href="#">Rental Guides</a></li>
          </ul>
        </div>
        <div class="col-md-2">
          <h5>Contact Info</h5>
          <ul class="list-footer">
            <li><a class="nav-link" href="#">Phone: 02 456 9581</a></li>
            <li><a class="nav-link text-wrap" href="#">Email: info@luxor.com</a></li>
            <li><a class="nav-link" href="#">Location: Via Torino 45, Milan, Italy</a></li>
          </ul>
          <ul class="d-flex gap-4 align-items-center list-footer">
            <li><a class="nav-link" href="#"><img src="../assets/img/fb_icon.svg" alt="Facebook Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/twitter_icon.svg" alt="Twitter Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/insta_icon.svg" alt="Instagram Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/linkedin_icon.svg" alt="Linkedin Logo"> </a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="m-0">
    <div class="container d-flex justify-content-between py-4 align-items-center">

      <div class="left">© 2024 Luxor | All rights reserved</div>
      <div class="right">Created with love by <span>Team 1</span></div>

    </div>
  </footer>
</template>


<style lang="scss" scoped>
// USES
footer {
  background-color: #EFF0F2;

  span {
    font-weight: bold;
  }

  li {
    margin-bottom: 10px;

    a {
      color: #484848;
      font-size: 14px;

      &:hover {
        color: #7a7a7a;
      }

    }



  }

  h5 {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: #484848;
  }

  .p-font {
    font-size: 14px;
    color: #9A9A9A;
  }

  .list-footer {
    list-style: none;
    padding: 0;

    a {
      img {
        width: 25px;
      }
    }
  }



  .custom-btn {
    background-color: #E0E2E6;
    padding: 12px 25px;

    &:hover {
      background-color: #b4b4b4;
    }

    span {
      color: #484848;
      font-weight: 600;
    }
  }

  .buttons {
    a {
      img {
        width: 25px;
      }
    }
  }
}
</style>
