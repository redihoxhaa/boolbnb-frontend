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
  <footer class="pt-5">
    <div class="a container py-5">
      <div
        class="row g-5 flex-column align-items-center text-center text-sm-start justify-content-center align-items-sm-start flex-sm-row justify-content-sm-between">
        <div class="col-md-4 col-lg-3">
          <div class="d-flex align-items-center justify-content-center justify-content-sm-start gap-3">
            <img class="logo" src="../assets/img/logo-footer.svg" alt="Logo">
            <img class="logo-text" src="../assets/img/malhome.svg" alt="Logo">
          </div>
          <p class="p-font my-4">
            MalHome is an online platform that allows users to book unique luxurious accommodations worldwide. Hosts can
            offer houses, apartments, while travelers can search and book the perfect
            lodging for their needs.</p>
          <div class="buttons d-flex gap-3 mb-5 mt-5 justify-content-center justify-content-sm-start">


            <a class="btn custom-btn d-flex align-items-center gap-3" href="#"><img src="../assets/img/boolean-logo.svg"
                alt="Boolean logo"><span class="d-none">PlayStore</span></a>
            <a class="btn custom-btn d-flex align-items-center gap-3" href="#"><img src="../assets/img/vector.svg"
                alt="App Store Logo"><span class="d-none">AppleStore</span> </a>
          </div>
        </div>
        <div class="col-md-3 col-lg-3">
          <h5>Team 1 </h5>
          <ul class="list-footer">
            <li><a class="nav-link" target="_blank" href="#">Gaetano Chiapparino</a></li>
            <li><a class="nav-link" target="_blank" href="https://www.linkedin.com/in/lorenzo-devito/">Lorenzo De Vito</a></li>
            <li><a class="nav-link" target="_blank" href="https://www.linkedin.com/in/mirko-cherchi/">Mirko Cherchi</a>
            </li>
            <li><a class="nav-link" target="_blank" href="https://www.linkedin.com/in/redihoxha/">Redi Hoxha</a></li>
            <li><a class="nav-link ver" target="_blank" href="https://www.linkedin.com/in/vitodursopettersson/">Vito
                D'Urso Pettersson</a>
            </li>
          </ul>

        </div>
        <div class="col-md-3 col-lg-3">
          <h5>Company </h5>
          <ul class="list-footer">
            <li><a class="nav-link" href="#">About us</a></li>
            <li><a class="nav-link" href="#">Legal Information</a></li>
            <li><a class="nav-link" href="#">Contact Us</a></li>
            <li><a class="nav-link" href="#">Blogs</a></li>
          </ul>
        </div>
        <div class="col-md-12 text-center text-md-start col-lg-3">
          <h5>Contact Info</h5>
          <ul class="list-footer mb-5 pb-1">
            <li><a class="nav-link" href="#">Phone: 02 456 9581</a></li>
            <li><a class="nav-link text-wrap" href="#">Email: info@malhome.com</a></li>
            <li><a class="nav-link" href="#">Location: Via Torino 45, Milan, Italy</a></li>
          </ul>
          <ul class="d-flex gap-4 justify-content-center justify-content-lg-start align-items-center list-footer">
            <li><a class="nav-link" href="#"><img src="../assets/img/fb_icon.svg" alt="Facebook Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/twitter_icon.svg" alt="Twitter Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/insta_icon.svg" alt="Instagram Logo"> </a></li>
            <li><a class="nav-link" href="#"><img src="../assets/img/linkedin_icon.svg" alt="Linkedin Logo"> </a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="m-0">
    <div
      class="container d-flex gap-3 text-center text-sm-start flex-column flex-sm-row justify-content-between py-5 align-items-center">

      <div class="left">© 2024 MalHome</div>
      <div class="right">Created with love by <span>team 1 classe #110</span></div>

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

  .logo {
    width: 40px;
  }

  .logo-text {
    width: 120px;
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
