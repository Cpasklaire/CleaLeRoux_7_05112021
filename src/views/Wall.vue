<template>  
    <div class="wall">
        <Header/>
        <div class="post" v-for="post in posts" :key="post.postId">
            <div class="ecrivain">
                <img :src="post.User.avatar" :alt="'avatar de' + post.User.lastName + post.User.firstName" class="avatar"/>
                <span> {{post.User.lastName + post.User.firstName}} </span>
            </div>
            <div class="contenu">
                <p>{{post.text}}</p>
                <img :scr="post.imageURL" />
            </div>
            <span class="">Publié le {{ dateFormat(post.createdAt) }}</span>
            <span class="">Modifié le {{ dateFormat(post.updatedAt) }}</span>
            <div class="boutons">
                <button v-on:click="likePost">coeur</button>
                <button v-on:click="togglewRepElement">Répondre</button>
                <button v-on:click="togglewComElement">Voir les commentaires</button>
            </div>
            <div class="ecrivain-boutons" v-if="userId == post.UserId">
                <button v-on:click="modifyPost">Modifier</button>
                <button v-on:click="deletePost">Supprimer</button>
            </div>

            <div class="commentaire" v-if="togglewComElement">
                <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
                    <div class="ecrivain">
                        <img :src="commentaire.User.avatar" :alt="'avatar de' + commentaire.User.lastName + commentaire.User.firstName" class="avatar"/>
                        <span> {{commentaire.User.lastName + commentaire.User.firstName}} </span>
                    </div>
                    <div class="contenu">
                        <p>{{commentaire.text}}</p>
                    </div>
                    <span class="">Publié le {{ dateFormat(post.createdAt) }}</span>
                    <!--<span class="">Modifié le {{ dateFormat(post.updatedAt) }}</span>-->
                    <div class="ecrivain-boutons" v-if="userId == commentaire.UserId">
                        <!--<button v-on:click="modifyCommentaire">Modifier</button>-->
                        <button v-on:click="deleteCommentaire">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'
    
    import Header from '@/components/Header.vue'

    export default {
        name: 'Wall',
        components: {
            Header,
        },
        data() {
            return {
                userId: localStorage.getItem('userId'),
                posts: [],
                post: '',
                imageURL: '',
                text: '',
                commentaire: [],
                like: false,
                postLikes: [],
            }
        }, 
        mounted() {                
            axios.get('http://localhost:3000/api/post', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.posts = response.data;})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
        },
        methods: {
            // Permet d'afficher la date de publication au bon format
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },

            // Permet de modifier un message
            modifyPost(id) {
                const postId = id;

                axios.put('http://localhost:3000/api/post/' + postId,  {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },

            // Permet de supprimer un message
            deletePost(id) {
                const postId = id;
               
                axios.delete('http://localhost:3000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
            
            // Permet de créer un nouveau commentaire
            createCommentaire(id) {
                const postId = id;

                axios.post('http://localhost:3000/api/commentaire/' + postId, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },

            // Permet d'afficher les commentaires d'un message
            VoirCommentaire(id) {
                this.showComment = !this.showComment

                const postId = id;
                
                axios.get('http://localhost:3000/api/commentaire/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.commentaires = response.data;})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },

            // Permet de supprimer un commentaire
            deleteCommentaire(id) {
                const commentaireId = id;

                axios.delete('http://localhost:3000/api/comment/' + commentaireId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {window.location.reload()})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },

            //like
            likePost() {
                const postId = this.post.id;
                const userId = this.userId;

                axios.get('http://localhost:3000/api/post/' + postId + '/like', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.postLikes = response.data;
                    if(this.postLikes.length == 0) {
                        this.like = false  
                        axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                            like: this.like,
                        },{
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(() => {window.location.reload()})
                        .catch(() => {this.messError = 'Une erreur c\'est produite'})
                    } else {                     
                        if(this.postLikes.find(x => x.userId == userId)) {
                            this.like = true   
                            
                            axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                                like: this.like,
                            },{
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            })
                            .then(() => {window.location.reload()})
                            .catch(() => {this.messError = 'Une erreur c\'est produite'})
                        } else {
                            this.like = false   
                        
                            axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                                like: this.like,
                            },{
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            })
                            .then(() => {window.location.reload()})
                            .catch(() => {this.messError = 'Une erreur c\'est produite'})
                        }
                    }
                })
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },
        }
    }
</script>


<style scoped lang="scss">

</style>