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
    <div class="message-board">
        <h5 class="text-left py-3" v-if="!messageSent">Request information</h5>
        <!-- Messaggio di errore generale -->
        <div v-if="showError" class="alert alert-danger" role="alert">
            Error, please fill in all fields correctly and try again
        </div>
        <form @submit.prevent="sendMessage" v-if="!messageSent">
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
                <textarea class="form-control" placeholder="Message" id="message_text" rows="4"
                    v-model="message_text"></textarea>
                <!-- Messaggio di errore specifico -->
                <div v-if="errors.message_text" class="text-danger">{{ errors.message_text }}</div>
            </div>
            <!-- Bottone di invio -->
            <button type="submit" class="btn custom-btn mb-2 mt-2 w-100">Send</button>
        </form>
        <!-- Messaggio di conferma -->
        <div v-if="messageSent" class="mt-5 text-center d-flex flex-column align-items-center justify-content-center"
            role="alert">
            <img class="sent-icon pb-5" src="../../assets/img/message-sent.svg" alt="Sent icon">
            <h4 class="pt-5 mt-3 pb-5">Message sent correctly</h4>
            <div class="pt-5 w-75 pb-5 mb-5">The host will receive an alert, and you will be contacted in the email you
                entered.
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../../assets/scss/partials/variables' as *;

.message-board {
    background-color: rgb(252, 252, 252);
    padding: 20px 30px;
    border-radius: 16px;
    box-shadow: 0px 0px 25px rgba($color: #000000, $alpha: 0.10)
}

.text-danger {
    color: red;
    font-size: 14px; // 14px
}

.highlight {
    font-weight: bold;
    color: $acid-yellow;
}

.custom-btn {
    background-color: $acid-yellow;
    font-weight: 500;

    &:hover {
        background-color: $acid-yellow-hover;
    }
}


.sent-icon {
    width: 100px;

}

input,
textarea {

    &:focus {
        box-shadow: none;
        outline: none;
        border-color: $acid-yellow-hover;
    }

    &::placeholder {
        color: $placeholder;
    }


}
</style>
