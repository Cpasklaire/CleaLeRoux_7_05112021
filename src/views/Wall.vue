<template>
    <div class="wall">
        <Header @selectFilter="applyFilter"/>
        <!--Publication -->
        <div v-for="post in posts" :key="post.postId">
            <div  v-if="filter == 'all' || (filter == 'image' && post.imageURL) || (filter == 'text' && !post.imageURL) || (filter == 'new' && post.createdAt <= lastUpdateDate)">
                <article class="post">

                    <div class="ecrivain">
                        <img v-if="post.User.avatar == !null" :src="post.User.avatar" :alt="'avatar de' + post.User.lastName + post.User.firstName" class="avatar"/>
                        <i v-if="post.User.avatar == null || post.User.avatar == ''" class="fa fa-user-astronaut"></i>
                        <span> {{post.User.lastName}} {{post.User.firstName}} </span>
                    </div>

                    <div v-if="!voirModifPost" class="contenu">
                        <p>{{post.text}}</p>
                        <img :src="post.imageURL" style="max-width: 100%" />
                    </div>
                    <div>
                    <form :postId="post.id" v-if="modifId == 'modifSection-' + post.id" v-on:submit.prevent="modifPost">
                        <textarea v-model="post.text" class="" name="message" id="message"/>    
                        <img v-if="imagePreview" :src="imagePreview" id="preview" class=""/>     
                        <input type="file" @change="onFileSelected" accept="image/*">       
                        <button type="submit">Publier</button>
                    </form>
                    </div>

                    <div class="date">
                        <span>Publié le {{ dateFormat(post.createdAt) }}</span>
                        <span v-if="post.createdAt == !post.updatedAt">Modifié le {{ dateFormat(post.updatedAt) }}</span>
                    </div>

                    <div class="boutons">
                        <button class="like" v-on:click="likePost(post.id)">
                            <i class="fas fa-heart coeurrempli"></i>
                            <i class="far fa-heart coeurvide"></i>
                            <i class="fas fa-bacon calque"></i>
                        </button>
                        <span v-if="post.likes > 0" class="likeCompteur">{{ post.likes }}</span>
                        <button v-on:click="repondre('replyForm-' + post.id)">Répondre</button>
                        <button v-on:click="voir('commentSection-' + post.id)">Voir les commentaires</button>
                    </div>

                    <div class="ecrivain-boutons">
                        <button v-if="userId == post.userId" v-on:click="modifPostBouton('modifSection-' + post.id)">Modifier</button>
                        <button v-if="userId == post.userId || statut == 'admin'" v-on:click="deletePost(post.id)">Supprimer</button>
                    </div>
                </article>

                <WritingComm :postId="post.id" v-if="replyFormId == 'replyForm-' + post.id"/>
                <Commentaire :postId="post.id" :commentaires="commentaires" />
                <!-- v-if="1 || commentSectionId == 'commentSection-' + post.id" -->
            </div>
        </div>
    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'

    import Header from '@/components/Header.vue'
    import WritingComm from '@/components/WritingComm.vue'
    import Commentaire from '@/components/Commentaire.vue'

    export default {
        name: 'Wall',
        components: {
            Header,
            WritingComm,
            Commentaire,
        },

        data() {
            return {
                //identification
                userId: localStorage.getItem('userId'),
                statut: localStorage.getItem('statut'),
                //affichage post
                posts: [],
                post: '',
                imageURL: '',
                text: '',
                //affichage commentaire
                commentaires: [],
                //Like
                like: false,
                postLikes: [],
                //bouton
                boutonVoir: false,
                filter: 'all',
                replyFormId: '',
                commentSectionId: '',
                likeFormId: '',
                voirModifPost: false,
                modifId: '',
                
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
            repondre(replyFormId) {
                this.replyFormId = replyFormId
            },

            // format date
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format('DD/MM/YYYY')
                }
            },

            //bouton
			modifPostBouton(){
				this.voirModifPost = !this.voirModifPost
            },
            // modifier post
            modifPost(modifId) {
                this.modifSectionId = modifId;
                const postId = modifId.replace('modifSection-', '');

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
                .catch(() => {this.messError = 'Une erreur s\'est produite'})
            },

            // afficher les commentaires
            voir(sectionId) {
                this.commentSectionId = sectionId;
                this.boutonVoir = !this.boutonVoir

                const postId = sectionId.replace('commentSection-', '');

                axios.get('http://localhost:3000/api/commentaire/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {this.commentaires = response.data;})
                .catch(() => {this.messError = 'Une erreur c\'est produite'})
            },



            applyFilter(filter) {
                this.filter = filter
            },

            //like
            likePost(postId) {
                // this.likeFormId = formId;
                // const postId = formId.replace('likeForm-', '');

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
                        if(this.postLikes.find(localStorage.getItem('userId') == this.userId)) {
                            this.like = true

                            axios.post('http://localhost:3000/api/post/' + this.postId + '/like', {
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

                            axios.post('http://localhost:3000/api/post/' + this.postId + '/like', {
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