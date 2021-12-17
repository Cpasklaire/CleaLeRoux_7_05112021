<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
            <div class="commentaire">
                <div class="ecrivain">
                    <img v-if="commentaire.User.avatar == !null" :src="commentaire.User.avatar" :alt="'avatar de' + commentaire.User.lastName + commentaire.User.firstName" class="avatar"/>
                    <i v-if="commentaire.User.avatar == null || commentaire.User.avatar == ''" class="fa fa-user-astronaut"></i>
                    <span> {{commentaire.User.lastName}} {{commentaire.User.firstName}} </span>
                </div>

                <div class="contenu">
                    <p>{{commentaire.text}}</p>
                </div>

                <span class="date">Publié le {{ dateFormat(commentaire.createdAt) }}</span>

                <div class="ecrivain-boutons" v-if="userId == commentaire.userId || statut == 'admin'">
                    <button v-on:click="deleteCommentaire">Supprimer</button>
                </div>
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
        
        props: ['postId', 'commentaires'],
        
        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),
            }
        },

        methods: {
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

            // format date
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },
        }
    }
</script>


<style scoped lang="scss">
.commentaire
{
    border: solid 3px #091F43;
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
        font-size: 0.7em;
    }
}
</style>