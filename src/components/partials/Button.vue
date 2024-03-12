<script>
export default {
  name: "Button",
  props: {
    buttonRedirect: {
      default: "",
    },
    buttonText: {
      type: String,
      default: "Click me",
    },
    buttonClass: {
      type: String,
      default: "default",
    },
    buttonIcon: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <router-link class="button" :class="buttonClass" :to="{ name: buttonRedirect }">
    <i v-if="buttonIcon" class="icon"> {{ buttonIcon }}</i>
    {{ buttonText }}
  </router-link>
</template>

<style lang="scss" scoped>
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  color: #1b1b1b;
  font-size: 14px;
}

.default {
  background-color: #cef27f;

  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: #bfe373;
  }
}

.outline {
  border: 1px solid #cef27f;
  background-color: #00000000;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #bfe373;
    border: 1px solid #bfe373;
  }
}

.black {
  background-color: #222222;
  color: #fff;

  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: #1b1b1b;
  }
}

.black-outline {
  border: 1px solid #222222;
  background-color: #00000000;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #00000006;
    border: 1px solid #bfe373;
  }
}
</style>
