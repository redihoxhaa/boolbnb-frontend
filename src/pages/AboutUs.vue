<script>
import HomeMenu from "../components/partials/HomeMenu.vue";
export default {
  components: { HomeMenu }
}
</script>

<template>

  <div class="custom-container mb-4 mt-4">
    <HomeMenu linkColorBS="text-black" navColor="navbar-light" />
  </div>

  <div class="custom-border">

    <div class="custom-container">
      <h1 class="page-title pt-4">About Us</h1>
      <div class="row g-3">

        <!-- Redi -->
        <div class="col-6 col-md-4 col-xxl-5  about-us-card h-100">

          <!-- Photo -->
          <div class="card-photo">
            <img class="img-fluid" src="../assets/img/redi_photo.jpg" alt="">
          </div>

          <!-- Info -->
          <div class="card-info">
            <h3>Redi Hoxha</h3>
            <span>Sesto San Giovanni, Lombardia</span>

            <!-- Social -->
            <ul class="list-unstyled d-flex">

              <!-- LinkedIn -->
              <li class="me-3">
                <a href="https://www.linkedin.com/in/redihoxha/" target="_blank">
                  <img class="about-us-icon linkedin-icon" src="../assets/img/linkedin_logo.svg" alt="GitHub">
                </a>
              </li>

              <!-- GitHub -->
              <li>
                <a href="https://github.com/redihoxhaa" target="_blank">
                  <img class="about-us-icon" src="../assets/img/github_logo.svg" alt="LinkedIn">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Vito -->
        <div class="col-6 col-md-4 col-xxl-5  about-us-card h-100">

          <!-- Photo -->
          <div class="card-photo">
            <img class="img-fluid" src="../assets/img/vito_photo.jpg" alt="">
          </div>

          <!-- Info -->
          <div class="card-info">
            <h3>Vito D'Urso Pettersson</h3>
            <span>Catania, Sicilia</span>

            <!-- Social -->
            <ul class="list-unstyled d-flex">

              <!-- LinkedIn -->
              <li class="me-3">
                <a href="https://www.linkedin.com/in/vitodursopettersson/" target="_blank">
                  <img class="about-us-icon linkedin-icon" src="../assets/img/linkedin_logo.svg" alt="GitHub">
                </a>
              </li>

              <!-- GitHub -->
              <li>
                <a href="https://github.com/vitodursopettersson" target="_blank">
                  <img class="about-us-icon" src="../assets/img/github_logo.svg" alt="LinkedIn">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Mirko -->
        <div class="col-6 col-md-4 col-xxl-5  about-us-card h-100">

          <!-- Photo -->
          <div class="card-photo">
            <img class="img-fluid" src="../assets/img/mirko_photo.jpg" alt="">
          </div>

          <!-- Info -->
          <div class="card-info">
            <h3>Mirko Cherchi</h3>
            <span>Roma, Lazio</span>

            <!-- Social -->
            <ul class="list-unstyled d-flex">

              <!-- LinkedIn -->
              <li class="me-3">
                <a href="https://www.linkedin.com/in/mirko-cherchi/" target="_blank">
                  <img class="about-us-icon linkedin-icon" src="../assets/img/linkedin_logo.svg" alt="GitHub">
                </a>
              </li>

              <!-- GitHub -->
              <li>
                <a href="https://github.com/MirkoCherchi" target="_blank">
                  <img class="about-us-icon" src="../assets/img/github_logo.svg" alt="LinkedIn">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Lorenzo -->
        <div class="col-6 col-md-4 col-xxl-5  about-us-card h-100">

          <!-- Photo -->
          <div class="card-photo">
            <img class="img-fluid" src="../assets/img/lorenzo_photo.jpg" alt="">
          </div>

          <!-- Info -->
          <div class="card-info">
            <h3>Lorenzo De Vito</h3>
            <span>Roma, Lazio</span>

            <!-- Social -->
            <ul class="list-unstyled d-flex">

              <!-- LinkedIn -->
              <li class="me-3">
                <a href="https://www.linkedin.com/in/lorenzo-devito/" target="_blank">
                  <img class="about-us-icon linkedin-icon" src="../assets/img/linkedin_logo.svg" alt="GitHub">
                </a>
              </li>

              <!-- GitHub -->
              <li>
                <a href="https://github.com/lordevito" target="_blank">
                  <img class="about-us-icon" src="../assets/img/github_logo.svg" alt="LinkedIn">
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Gaetano -->
        <div class="col-6 col-md-4 col-xxl-5  about-us-card h-100">

          <!-- Photo -->
          <div class="card-photo">
            <img class="img-fluid" src="../assets/img/gaetano_photo.jpg" alt="">
          </div>

          <!-- Info -->
          <div class="card-info">
            <h3>Gaetano Chiapparino</h3>
            <span>Bari, Puglia</span>

            <!-- Social -->
            <ul class="list-unstyled d-flex">

              <!-- LinkedIn -->
              <li class="me-3">
                <a href="https://www.linkedin.com/" target="_blank">
                  <img class="about-us-icon linkedin-icon" src="../assets/img/linkedin_logo.svg" alt="GitHub">
                </a>
              </li>

              <!-- GitHub -->
              <li>
                <a href="https://github.com/WebGCDev" target="_blank">
                  <img class="about-us-icon" src="../assets/img/github_logo.svg" alt="LinkedIn">
                </a>
              </li>
            </ul>
          </div>
        </div>



      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.card-photo {
  // aspect-ratio: 1;

  img {
    // height: 100%;
    object-fit: cover;
  }
}

.about-us-icon {
  width: 20px;
}

.linkedin-icon {
  width: 16px;
}

.custom-border {
  border-top: 1px solid #dddddd;
  padding-top: 20px;
}

.container {
  padding: 20px;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
}

.custom-container {
  padding: 0 10vw;
  margin-bottom: 40px;
}

.card-info {
  margin-top: 10px;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
  }

  span {
    font-size: 15px;
    font-weight: 300;
    display: inline-block;
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 992px) {
  .about-us-card {
    width: calc(100% / 5);
  }
}
</style>