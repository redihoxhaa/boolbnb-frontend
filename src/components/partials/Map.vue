<script>
// IMPORTS



// /IMPORTS
import tt from '@tomtom-international/web-sdk-maps';



export default {
    props: ['apartment'],
    components: {},
    data() {
        return {

        }
    },
    methods: {},
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
            const marker = new tt.Marker().setLngLat(center);
            marker.addTo(map);
        });
    },
}
</script>

<template>
    <div class="map-container mb-5">

        <div id="map" style="width: 100%; height: 570px;" class='map'></div>
    </div>
</template>

<style lang="scss" scoped>
// USES



// /USES


.map-container {
    height: 500;
    overflow: hidden;
    border-radius: 16px;
}
</style>
