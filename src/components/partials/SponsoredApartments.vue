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
    <section id="sponsored-apartments" v-if="apartments">
        <div class="container">
            <div class="header mt-5 mb-3">
                <h6>EXPLORE OUR</h6>
                <h2>Sponsored Apartments</h2>
            </div>
            <div class="mb-5">
                <ApartmentCard v-for="apartment in apartments" :apartment="apartment" />
            </div>
            <div class="text-center mb-5">
                <Button :buttonText="'Explore All'" />
            </div>
        </div>
    </section>

    <!-- <div class="container" v-if="apartments">
        <h6>EXPLORE OUR</h6>
        <h1 class="page-title">Sponsored Apartments</h1>
        
        <div class="apartment-list">
            <div v-for="apartment in apartments" :key="apartment.id" class="apartment-card">
                <div class="card-header">
                    <img :src="this.store.imagesAPI + apartment.images.split(',')[0]" class="card-image"
                        alt="Apartment Image" v-if="apartment.images" />
                    <img src="https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        class="card-image" alt="Apartment Image" v-else>
                </div>
                <div class="card-content">
                    <h2 class="title">{{ apartment.title }}</h2>
                    <p class="description">{{ apartment.description }}</p>
                    <div class="details">
                        <div class="detail"><strong>Rooms:</strong> {{ apartment.rooms }}</div>
                        <div class="detail"><strong>Beds:</strong> {{ apartment.beds }}</div>
                        <div class="detail">
                            <strong>Bathrooms:</strong> {{ apartment.bathrooms }}
                        </div>
                        <div class="detail">
                            <strong>Square Meters:</strong> {{ apartment.square_meters }}
                        </div>
                    </div>
                    <button @click="visitApartment(apartment.id)" class="detail-button">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div> -->
</template>

<style scoped>
/* .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.page-title {
    font-size: 36px;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.apartment-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
}

.apartment-card {
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.3s ease;
}

.apartment-card:hover {
    transform: translateY(-5px);
}

.card-header {
    height: 200px;
    overflow: hidden;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-content {
    padding: 20px;
}

.title {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

.description {
    font-size: 16px;
    margin-bottom: 15px;
    color: #555;
}

.details {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.detail {
    margin-right: 20px;
    font-size: 14px;
    color: #666;
}

.detail strong {
    font-weight: bold;
}

.detail-button {
    background-color: #ff8c00;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.detail-button:hover {
    background-color: #ff6b00;
} */
</style>