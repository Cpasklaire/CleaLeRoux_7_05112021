<template>
    <div class="commentaire">
        <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">

            <div class="ecrivain">
                <img :src="commentaire.User.avatar" :alt="'avatar de' + commentaire.User.lastName + commentaire.User.firstName" class="avatar"/>
                <span> {{commentaire.User.lastName + commentaire.User.firstName}} </span>
            </div>

            <div class="contenu">
                <p>{{commentaire.text}}</p>
            </div>

            <span class="">Publié le {{ dateFormat(commentaire.createdAt) }}</span>

            <div class="ecrivain-boutons" v-if="userId == commentaire.UserId || statut == admin">
                <button v-on:click="deleteCommentaire">Supprimer</button>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'

    export default {
        name: 'Commentaire',
        components: {
        },
        props: ['postId'],
        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),
                //affichage commentaire
                commentaire: [],

                replyFormId: ''
            }
        },

        mounted() {                
                axios.get('http://localhost:3000/api/commentaire/' + this.postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.commentaires = response.data;})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
        },

        methods: {

            // format date
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },

            // supprimer un commentaire
            deleteCommentaire() {

                axios.delete('http://localhost:3000/api/comment/' + this.commentaireId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },

        }
    }
</script>


<style scoped lang="scss">
.post 
{
    border: solid 3px #D1515A;
    border-radius: 20px;
    margin: 3%;
    padding: 3%;
    .ecrivain
    {
        display: flex;
        align-items: center;
        .fa-user-astronaut
        {
            font-size: 45px;
            padding: 10px;
            border-radius: 100%;
            border: solid 3px #D1515A;
            height: 35px;
            width: 35px;
            color: #091F43;
            overflow: hidden;
        }
        span
        {
            margin-left: 3%;
            color: #D1515A;
            font-weight: bold;
            font-size: 1.5em;
        }
    }
    .contenu
    {
        background: #091f4312;
        border-radius: 20px;
        padding: 3%;
        margin-top: 3%;
    }
    .date 
    {            
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span
        {
            font-size: 0.7em;
        }
    }
    .boutons 
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .like
        {
            box-shadow: none;
            width: 10px;
            margin-bottom: 50px;
            font-size: 1.7em;
            margin-right: 50px;
        }
        button
        {
            font-size: 1em;
            width: 110px;
            height: 50px;

            .coeurrempli
            {
                color: transparent;
                background: #D1515A;
                -webkit-background-clip: text;
                position: absolute;
                font-size: 1.7em;
                z-index: 1;
            }
            .calque
            {
                position: absolute;
                font-size: 1.7em;
                z-index: 2;
                color: white;
                background-color: white;
                transition: transform 1s;
                transform-origin: center top;
            }
            .coeurvide
            {
                color: black;
                background-color: transparent;
                position: absolute;
                font-size: 1.7em;
                z-index: 3;
                &:hover + .calque
                {
                transform: scaleY(0);
                }
                &:hover
                {
                    opacity: 0;  
                }
            }
        }
    }
    .ecrivain-boutons
    {
        display: flex;
        align-items: center;
        justify-content: space-between;
        button
        {
            width: 110px;
        }
    }
}
</style>