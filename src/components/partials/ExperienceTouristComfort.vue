<script>
import Button from './Button.vue';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  props: [],
  components: { Button },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    const image = this.$refs.luxText;

    gsap.fromTo(
      image,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1, // Durata dell'animazione in secondi
        scrollTrigger: {
          trigger: image,
          start: "top 80%", // Inizia l'animazione quando il 20% superiore dell'immagine è visibile
          toggleActions: "play none none none" // Specifica come l'animazione deve essere riprodotta al trigger dello scroll
        }
      }
    );
  }
};
</script>

<template>
  <div class="container mb-16 pt-5">
    <div class="row">
      <div class="col-12 order-1 order-md-0 col-md-6">
        <img ref="luxImage" class="image-container" src="../../assets/img/luxury-tourist-home.png" alt="" />
      </div>
      <div class="col-12 col-md-6 mb-5 pb-5">
        <div ref="luxText" class="text-center text-md-start mb-3 d-flex flex-column justify-content-center h-100">
          <h6>DISCOVER A NEW WAY</h6>
          <h2>
            To Experience<br />
            Tourist Comfort
          </h2>
          <p class="pe-5">
            Experience ultimate luxury in our deluxe apartments where comfort
            meets sophistication for an unforgettable stay.
          </p>
          <div class="text-center text-md-start mt-4 mb-5 mt-md-5">
            <Button :buttonText="'Explore All'" buttonRedirect="all-apartments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  display: block;
}

// Small devices (landscape phones, 576px and up) LANDSCAPE PHONES
@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up) TABLETS
@media (min-width: 768px) {}

// Large devices (desktops, 992px and up) DESKTOPS
@media (min-width: 992px) {}

// X-Large devices (large desktops, 1200px and up) LARGE DESKTOPS
@media (min-width: 1200px) {}

// XX-Large devices (larger desktops, 1400px and up) LARGER DESKTOPS
@media (min-width: 1400px) {}
</style>
