<template>  
    <div class="wall">
        <Header/>
        <!--Publication -->
        <div class="post" v-for="post in posts" :key="post.postId">
            <article v-if="filter == 'all' || (filter == 'image' && post.imageURL) || (filter == 'messages' && !post.imageURL) || (filter == 'new' && post.createdAt <= lastUpdateDate)">
                
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
                    <button v-on:click="repondre">Répondre</button>
                    <button v-on:click="voir">Voir les commentaires</button>
                </div>
                
                <div class="ecrivain-boutons" v-if="userId == post.UserId">
                    <button v-on:click="modifPost">Modifier</button>
                    <button v-on:click="deletePost">Supprimer</button>
                </div>
            </article>

            <WritingComm v-if="repondre"/>

            <!--Commentaire-->
            <div class="commentaire" v-if="voir">
                <div v-for="commentaire in commentaires" :key="commentaire.commentaireId">
                    
                    <div class="ecrivain">
                        <img :src="commentaire.User.avatar" :alt="'avatar de' + commentaire.User.lastName + commentaire.User.firstName" class="avatar"/>
                        <span> {{commentaire.User.lastName + commentaire.User.firstName}} </span>
                    </div>
                    
                    <div class="contenu">
                        <p>{{commentaire.text}}</p>
                    </div>
                    
                    <span class="">Publié le {{ dateFormat(commentaire.createdAt) }}</span>
                    
                    <div class="ecrivain-boutons" v-if="userId == commentaire.UserId">
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
    import WritingComm from '@/components/WritingComm.vue'

    export default {
        name: 'Wall',
        components: {
            Header,
            WritingComm,
        },

        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                //affichage post
                posts: [],
                post: '',
                imageURL: '',
                text: '',
                //affichage commentaire
                commentaire: [],
                //Like
                like: false,
                postLikes: [],
                //bouton
                boutonVoir: false,
            }
        }, 

        mounted() { 
            //afficher les posts               
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
            // format date
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },

            // modifier post
            modifPost(id) {
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

            // supprimer post
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
            
            // afficher les commentaires
            voir(id) {
                this.boutonVoir = !this.boutonVoir

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

            // supprimer un commentaire
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