<script>
// IMPORTS



// /IMPORTS

export default {
  props: ['apartmentResults'],
  emits: ['headerToggle', 'search'],
  components: {},
  data() {
    return {

    }
  },
  methods: {},
  mounted() {
    console.log('pagina risultati montata')
  },
}
</script>

<template>
  <p>PostList</p>
  <h1 v-for="apartment in apartmentResults"> {{ apartment.title }}</h1>
</template>

<style lang="scss" scoped>
// USES



// /USES</style>
