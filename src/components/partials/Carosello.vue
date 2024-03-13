<script>
import { store } from "../../store";
import 'vuetify/dist/vuetify.min.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VApp, VCarousel, VCarouselItem, VSheet } from '../../../node_modules/vuetify/lib/components';
import 'vuetify/dist/vuetify.min.css';

export default {
    data() {
        return {

            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
            store
        }
    },
    props: ['images']
}
</script>

<template>
    <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background class="carosello">
        <v-carousel-item v-for="(slide, i) in images" :key="i">
            <v-sheet height="100%">
                <div class="pic-container d-flex fill-height justify-center align-center">
                    <img :src="`${this.store.imagesAPI}${images[i]}`" alt="Apartment image" class="w-100">
                </div>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<style lang="scss" scoped>
.carosello {
    border-radius: 16px;
    overflow: hidden;

    .pic-container {
        width: 100%;
        height: 100%;

        img {
            object-fit: cover;
            height: 100%;
        }
    }
}
</style>
