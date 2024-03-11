<script>
import { store } from "../../store";
import { DateTime } from 'luxon';

export default {
    name: 'ApartmentCard',
    props: ['apartment'],
    data() {
        return {
            props: [],
            store
        }
    },
    methods: {
        showSponsoredTag(endDate) {
            const currentDate = DateTime.now();
            if (endDate > currentDate.toISODate()) {
                return true
            } else {
                return false
            }
        },
        // Funzione per visitare l'appartamento
        visitApartment(apartmentID) {
            this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
        },
    },
    mounted() {
        this.showSponsoredTag();
    }
}
</script>

<template>
    <div class="apartment-card">
        <div class="apartment-image-container">
            <div class="apartment-icon">
                <div class="icon-sponsor">
                    <div v-if="apartment.sponsorships && apartment.sponsorships.length">
                        <div
                            v-if="showSponsoredTag(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_date)">
                            Sponsored
                        </div>
                    </div>
                </div>
                <div class="icon-redirect" @click="visitApartment(apartment.id)">
                    <div class="arrow-icon">
                        <img src="../../assets/img/arrow_card_icon.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="apartment-image">
                <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" alt="Apartment Image"
                    v-if="apartment.images" />
                <img src="https://victorsandbox.myshopify.com/cdn/shop/products/property-placeholder_grande.jpg?v=1482778691"
                    class="card-image" alt="Apartment Image" v-else>
            </div>
        </div>
        <div class="apartment-info">
            <h3>{{ apartment.title }}</h3>
            <span> {{ apartment.address }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.apartment-card {
    width: 250px;
    position: relative;
}

.apartment-image-container {
    width: 100%;
    height: 320px;
    border-radius: 18px;
    overflow: hidden;
}

.apartment-icon {
    position: absolute;
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .icon-sponsor {
        margin: 10px;

        span {
            background-color: #CEF27F;
            padding: 8px 14px;
            font-size: 12px;
            border-radius: 100px;
        }
    }

    .icon-redirect {
        margin: 10px;
        display: flex;
        justify-content: end;

        .arrow-icon {
            width: 40px;
            height: 40px;
            text-align: center;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.apartment-image {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.apartment-info {

    margin-top: 10px;

    h3 {
        font-size: 20px;
        font-weight: 400;
        line-height: 26px;
    }

    span {
        font-size: 15px;
        font-weight: 300;
    }
}
</style>