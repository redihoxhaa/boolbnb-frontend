<script>

import ButtonToLink from "./ButtonToLink.vue";
export default {
  name: "HomeMenu",
  props: ['textColorBSProp', 'linkColorBS', 'logoPath', 'navColor'],
  components: { ButtonToLink },
};
</script>

<template>


  <nav class="navbar navbar-expand-lg d-flex gap-4" :class="navColor">
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <img :src="logoPath" alt="Luxor logo" class="logo" v-if="logoPath">
      <img src="../../assets/img/logo-black.svg" alt="Luxor logo" class="logo" v-else>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarSupportedContent">
      <ul class="link-list d-flex gap-4 gap-sm-5 m-0 p-0">
        <li class="nav-item">
          <router-link class="link-item" :class="linkColorBS" :to="{ name: 'home' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link-item" :class="linkColorBS" :to="{ name: 'all-apartments' }">Apartments</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link-item" :class="linkColorBS" :to="{ name: '' }">Contacts</router-link>
        </li>


      </ul>
      <div class="buttons d-flex gap-3">
        <ButtonToLink class="custom-font" :buttonText="'Login'" :textColorBS="textColorBSProp" :buttonClass="'outline'"
          buttonRedirect="http://127.0.0.1:8000/login" />
        <ButtonToLink class="custom-font" :buttonText="'Register'" buttonRedirect="http://127.0.0.1:8000/register"
          textColorBS="d-flex align-items-center" />
      </div>

    </div>

  </nav>

</template>

<style lang="scss" scoped>
img {
  width: 100%;
  object-fit: contain;
}

.logo {
  width: 40px;
}

.link-list {
  list-style-type: none;

  .link-item {
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
  }
}

.navbar-toggler {
  border: none;
  box-shadow: none;

}

.custom-font {
  font-size: 14px;
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
