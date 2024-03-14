<template>
    <div class="map-container mb-5">
        <div ref="map" style="width: 100%; height: 570px;" class="map"></div>
    </div>
</template>

<script>
import tt from '@tomtom-international/web-sdk-maps';
import ApartmentImage from '../../assets/img/Risorsa+1.svg'; // Assicurati che il percorso sia corretto
import axios from 'axios'; // Importa Axios
import { store } from '../../store';

export default {
    props: ['apartments', 'center'],
    data() {
        return {
            store
        }
    },
    mounted() {
        this.initMap();
    },
    methods: {
        async initMap() {
            let mapCenter = [this.center.longitude, this.center.latitude];
            const map = tt.map({
                key: this.store.tomTomAPIKey,
                container: this.$refs.map,
                center: mapCenter,
                zoom: 14
            });

            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());

            for (const apartment of this.apartments) {
                try {
                    let marker = new tt.Marker({
                        element: this.createCustomMarkerElement(),
                        anchor: 'bottom'
                    }).setLngLat([apartment.lon, apartment.lat]).addTo(map);
                    marker.setPopup(new tt.Popup().setHTML(`<h5>${apartment.title}</h5>`));
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                }
            }
        },

        createCustomMarkerElement() {
            // Crea un elemento immagine per l'icona del marker personalizzato
            const markerElement = document.createElement('img');
            markerElement.src = ApartmentImage; // Utilizza l'immagine importata
            markerElement.style.width = '52px'; // Imposta la larghezza desiderata
            markerElement.style.height = '52px'; // Imposta l'altezza desiderata
            return markerElement;
        }
    },

};
</script>

<style scoped>
.map-container {
    height: 500px;
    overflow: hidden;
    border-radius: 16px;
}
</style>
