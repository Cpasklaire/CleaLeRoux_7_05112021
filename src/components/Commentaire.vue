<template>
    <div>
        <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
            <div class="commentaire">
                <div class="ecrivain">
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
                const comm = this.commentaires;
                console.log(comm)
                console.log(comm.id)
                const commId = comm.id;
                console.log(commId);

                axios.delete('http://localhost:3000/api/comment/' + commId, {
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