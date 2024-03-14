<script>
import tt from '@tomtom-international/web-sdk-maps';
import yellowMarker from '../../assets/img/Risorsa+1.svg'; // Assicurati che il percorso sia corretto
import blackMarker from '../../assets/img/Risorsa+2.svg'; // Assicurati che il percorso sia corretto
import axios from 'axios'; // Importa Axios
import { store } from '../../store';
import { DateTime } from 'luxon';

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

        visitApartment(apartmentID) {
            this.$router.push({ name: "single-apartment", params: { id: apartmentID } });
        },

        showSponsoredTag(endDateStr) {
            if (!endDateStr) return false; // Gestisci il caso in cui endDateStr è vuota

            const currentDate = DateTime.now();
            const endDate = DateTime.fromFormat(endDateStr, 'yyyy-MM-dd HH:mm:ss');

            return endDate > currentDate;
        },

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
                    const isSponsored = apartment.sponsorships && apartment.sponsorships.length > 0 && this.showSponsoredTag(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_date);

                    let marker = new tt.Marker({
                        element: this.createCustomMarkerElement(isSponsored), // Passa il flag di sponsorizzazione
                        anchor: 'bottom'
                    }).setLngLat([apartment.lon, apartment.lat]).addTo(map);
                    let popupContent = document.createElement('div');
                    popupContent.innerHTML = `
                <style>

                    * {
                         font-family: "Montserrat";
                    }

                    .apartment-card2 {
                        flex-shrink: 0;
                        position: relative;
                        width: px;
                        height: 250px;
                        display: flex;
                        flex-direction: column;
                    }

                    .apartment-image2-container2 {
                        width: 100%;
                        height: 500px;
                        border-radius: 16px;
                        overflow: hidden;
                    }

                    .mapboxgl-popup-content {
                        width: fit-content;
                        border-radius: 16px;
                        overflow: hidden;
                    }

                    .mapboxgl-popup-close-button {
                        display: none;
                    }

                    .icon-redirect2 {
                        margin: 10px;
                        display: flex;
                        justify-content: end;
                        position: absolute;
                        right: 0;
                        top: 85px;
                    }

                    .arrow-icon2 {
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        border-radius: 50%;
                        background-color: #CEF27F;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .arrow-icon2:hover {
                        background-color: rgb(211, 248, 132);
                        transition: background-color 0.1s ease-in-out;
                    }

                    .apartment-icon2 {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .apartment-image2 {
                        width: 100%;
                        height: 100%;
                    }

                    .apartment-image2 img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .apartment-info2 {
                        margin-top: 10px;
                        width: 100%;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .titolo-appartamento {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 26px;
                        margin: 0;
                        padding: 0;
                    }

                    .indirizzo-appartamento {
                        font-size: 13px;
                        font-weight: 300;
                        color: #878b91;
                        display: inline-block;
                    }

                    .rooms-icon2 {
                        padding-bottom: 2px;
                    }

                    .bathroom-icon2 {
                        padding-bottom: 2px;
                    }
                </style>

                <div class="apartment-card2">
                    <div class="apartment-image2-container2 m-0">
                        <div class="apartment-icon2">
                            <div class="icon-redirect2">
                                <a class="arrow-icon2" role="button" href="http://localhost:5173/single-apartments/results/${apartment.id}">
                                    <img src="https://svgur.com/i/14Mx.svg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="apartment-image2">
                            ${apartment.images ?
                            `<img src="${this.store.imagesAPI + apartment.images.split(',')[0]}" alt="Apartment Image">` :
                            `<img src="https://victorsandbox.myshopify.com/cdn/shop/products/property-placeholder_grande.jpg?v=1482778691" alt="Apartment Image" class="card-image">`}
                        </div>
                    </div>
                    <div class="apartment-info2">
                        <div>
                            <h3 class="titolo-appartamento">${apartment.title}</h3>
                            <span class="indirizzo-appartamento">${apartment.address}</span>
                            <div class="distanza-appartamento text-end">${apartment.distance.toString().slice(0, 4)} km away</div>
                        </div>
                    </div>
                </div>
            `;

                    let markerPopup = new tt.Popup().setDOMContent(popupContent);
                    marker.setPopup(markerPopup);
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                }
            }

            // Aggiungi listener per l'evento di zoom
            map.on('zoom', () => {
                this.updateSearchCircleRadius(map);
            });



        },

        createCustomMarkerElement(isSponsored) {
            // Crea un elemento immagine per l'icona del marker personalizzato
            const markerElement = document.createElement('img');
            markerElement.src = isSponsored ? yellowMarker : blackMarker; // Utilizza l'immagine corretta in base allo stato di sponsorizzazione
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

                // Calcola la distanza angolare in radianti
                const radiusInRadians = radiusInMeters / 6371000; // Raggio medio della Terra in metri

                // Calcola il raggio in gradi di longitudine (che è approssimativamente uguale in latitudine)
                const radiusInDegrees = (180 / Math.PI) * radiusInRadians;

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
                                radius: radiusInDegrees,
                            },
                        },
                    },
                    paint: {
                        'circle-radius': {
                            stops: [[0, 0], [20, pixelsPerMeter * radiusInMeters]],
                            base: 2
                        },
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
        <div ref="map" class="map"></div>
    </div>
</template>

<style lang="scss" scoped>
.map-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
}

.map {
    width: 100%;
    height: 400px
}
</style>
