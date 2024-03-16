<script>
import { store } from '../../store';
import { DateTime } from 'luxon';

export default {
    name: 'ApartmentCard',
    props: ['apartment', 'index', 'colSize'],
    data() {
        return {
            props: [],
            store,
        };
    },
    methods: {

        roundToNearestMultiple(number, multiple) {
            return Math.round(number / multiple) * multiple;
        },

        convertDistance(kmDistance) {
            if (kmDistance < 1) {
                // Trasforma da km a metri
                return this.roundToNearestMultiple(kmDistance * 1000, 5) + " m";
            } else {
                // Trasforma da km a km con massimo due cifre decimali
                return this.roundToNearestMultiple(kmDistance, 0.05).toFixed(2) + " km";
            }
        },

        showSponsoredTag(endDateStr) {
            if (!endDateStr) return false; // Gestisci il caso in cui endDateStr è vuota

            const currentDate = DateTime.now();
            const endDate = DateTime.fromFormat(endDateStr, 'yyyy-MM-dd HH:mm:ss');

            return endDate > currentDate;
        },

        // Funzione per visitare l'appartamento
        visitApartment(apartmentID) {
            this.$router.push({
                name: 'single-apartment',
                params: { id: apartmentID },
            });
        },

        showHint() {
            this.$emit('show-hint', this.index);
        },
        hideHint() {
            this.$emit('hide-hint');
        }
    },
    created() {
        if (this.apartment.distance) {
            this.apartment.distance = this.convertDistance(this.apartment.distance)
        }
    },
    mounted() {
        this.showSponsoredTag();
    },
};
</script>

<template>
    <div class="apartment-card" :class="colSize" :data-index="index" @mouseover="showHint" @mouseout="hideHint">
        <div class="apartment-image-container m-0">
            <div class="apartment-icon">
                <div class="icon-sponsor">
                    <div v-if="apartment.sponsorships && apartment.sponsorships.length" class="p-1">
                        <div v-if="showSponsoredTag(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_date)"
                            class="px-5">
                            Sponsored
                        </div>
                    </div>
                </div>
                <div class="icon-redirect">
                    <div class="arrow-icon" role="button" @click="visitApartment(apartment.id)">
                        <img src="../../assets/img/arrow_card_icon.svg" alt="" />
                    </div>
                </div>
            </div>
            <div class="apartment-image">
                <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" alt="Apartment Image"
                    v-if="apartment.images" />
                <img src="https://victorsandbox.myshopify.com/cdn/shop/products/property-placeholder_grande.jpg?v=1482778691"
                    class="card-image" alt="Apartment Image" v-else />
            </div>
        </div>
        <div class="apartment-info">
            <div>
                <h3>{{ apartment.title }}</h3>
                <span class="truncate"> {{ apartment.address }}</span>
                <div class="text-end distance" v-if="apartment.distance"> {{ apartment.distance
                    }}
                    away
                </div>
            </div>
            <ul class="d-flex mt-3 gap-4 list-unstyled align-items-center">
                <li class="d-flex gap-2 align-items-center">
                    <img class="rooms-icon" src="../../assets/img/rooms_icon.svg" alt="rooms" />
                    {{ apartment.rooms }}
                </li>
                <li class="d-flex gap-2 align-items-center">
                    <img src="../../assets/img/beds_icon.svg" alt="beds" />
                    {{ apartment.beds }}
                </li>
                <li class="d-flex gap-2 align-items-center">
                    <img class="bathroom-icon" src="../../assets/img/bathrooms_icon.svg" alt="bathrooms" />
                    {{ apartment.bathrooms }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.apartment-card {
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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
    z-index: 150;

    .icon-sponsor {
        margin: 13px 9px;
        cursor: default;

        div {
            div {
                display: inline;
                background-color: #cef27f;
                padding: 10px 12px;
                font-size: 12px;
                border-radius: 10px;
            }
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

            &:hover {
                background-color: #f4f4f4;
                transition: background-color 0.1s ease-in-out;
            }
        }
    }
}

.apartment-image {
    width: 100%;
    height: 100%;
    transition: all 0.8s ease-in-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
}

.apartment-info {
    margin-top: 10px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
        font-size: 20px;
        font-weight: 400;
        line-height: 26px;
    }

    span {
        font-size: 15px;
        font-weight: 300;
        color: $placeholder;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;

        /* Assicura che lo span rispetti la larghezza specificata */
        max-width: 100%;

        /* Imposta la larghezza massima dello span per evitare che superi il contenitore */

        white-space: nowrap;
    }
}

.distance {
    font-size: 11px;
    font-weight: 500;
    background: white;
    padding: 5px 10px;
    border-radius: 7px;
    position: absolute;
    top: 280px;
    left: 12px;
}

.rooms-icon {
    padding-bottom: 2px;
}

.bathroom-icon {
    padding-bottom: 2px;
}

.apartment-image-container:hover .apartment-image {

    transform: scale(1.05);


}
</style>
