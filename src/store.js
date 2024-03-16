import { reactive } from 'vue'

export const store = reactive({
    searchApartmentsURI: '/search',
    singleApartmentURI: '/show',
    sponsoredApartmentsURI: '/sponsored',
    userInfoAPI: 'http://127.0.0.1:8000/api/userinfo',
    loggedUserAPI: 'http://127.0.0.1:8000/api/logged-user',
    allApartmentsAPI: 'http://127.0.0.1:8000/api/apartments',
    allServicesAPI: 'http://127.0.0.1:8000/api/services',
    sendMessageAPI: 'http://127.0.0.1:8000/api/guest/messages',
    sendVisitAPI: 'http://127.0.0.1:8000/api/guest/visits',
    tomTomAPIKey: 'CGrCXRtpRKgwQl1fo2NZ0mOC3k7CHzUX',
    imagesAPI: 'http://127.0.0.1:8000/storage/'
});

