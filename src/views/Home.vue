<template>
    <div class="home">
        <div class="titre">
            <h1>GroupoSocial par</h1>
            <img src="../assets/illutration/icon-left-font.png" alt="Logo de Groupomania"/>
        </div>

        <div class="formulaire">
            <!-- Se connecter -->
            <form @submit.prevent="login" class="login">
                <h2 class="login-titre">Se connecter</h2>
                <label for="mail" class="login-email">Courriel</label>
                <input type="email" v-model="loginemail" id="loginemail" name="mail" placeholder="M.Kido@groupomania.com">
                <label for="password" class="login-mdp">Mot de passe</label>
                <input type="password" autocomplete="current-password" v-model="loginmdp" id="loginmdp" name="password" placeholder="**********">
                <button class="login-bouton">Connexion</button>
            </form>

            <span>Ou alors</span>

            <!-- S'inscrire -->
            <form @submit.prevent="signup" class="signup">
                <h2 class="signup-titre">S'inscrire</h2>
                <label for="lastName" class="signup-prenom">Prénom</label>
                <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Mitsumasa">
                <label for="firstName" class="signup-nom">Nom</label>
                <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Kido">
                <label for="mail" class="signup-email">Courriel</label>
                <input type="email" v-model="signupemail" id="signupemail" name="mail" placeholder="M.Kido@groupomania.com">
                <label for="password" class="signup-mdp">Mot de passe</label>
                <input type="password" autocomplete="current-password" v-model="signupmdp" id="signupmdp" name="password" placeholder="**********">
                <button class="signup-bouton">Inscription</button>
            </form>
        </div>

        <span>{{messError}}</span>
        <span class="reussite">{{messReussite}}</span>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Home',
            components: {},

        data() {
            return {
                //connection
                loginemail: '',
                loginmdp: '',
                //inscription
                lastName: '',
                firstName: '',
                signupemail: '',
                signupmdp: '',
                //message                
                messReussite:'',
                messError: '',
            }
        },

        mounted() {
            if (localStorage.getItem('token') !== null){
            this.$router.push('wall');
            }
        },
        
        methods: {
            //Se connecter
            login() {
                axios.post('http://localhost:3000/api/user/login', {
                    email: this.loginemail,
                    password: this.loginmdp,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('lastName', response.data.lastName);
                    localStorage.setItem('firstName', response.data.firstName);
                    localStorage.setItem('avatar', response.data.avatar);
                    localStorage.setItem('statut', response.data.statut);

                    this.$router.push('wall');
                })
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
            //S'inscrire
            signup() {
                axios.post('http://localhost:3000/api/user/signup', {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.signupemail,
                    password: this.signupmdp,
                })
                .then(() => {this.messReussite = 'Vous pouvez vous connecter'})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }
</script>


<style scoped lang="scss">
.home
{        
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .titre
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        h1
        {
            color: #134aa7;
        }
        img
        {
            width: 90%;
            margin-bottom: 5%;
        }
    }
    .formulaire
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    span 
    {
        font-size: 2em;
        padding: 2%;
        color: #134aa7;
    }
    form 
    {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border: solid 3px #D1515A;
        border-radius: 30px;
        padding: 5%;
        width: 120%;
        h2 
        {
            color: #134aa7;
            font-size: 2em;
            margin-bottom: 5%;
        }
        label
        {
            margin-top: 5%;
        }
        input
        {
            width: 90%;
        }
    }
    .reussite
    {
        font-size: 1.4em;
    }

    @media (min-width: 992px)
    {
        .formulaire
        {
            flex-direction: row;
            align-items: baseline;

        }            
        form 
        {
            width: 300px;
            height: 300px;
        }
        span
        {
            width: 25%;
        }
    }
}
</style>