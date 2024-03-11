<script>
// IMPORTS
import { store } from "../store";
import axios from "axios";
// /IMPORTS
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
                <div class="d flex">
                    <div class="bg-body-secondary rounded text-center">
                        <div>icona letto</div>
                        <div>numero Bedrooms</div>
                    </div>
                    <div class="bg-body-secondary rounded text-center">
                        <div>icona bagno</div>
                        <div>numero Bathrooms</div>
                    </div>
                    <div class="bg-body-secondary rounded text-center">
                        <div>icona macchina/bici</div>
                        <div>Cars/bikes</div>
                    </div>
                    <div class="bg-body-secondary rounded text-center">
                        <div>icona animali</div>
                        <div>Pet allowed</div>
                    </div>
                </div>
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