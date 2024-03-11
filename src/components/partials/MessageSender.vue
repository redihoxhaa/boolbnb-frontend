<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    props: ['apartmentID'],
    data() {
        return {
            store,
            sender_name: '',
            sender_email: '',
            message_text: ''
        };
    },
    methods: {
        sendMessage() {
            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

            axios.post(this.store.sendMessageAPI, {
                apartment_id: this.apartmentID, // Assumendo che sia noto l'ID dell'appartamento
                sender_name: this.sender_name,
                sender_email: this.sender_email,
                message_text: this.message_text
            })
                .then(response => {
                    console.log(response.data);
                    // Messaggio inviato con successo, puoi fare qualcosa qui come mostrare un messaggio di conferma
                })
                .catch(error => {
                    console.error(error);
                    // Gestione degli errori, puoi mostrare un messaggio di errore all'utente
                });
        }
    }
};
</script>

<template>
    <div>
        <h2>Invia un messaggio</h2>
        <form @submit.prevent="sendMessage">
            <div class="mb-3">
                <label for="sender_name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="sender_name" v-model="sender_name">
            </div>
            <div class="mb-3">
                <label for="sender_email" class="form-label">Email</label>
                <input type="email" class="form-control" id="sender_email" v-model="sender_email">
            </div>
            <div class="mb-3">
                <label for="message_text" class="form-label">Messaggio</label>
                <textarea class="form-control" id="message_text" rows="4" v-model="message_text"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Invia Messaggio</button>
        </form>
    </div>
</template>

<style lang="scss" scoped></style>
