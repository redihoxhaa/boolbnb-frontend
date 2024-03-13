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
    <div class="a container-fluid">
      <div class="row m-0 gap-5 justify-content-center">
        <div class="col-md-3">
          <img src="" alt="Logo">
          <p class="p-font my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, officia eligendi! Iste
            aut
            exercitationem
            molestias? Facere, quos aperiam. Voluptas a dicta rerum accusantium sunt modi libero impedit, adipisci
            repudiandae dolorem!</p>
          <button class="btn me-3"><a class="nav-link" href="#">i PlayStore</a></button>
          <button class="btn"><a class="nav-link" href="#">i AppleStore</a></button>
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
            <li><a class="nav-link" href="#">Phone: 1234567890</a></li>
            <li><a class="nav-link text-wrap" href="#">Email: bnb@email.com</a></li>
            <li><a class="nav-link" href="#">Location: 100 Smart Street, LA, USA</a></li>
          </ul>
          <ul class="d-flex gap-4 list-footer">
            <li><a class="nav-link" href="#">i</a></li>
            <li><a class="nav-link" href="#">i</a></li>
            <li><a class="nav-link" href="#">i</a></li>
            <li><a class="nav-link" href="#">i</a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="m-0">
    <div class="container-fluid d-flex justify-content-between px-5 py-4 align-items-center">

      <div class="left">© 2022 thecreation.design | All rights raserved</div>
      <div class="right">Created with love by <span>Team 1</span></div>

    </div>
  </footer>
</template>


<style lang="scss" scoped>
// USES
footer {
  background-color: #EFF0F2;
  max-width: 100%;


  .container-fluid {
    padding: 100px 0 150px 0;
  }

  span {
    font-weight: bold;
  }

  li {
    margin-bottom: 10px;

    a {
      color: #484848;
      font-size: 14px;

      &:hover {
        color: #C5E279;
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
  }



  button {
    background-color: #E0E2E6;
    padding: 12px 25px;

    &:hover {
      background-color: #b4b4b4;
    }

    a {
      color: #484848;
      font-weight: 800;
    }
  }


}


// /USES</style>
