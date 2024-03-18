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

        handleApartmentHover(isHovered) {
            this.apartmentHovered = isHovered;
            if (isHovered) {
                this.showMarkerHint();
            } else {
                this.hideMarkerHint();
            }
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

            // Creazione e aggiunta del popup invisibile
            let invisiblePopup = new tt.Popup({ closeButton: false }).setLngLat([0, 0]).addTo(map);
            invisiblePopup.setHTML(`<style>     .hint {
                       animation: moveUpDown 0.3s ease-in-out infinite alternate;
                       position: relative;
                    }

                    @keyframes moveUpDown {
        0% {
            margin-top: 0;
        }
        100% {
            margin-top: 10px;
       
        }
    }</style><div style="visibility: hidden;"></div>`); // Imposta il contenuto vuoto e rendilo invisibile

            for (let i = 0; i < this.apartments.length; i++) {
                const apartment = this.apartments[i];
                try {
                    const isSponsored = apartment.sponsorships && apartment.sponsorships.length > 0 && this.showSponsoredTag(apartment.sponsorships[apartment.sponsorships.length - 1].pivot.end_date);

                    let marker = new tt.Marker({
                        element: this.createCustomMarkerElement(isSponsored, i), // Passa l'indice come parametro
                        anchor: 'bottom'
                    }).setLngLat([apartment.lon, apartment.lat]).addTo(map);

                    let popupContent = document.createElement('div');
                    popupContent.innerHTML = `
                <style>

                    * {
                         font-family: "Montserrat";
                    }

                    .mapboxgl-popup-content {
                        min-width: 400px;
                        min-height: 150px;
                        border-radius: 12px;
                        padding: 0;
                        margin: 0;
                        overflow: hidden;
                    }

                    .mapboxgl-popup-close-button {
                        display: none;
                    }

                    .mapboxgl-popup-tip {
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

                    .image-inside {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .apartment-info2 {
                    padding: 8px 14px;
                    }

                    .titolo-appartamento {
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 26px;
                        margin: 0;
                        padding: 0;
                        padding-top: 10px;
                   
                    }

                    distanza-appartamento {
                        padding-right: 20px;
                        width: fit-content;
                             font-size: 12px;
                    }

                    .indirizzo-appartamento {
                        font-size: 10px;
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

                    .apartment-image-container-2 {
                        height: 150px;
                    }

                    .hint {
                       animation: moveUpDown 0.3s ease-in-out infinite alternate;
                       position: relative;
                    }

                    @keyframes moveUpDown {
        0% {
            margin-top: 0;
        }
        100% {
            margin-top: 10px;
       
        }
    }
                </style>


                <div class="row m-0 p-0 g-0">
                    <div class="col-5 apartment-image-container-2 m-0">
                            ${apartment.images ?
                            `<img src="${this.store.imagesAPI + apartment.images.split(',')[0]}" alt="Apartment Image" class="image-inside">` :
                            `<img src="https://victorsandbox.myshopify.com/cdn/shop/products/property-placeholder_grande.jpg?v=1482778691" alt="Apartment Image" class="image-inside">`}
                        </div>

                   <div class="col-7 m-0 apartment-info2">
                      
                            <h3 class="titolo-appartamento">${apartment.title}</h3>
                            <span class="indirizzo-appartamento">${apartment.address}</span>
                            <div class="distanza-appartamento mt-1">${apartment.distance} away</div>
                       
                    </div>

                    <div class="apartment-icon2">
                            <div class="icon-redirect2">
                                <a class="arrow-icon2" role="button" href="http://localhost:5173/single-apartments/results/${apartment.id}">
                                    <img src="https://svgur.com/i/14Mx.svg" alt="">
                                </a>
                            </div>
                        </div>
                    </div>

                
            `;

                    let markerPopup = new tt.Popup({ offset: 60 }).setDOMContent(popupContent);
                    marker.setPopup(markerPopup);
                } catch (error) {
                    console.error('Error fetching coordinates:', error);
                }
            }

            // Aggiungi listener per l'evento di zoom
            map.on('zoom', () => {
                this.updateSearchCircleRadius(map);
            });

            this.updateSearchCircleRadius(map);



        },

        createCustomMarkerElement(isSponsored, index) {
            // Crea un elemento immagine per l'icona del marker personalizzato
            const markerElement = document.createElement('img');
            markerElement.src = isSponsored ? yellowMarker : blackMarker; // Utilizza l'immagine corretta in base allo stato di sponsorizzazione
            markerElement.style.width = '52px'; // Imposta la larghezza desiderata
            markerElement.style.height = '52px'; // Imposta l'altezza desiderata
            markerElement.dataset.index = index; // Salva l'indice come attributo dataset
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
            const radiusInMeters = this.center.radius * 2650; // Converti il raggio in metri
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
}

.map {
    width: calc(50vw - 12px);
    height: 100vh;
}
</style>
