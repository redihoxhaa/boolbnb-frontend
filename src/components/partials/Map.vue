<script>
// IMPORTS
import tt from '@tomtom-international/web-sdk-maps';
import ApartmentImage from '../../assets/img/Risorsa+2.svg'; // Assicurati che il percorso sia corretto

export default {
    props: ['apartment'],
    components: {},
    data() {
        return {}
    },
    mounted() {
        let center = [this.apartment.lon, this.apartment.lat]
        const map = tt.map({
            key: "CGrCXRtpRKgwQl1fo2NZ0mOC3k7CHzUX",
            container: "map",
            center: center,
            zoom: 14
        })
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
        map.on('load', () => {
            const marker = new tt.Marker({
                element: this.createCustomMarkerElement(),
                anchor: 'bottom'
            }).setLngLat(center);

            marker.addTo(map);
        });
    },
    methods: {
        createCustomMarkerElement() {
            // Crea un elemento immagine per l'icona del marker personalizzato
            const markerElement = document.createElement('img');
            markerElement.src = ApartmentImage; // Utilizza l'immagine importata
            markerElement.style.width = '52px'; // Imposta la larghezza desiderata
            markerElement.style.height = '52px'; // Imposta l'altezza desiderata
            return markerElement;
        }
    }
}
</script>

<template>
    <div class="map-container mb-5">
        <div id="map" style="width: 100%; height: 570px;" class='map'></div>
    </div>
</template>

<style lang="scss" scoped>
.map-container {
    height: 500px; // Imposta l'altezza desiderata
    overflow: hidden;
    border-radius: 16px;
}
</style>
