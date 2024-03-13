<script>
import { store } from "../../store";
import axios from "axios";
import ApartmentCard from "./ApartmentCard.vue";
import Button from "./Button.vue";

export default {
    props: [],
    components: { ApartmentCard, Button },
    data() {
        return {
            store,
            apartments: null,
        };
    },
    methods: {
        // Funzione per ottenere tutti gli appartamenti
        getSponsoredApartments() {
            axios.get(this.store.allApartmentsAPI + this.store.sponsoredApartmentsURI).then((response) => {
                this.apartments = response.data;
                console.log(response.data)
            });
        },

        // Funzione per visitare l'appartamento
        visitApartment(apartmentID) {
            this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
        },
    },
    mounted() {
        this.getSponsoredApartments();
        this.store.showHeader = true;
    },
};
</script>

<template>
    <section class="mt-5 p-4 p-sm-0" id="sponsored-apartments" v-if="apartments">
        <div class="container d-md-flex gap-md-5">
            <div class="header text-center text-md-start mt-5 mb-3">
                <h6>EXPLORE OUR</h6>
                <h2>
                    <div class="fw-bold">Sponsored</div>Premium Apartments
                </h2>
                <div class="text-center text-md-start mt-4 mb-5 mt-md-5">
                    <Button :buttonText="'Explore All'" buttonRedirect="all-apartments" />
                </div>
            </div>
            <div class="scrolling-container mb-5 pb-4 d-flex gap-4">
                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" class="scroll-snap house-card" />
            </div>

        </div>
    </section>


</template>

<style lang="scss" scoped>
.container {

    .scrolling-container {
        display: flex;
        flex-direction: column;

    }

    .scroll-snap {
        flex: 0 0 auto;
        scroll-snap-align: start;
    }

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {

    .scrolling-container {
        overflow-x: scroll;
        flex-direction: row !important;
        scroll-snap-type: x mandatory;

        .house-card {
            width: 220px;
        }
    }

}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
    .scrolling-container {
        .house-card {
            width: 212px;
        }
    }

}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
    .scrolling-container {
        .house-card {
            width: 190px;
        }
    }
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
    .scrolling-container {
        .house-card {
            width: 230px;
        }
    }
}
</style>