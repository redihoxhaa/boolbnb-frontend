<script>
export default {
    name: 'ApartmentCardSkeletonLoader',
    props: ['colSize'],
};
</script>

<template>
    <div class="apartment-card" :class="colSize">
        <div class="apartment-image-container m-0">
            <div class="apartment-image skeleton-loader">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.skeleton-loader {
    background: linear-gradient(to right,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 80%),
        lightgray;
    background-repeat: repeat-y;
    background-size: 230px 500px;
    background-position: 0 0;
    animation: shine 1s infinite;
}

@keyframes shine {
    to {
        background-position: 100% 0,
            0 0;
    }
}

.apartment-card {
    flex-shrink: 0;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.apartment-image-container {
    width: 100%;
    height: 320px;
    border-radius: 18px;
    overflow: hidden;
}

.apartment-icon {
    position: absolute;
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 150;

    .icon-sponsor {
        margin: 13px 9px;

        div {
            div {
                display: inline;
                background-color: #cef27f;
                padding: 10px 12px;
                font-size: 12px;
                border-radius: 10px;
            }
        }
    }

    .icon-redirect {
        margin: 10px;
        display: flex;
        justify-content: end;

        .arrow-icon {
            width: 40px;
            height: 40px;
            text-align: center;
            border-radius: 50%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                background-color: #f4f4f4;
                transition: background-color 0.1s ease-in-out;
            }
        }
    }
}

.apartment-image {
    width: 100%;
    height: 100%;
    transition: all 0.8s ease-in-out;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
}

.apartment-info {
    margin-top: 10px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
        font-size: 20px;
        font-weight: 400;
        line-height: 26px;
    }

    span {
        font-size: 15px;
        font-weight: 300;
        color: $placeholder;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;

        /* Assicura che lo span rispetti la larghezza specificata */
        max-width: 100%;

        /* Imposta la larghezza massima dello span per evitare che superi il contenitore */

        white-space: nowrap;
    }
}

.distance {
    font-size: 11px;
    font-weight: 500;
    background: white;
    padding: 5px 10px;
    border-radius: 7px;
    position: absolute;
    top: 280px;
    left: 12px;
}

.rooms-icon {
    padding-bottom: 2px;
}

.bathroom-icon {
    padding-bottom: 2px;
}

.apartment-image-container:hover .apartment-image {

    transform: scale(1.05);


}
</style>
