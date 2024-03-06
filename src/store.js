import { reactive } from 'vue'

export const store = reactive({
    searchApartmentsURI: '/search',
    singleApartmentURI: '/show',
    allApartmentsAPI: 'http://127.0.0.1:8000/api/apartments',
    showHeader: true,
    tomTomAPIKey: 'CGrCXRtpRKgwQl1fo2NZ0mOC3k7CHzUX',
    imagesAPI: 'http://127.0.0.1:8000/storage/'
});

