<script>

import ButtonToLink from "./ButtonToLink.vue";
export default {
  name: "HomeMenu",
  components: { ButtonToLink },
};
</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-dark d-flex gap-4">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarSupportedContent">
      <ul class="link-list d-flex gap-4 gap-sm-5 m-0 p-0">
        <li class="nav-item">
          <router-link class="link-item" :to="{ name: 'all-apartments' }">Apartments</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link-item " :to="{ name: '' }">About Us</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link-item " :to="{ name: '' }">Contacts</router-link>
        </li>


      </ul>
      <div class="buttons d-flex gap-3">
        <ButtonToLink :buttonText="'Login'" textColorBS="text-white" :buttonClass="'outline'"
          buttonRedirect="http://127.0.0.1:8000/login" />
        <ButtonToLink :buttonText="'Register'" buttonRedirect="http://127.0.0.1:8000/register" />
      </div>

    </div>

  </nav>

</template>

<style lang="scss" scoped>
img {
  width: 100%;
  object-fit: contain;
}

.link-list {
  list-style-type: none;

  .link-item {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 300;
  }
}

.navbar-toggler {
  border: none;
  box-shadow: none;

}

.show,
.collapsing {
  display: flex;
}

// X-Small devices (portrait phones, less than 576px)
@media only screen and (max-width: 575.98px) {
  .link-list {
    flex-direction: column;
    text-align: center;
  }

  .buttons {
    margin-top: 20px;
  }
}

// Small devices (landscape phones, less than 768px)
@media only screen and (max-width: 767.98px) {

  .show,
  .collapsing {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}



// Medium devices (tablets, less than 992px)
@media only screen and (max-width: 991.98px) {}
</style>
