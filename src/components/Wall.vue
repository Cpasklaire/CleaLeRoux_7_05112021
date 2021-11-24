<template>
    <div>    
        <section class="wall" v-for="item in publicationList" :key="item.id">
            <!-- tous les message -->
            <article class="post" v-if="!item.parentId && filter == 'all' || (filter == 'image' && item.imageUrl) || (filter == 'messages' && !item.imageUrl) || (filter == 'new' && post.createDate <= lastUpdateDate)">                
                <img :src="'../../backend/images/avatars/' + item.avatar" :alt="'avatar de' + item.userName" class="avatar">
                <span class="nom">{{item.userName}}</span>
                <p class="story" v-if="item.text">
                    {{item.text}}
                </p>
                <img v-if="post.imageURL" :src="'../../backend/images/' + item.imageUrl" :alt="'image partagée par ' + item.userName" class="imgPost">
                <p>
                    {{item.createDate}}
                </p>
                <div class="answer">
                    <button class="heart-container">
                        <svg class='heart-stroke'>
                            <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                        </svg>
                        <span v-on:click="like" class='heart-clip'></span>
                    </button>
                    <button v-on:click="togglewRepElement">Répondre</button>
                    <button>Voir les commentaires</button>   
                </div>
                <WritingReponse v-if="showRepElement" />
                <div v-for="childItem in publicationList" :key="childItem.id">
                    <article class="commentaire" v-if="childItem.parentId == item.id" >
                        <img :src="'../../backend/images/avatars/' + childItem.avatar" :alt="'avatar de ' + childItem.userName" class="avatar">
                        <span class="nom">{{childItem.userName}}</span>
                        <p class="story">{{childItem.text}}</p>
                        <img src="'../../backend/images/' + childItem.imageUrl" :alt="'image partagée par ' + childItem.userName" class="imgPost">
                        <div class="answer">
                            <button class="heart-container">
                                <svg class='heart-stroke'>
                                    <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                                </svg>
                                <span v-on:click="like" class='heart-clip'></span>
                            </button>
                        </div>
                    </article>
                </div>
            </article>
        </section>
    </div>
</template>

<script>
import WritingReponse from './WritingReponse.vue'
    export default {
        name: 'Wall',
        components: {
            WritingReponse,
        },
        props: ['filter'],
        data: function () {
            return {
                showRepElement: false,
                lastUpdateDate: 0, //user.lastRefreshDate
                publicationList: [
                    { 
                        id: 123,
                        parentId: null,
                        userId: 'user.id',
                        avatar: 'user.avatar',
                        userName: 'user.firstname + user.lastname',
                        text: 'post.message CECI EST LE PARENT 123',
                        imageUrl: 'post.imageURL',
                        createDate: 'post.createDate',
                    },
                    { 
                        id: 124,
                        parentId: 123,
                        userId: 'user.id',
                        avatar: 'user.avatar',
                        userName: 'user.firstname + user.lastname',
                        text: 'post.message ENFANT DU 123, JE SUIS le 124',
                        imageUrl: 'post.imageURL',
                        createDate: 'post.createDate',
                    },
                    { 
                        id: 125,
                        parentId: 122,
                        userId: 'user.id',
                        avatar: 'user.avatar',
                        userName: 'user.firstname + user.lastname',
                        text: 'post.message JE DOIS AS APPARAITRE',
                        imageUrl: 'post.imageURL',
                        createDate: 'post.createDate',
                    },
                    { 
                        id: 126,
                        parentId:  123,
                        userId: 'user.id',
                        avatar: 'user.avatar',
                        userName: 'user.firstname + user.lastname',
                        text: 'post.message JE SUI SLe 126 et mon pere est darth vador',
                        imageUrl: 'post.imageURL',
                        createDate: 'post.createDate',
                    },
                ]        
            }
        },
        mounted: function() {
            // alert('C\'est ici qu\'on charge les messages à l\'init');
            // this.publicationList = await this.$http.get('/posts');  ($http est un wrapper vueJS autour de axios) 
            // fetch() 
        },
        methods: {
            togglewRepElement: function() {
                this.showRepElement = !this.showRepElement
            },
            post: function() {
                // todo
            },
            like: function() {
                // todo
            }
        }
    }    
</script>

<style lang="scss" scoped>
@keyframes apparition
{
    from
    {
        opacity: 50%;
        margin-top: 40%;
    }
    to
    {
        opacity: 100%;
        margin-top: 0%;
    }
}
.wall
{
    margin-top: 25%;
    margin-right: 3%;
    margin-left: 3%;

    .post
    {
        border: #D1515A 5px solid;
        border-radius: 30px;
        margin-bottom: 5%;
        padding-top: 5%;
        padding-left: 5%;
        padding-right: 5%;
        background-color: rgba(9, 31, 67, 0.1);
                animation-delay: 500ms;
        animation-timing-function: ease-in;    
        animation-name: apparition;
        animation-duration: 2s;
        .avatar
        {
            width: 70px;
            height: 70px;
            border-radius: 100%;
        }
        .nom 
        {
            font-size: 1.5em;
            margin-left: 5%;
            color: #D1515A;
            font-weight: bold;
        }
        .story 
        {
            margin-top: 10%;
            color: #091F43;
            font-size: 1.2em;
        }
        .imgPost
        {
            width: 100%;        
        }
        .answer
        {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            margin-bottom: 10%;
            margin-top: 10%;
            button 
            {
                margin: 0;
                padding: 0;
                font-size: 1em;
                border: none;
                color: #D1515A;
                font-weight: bold;
            }
        }
    }
.commentaire
{
    background-color: rgba(9, 31, 67, 0.1);
    width: 110%;
    margin: -5%;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 5%;
    padding-bottom: 0%;
    border-radius: 30px;
}
    .heart-container 
{
   position: relative;
   width: 40px;
   height: 40px;
}

.heart-stroke /*contour*/
{
   width: 40px;
   height: 40px;
   position: absolute;
   fill: black;
   left: 0px;
}

.heart-clip /*couleur*/
{
   display: block;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   clip-path: path('M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z');

   &:hover 
  {
      &::before /*maintient*/
     {
         transform: scale(1);
         opacity: 1;
      }
   }
   &::before /*grossissement*/
  {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #D1515A;
      opacity: 0;
      transform: scale(0);
      transition: transform 0.2s linear, opacity 0.2s linear;
      transform-origin: center 60%;
   }
}
}
</style>