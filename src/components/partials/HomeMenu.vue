<script>
import Button from "./Button.vue";
export default {
  name: "HomeMenu",
  components: { Button },
};
</script>

<template>
  <div class="menu-container">
    <nav>
      <div class="brand">
        <a href="#">
          <img src="/src/assets/img/boolean-logo.png" alt="" />
        </a>
      </div>
      <ul class="menu-list">
        <router-link class="link-item" :to="{ name: '' }">Home</router-link>
        <router-link class="link-item" :to="{ name: '' }">Apartments</router-link>
        <router-link class="link-item" :to="{ name: '' }">About Us</router-link>
        <router-link class="link-item" :to="{ name: '' }">Contacts</router-link>
      </ul>
    </nav>
    <div class="cta">
      <Button :buttonText="'Login'" :buttonClass="'outline'" />
      <Button :buttonText="'Register'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  width: fit-content;
  background-color: #fff;
  padding: 8px;
  border-radius: 50px;
  display: flex;
  gap: 40px;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    .brand {
      width: 50px;
      padding: 8px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .menu-list {
      display: flex;
      list-style: none;
      gap: 20px;
      align-items: center;
      margin: 0;

      li {
        height: 100%;
      }

    }

    .link-item {
      text-decoration: none;
      color: black;

    }

  }

  .cta>*:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
