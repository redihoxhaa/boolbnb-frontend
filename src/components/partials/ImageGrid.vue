<script>
import { store } from "../../store";

export default {
    data() {
        return {
            store,
            modalIndex: 0,
        };
    },
    methods: {
        openModal(index) {
            this.modalIndex = index; // Set modalIndex to the clicked image index
        },
    },
    props: {
        images: {
            type: Array,
            required: true
        }
    }
}
</script>

<template>
    <div class="image-gallery">


        <!-- Modal -->
        <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="modal1Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">

                <img :src="`${this.store.imagesAPI}${images[modalIndex]}`" alt="Apartment image">

            </div>
        </div>


        <div v-if="images.length === 1" class="with-1-foto">
            <div class="parent">
                <img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image" class="w-100"
                    data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(0)">
            </div>

        </div>
        <div v-else-if="images.length === 2" class="with-2-foto d-flex gap-4">
            <div class="w-50-custom">
                <img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image" data-bs-toggle="modal"
                    data-bs-target="#modal1" @click="openModal(0)">
            </div>
            <div class="w-50-custom">
                <img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image" data-bs-toggle="modal"
                    data-bs-target="#modal1" @click="openModal(1)">
            </div>
        </div>
        <div v-else-if="images.length === 3" class="with-3-foto d-flex gap-4">
            <div class="w-50-custom">
                <img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image" data-bs-toggle="modal"
                    data-bs-target="#modal1" @click="openModal(0)">
            </div>
            <div class="w-50 d-flex gap-4">
                <div class="w-50"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                        data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(1)"></div>
                <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                        data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
            </div>
        </div>
        <div v-else-if="images.length === 4" class="with-4-foto d-flex gap-4">
            <div class="w-50-custom">
                <img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image" data-bs-toggle="modal"
                    data-bs-target="#modal1" @click="openModal(0)">
            </div>
            <div class="w-50 d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                </div>
                <div class="h-50-custom">
                    <div class="w-100-custom"><img :src="`${this.store.imagesAPI}${images[3]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(3)"></div>
                </div>
            </div>
        </div>
        <div v-else-if="images.length === 5" class="with-5-foto d-flex gap-4">
            <div class="w-50-custom">
                <img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image" data-bs-toggle="modal"
                    data-bs-target="#modal1" @click="openModal(0)">
            </div>
            <div class="w-50 d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(1)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                </div>
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[3]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(3)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[4]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(4)"></div>
                </div>
            </div>
        </div>
        <div v-else-if="images.length === 6" class="with-6-foto d-flex gap-4">
            <div class="w-50-custom d-flex flex-column gap-4">
                <div class="h-50-custom"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                        data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(1)"></div>
                <div class="h-50-custom"><img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image"
                        data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(0)"></div>
            </div>
            <div class="w-50 d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[3]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(3)"></div>
                </div>
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[4]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(4)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[5]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(5)"></div>
                </div>
            </div>
        </div>
        <div v-else-if="images.length === 7" class="with-7-foto d-flex gap-4">
            <div class="w-50-custom d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(1)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                </div>
                <div class="h-50-custom"><img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image"
                        data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(0)"></div>
            </div>
            <div class="w-50 d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[3]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(3)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[4]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(4)"></div>
                </div>
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[5]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(5)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[6]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(6)"></div>
                </div>
            </div>
        </div>
        <div v-else-if="images.length === 8" class="with-8-foto d-flex gap-4">
            <div class="w-50-custom d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[2]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(2)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[3]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(3)"></div>
                </div>
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[0]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(0)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[1]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(1)"></div>
                </div>
            </div>
            <div class="w-50 d-flex flex-column gap-4">
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[4]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(4)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[5]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(5)"></div>
                </div>
                <div class="h-50-custom d-flex gap-4">
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[6]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(6)"></div>
                    <div class="w-50"><img :src="`${this.store.imagesAPI}${images[7]}`" alt="Apartment image"
                            data-bs-toggle="modal" data-bs-target="#modal1" @click="openModal(7)"></div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.parent {

    min-height: 500px;
    position: relative;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;



    }
}

.image-gallery {
    max-height: 500px;
    overflow: hidden;
    border-radius: 16px;

    div {
        border-radius: 16px;

    }
}

img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    /* Or 'pixelated' */
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.04);
    }

}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.w-25,
.w-50,
.h-25,
.h-50-custom {
    border-radius: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.with-1.foto,
.with-2.foto,
.with-3.foto,
.with-4.foto,
.with-5.foto,
.with-6.foto,
.with-7.foto,
.with-8.foto {
    height: 500px;
}

.h-50-custom {
    height: 238px;

}

.w-50-custom {
    height: 500px;
    width: 50%;
    border-radius: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.w-100-custom {
    height: 238px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
}

.modal-dialog {


    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    padding: 40px;
    margin: 0;

    img {
        object-fit: contain;
    }

}
</style>
