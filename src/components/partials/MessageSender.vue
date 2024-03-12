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
            message_text: '',
            messageSent: false, // Variabile per il controllo del messaggio di conferma
            errors: {} // Oggetto per memorizzare gli errori
        };
    },
    computed: {
        showError() {
            return Object.values(this.errors).some(error => error);
        }
    },
    methods: {
        sendMessage() {
            // Validazione dei campi
            if (!this.sender_name || !this.sender_email || !this.message_text) {
                // Se un campo è vuoto, mostra un messaggio di errore
                this.errors = {
                    sender_name: !this.sender_name ? "Please enter your name" : null,
                    sender_email: !this.sender_email ? "Please enter a valid email" : null,
                    message_text: !this.message_text ? "Please enter a message" : null
                };
                return; // Interrompi l'invio del messaggio se ci sono errori
            }

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

                    this.messageSent = true;

                    this.sender_name = '';
                    this.sender_email = '';
                    this.message_text = '';

                    this.errors = {};
                })
                .catch(error => {
                    console.error(error);

                });
        }
    }
};
</script>


<template>
    <div>
        <h2>Send a Message</h2>
        <!-- Messaggio di errore generale -->
        <div v-if="showError" class="alert alert-danger" role="alert">
            Error, please fill in all fields correctly and try again
        </div>
        <form @submit.prevent="sendMessage">
            <!-- Input per il nome -->
            <div class="mb-3">
                <!-- <label for="sender_name" class="form-label">Name</label> -->
                <input type="text" placeholder="Name" class="form-control" id="sender_name" v-model="sender_name">
                <!-- Messaggio di errore specifico -->
                <div v-if="errors.sender_name" class="text-danger">{{ errors.sender_name }}</div>
            </div>
            <!-- Input per l'email -->
            <div class="mb-3">
                <!-- <label for="sender_email" class="form-label">Email</label> -->
                <input type="email" placeholder="Email" class="form-control" id="sender_email" v-model="sender_email">
                <!-- Messaggio di errore specifico -->
                <div v-if="errors.sender_email" class="text-danger">{{ errors.sender_email }}</div>
            </div>
            <!-- Input per il messaggio -->
            <div class="mb-3">
                <!-- <label for="message_text" class="form-label">Message</label> -->
                <textarea class="form-control" placeholder="Message" id="message_text" rows="4" v-model="message_text"></textarea>
                <!-- Messaggio di errore specifico -->
                <div v-if="errors.message_text" class="text-danger">{{ errors.message_text }}</div>
            </div>
            <!-- Bottone di invio -->
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
        <!-- Messaggio di conferma -->
        <div v-if="messageSent" class="alert alert-success mt-3" role="alert">
            Message sent successfully
        </div>
    </div>
</template>


<style lang="scss" scoped>
.text-danger {
    color: red;
    font-size: 14px; // 14px
}
</style>
