<script>
export default {
  name: "ButtonToLink",
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
    textColorBS: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <a class="button" :class="buttonClass, textColorBS" :href="buttonRedirect">
    <i v-if="buttonIcon" class="icon"> {{ buttonIcon }}</i>
    <span class="p-0 m-0">{{ buttonText }}</span>

  </a>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;


.button {
  padding: 10px 24px;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  color: #1b1b1b;
  font-size: 14px;
}

.default {
  background-color: $acid-yellow;

  &:hover {
    transition: background-color 0.2s ease-in-out;
    background-color: $acid-yellow-hover;
  }
}

.outline {
  border: 1px solid $acid-yellow;
  background-color: #00000000;

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: $acid-yellow-hover;
    border: 1px solid $acid-yellow-hover;
    color: #222222 !important;
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
    border: 1px solid $acid-yellow-hover;
  }
}
</style>
