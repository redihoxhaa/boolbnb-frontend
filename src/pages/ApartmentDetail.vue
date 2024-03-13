<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";
// /IMPORTS

// Importa TomTom Maps SDK
import tt from '@tomtom-international/web-sdk';

export default {
  mounted() {
    // Inizializza la mappa TomTom
    const map = tt.map({
      key: 'YOUR_TOMTOM_API_KEY',
      container: 'map', // L'ID del tuo elemento HTML dove verrà visualizzata la mappa
      center: [YOUR_LONGITUDE, YOUR_LATITUDE], // Coordinate iniziali della mappa
      zoom: 12 // Livello di zoom iniziale
    });

    // Aggiungi eventuali marker, linee, poligoni, ecc. alla mappa secondo le tue esigenze
  }
}
</script>

<template>
    <div class="container d-flex justify-content-between">
        <div></div>
        <div></div>
    </div>
    <div class="container">
        <div>Immagini appartamento</div>
        <div class="row">
            <div class="col-8">
                <h3>Appartamento bello grande di Andrea Gulino</h3>
                <h5>Castellammare di Stabia</h5>
                
                <div>
                    <h4>Apartment Description</h4>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis praesentium accusamus
                        corrupti facilis excepturi inventore soluta, voluptatem earum. Hic nesciunt praesentium nemo
                        cupiditate, ad laborum? Excepturi minus odio magnam nisi!</p>
                </div>
                <div class="container">
                    <h4>Services</h4>
                    <div class="row">
                        <div class="col">
                            <div><span>(icona)Kitchen</span></div>
                            <div><span>(icona)Air Conditioner</span></div>
                            <div><span>(icona)Washer</span></div>
                        </div>
                        <div class="col">
                            <div><span>(icona)Television with Netflix</span></div>
                            <div><span>(icona)Free Wireless Internet</span></div>
                            <div><span>(icona)Balcony or patio</span></div>
                        </div>
                        <button type="button" class="btn btn-light">Show all Amenities</button>
                    </div>
                </div>
                <h4>Location</h4>
                <div>mappa</div>
                <button type="button" class="btn btn-dark">Show on map</button>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>

<style scoped>
.service {
    max-height: 100px;

}
</style>