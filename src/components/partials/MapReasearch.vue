<script>
import tt from '@tomtom-international/web-sdk-maps';
import ApartmentImage from '../../assets/img/Risorsa+1.svg'; // Assicurati che il percorso sia corretto
import axios from 'axios'; // Importa Axios
import { store } from '../../store';

export default {
    props: ['apartments', 'center'],
    data() {
        return {
            store,
            searchCircleLayer: null
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



            // Attendi che lo stile della mappa sia completamente caricato
            await new Promise((resolve) => {
                map.on('load', resolve);
            });

            // Aggiungi cerchio di ricerca
            this.addSearchCircle(map);

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

            // Aggiungi listener per l'evento di zoom
            map.on('zoom', () => {
                this.updateSearchCircleRadius(map);
            });

        },

        createCustomMarkerElement() {
            // Crea un elemento immagine per l'icona del marker personalizzato
            const markerElement = document.createElement('img');
            markerElement.src = ApartmentImage; // Utilizza l'immagine importata
            markerElement.style.width = '52px'; // Imposta la larghezza desiderata
            markerElement.style.height = '52px'; // Imposta l'altezza desiderata
            return markerElement;
        },
        addSearchCircle(map) {
            if (this.center && typeof this.center.radius === 'number') {
                const centerCoordinate = new tt.LngLat(this.center.longitude, this.center.latitude);
                const mapBounds = map.getBounds();
                const mapWidth = mapBounds._ne.lng - mapBounds._sw.lng;
                const mapHeight = mapBounds._ne.lat - mapBounds._sw.lat;

                // Calcola la distanza in pixel in base alla larghezza della mappa
                const pixelsPerMeter = 256 / mapWidth;
                const radiusInMeters = this.center.radius * 1000; // Converti il raggio in metri
                const radiusInPixels = radiusInMeters * pixelsPerMeter;

                this.searchCircleLayer = map.addLayer({
                    id: 'searchCircle',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [this.center.longitude, this.center.latitude],
                            },
                            properties: {
                                radius: radiusInPixels,
                            },
                        },
                    },
                    paint: {
                        'circle-radius': radiusInPixels,
                        'circle-color': 'rgba(0, 128, 0, 0.2)',
                        'circle-stroke-color': 'rgba(0, 128, 0, 0.4)',
                        'circle-stroke-width': 2,
                    },
                });
            }
        },

        updateSearchCircleRadius(map) {
            const zoom = map.getZoom();
            const mapBounds = map.getBounds();
            const latitude = map.getCenter().lat; // Ottieni la latitudine del centro della mappa

            // Calcola il raggio del cerchio in pixel
            const radiusInMeters = this.center.radius * 2300; // Converti il raggio in metri
            const radiusInPixels = (radiusInMeters / (156543.03392 * Math.cos(latitude * Math.PI / 180))) * Math.pow(2, zoom);

            map.setPaintProperty('searchCircle', 'circle-radius', radiusInPixels);
        },
    },
};
</script>
<template>
    <div class="map-container mb-5">
        <div ref="map" style="width: 100%; height: 570px;" class="map"></div>
    </div>
</template>

<style scoped>
.map-container {
    height: 100%;
    width: 100%;
}

.map {
    height: 100% !important;
    width: 100% !important;
}
</style>
