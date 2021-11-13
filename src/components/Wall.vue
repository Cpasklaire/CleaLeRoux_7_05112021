<template>
    <section class="wall">
        <article class="post">
            <img src="../../backend/images/avatars/seiya.jpg" alt="avatar de Seiya Pégase" class="avatar">
            <span class="nom">Seiya Pégase</span>
            <p class="story">Ici votre RH préféré, n'hésitez pas à compléter votre profil !</p>
            <div class="answer">
                <button class="heart-container">
                    <svg class='heart-stroke'>
                        <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                    </svg>
                    <span v-on:click="like" class='heart-clip'></span>
                </button>
                <button>Répondre</button>
                <button>Voir les commentaires</button>
            </div>
            <article class="commentaire">
                <img src="../../backend/images/avatars/Ikki.png" alt="avatar de Ikki Phénix" class="avatar">
                <span class="nom">Ikki Phénix</span>
                <p class="story">Profil complet ;)</p>
                <img src="../../backend/images/1.png" alt="image partagée par Ikki Phénix" class="imgPost">
                <div class="answer">
                    <button class="heart-container">
                        <svg class='heart-stroke'>
                            <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                        </svg>
                        <span v-on:click="like" class='heart-clip'></span>
                    </button>
                </div>
            </article>

        </article>

        <article class="post">
            <img src="../../backend/images/avatars/athena.jpg" alt="avatar de Saori Kido" class="avatar">
            <span class="nom">Saori Kido</span>
            <p class="story">Bienvenue sur votre raisseau d'entreprise ! Tenez vous au courant et partagez.</p>
            <img src="../../backend/images/2.jpg" alt="image partagée par Saori Kido" class="imgPost">
            <div class="answer">
                <button class="heart-container">
                    <svg class='heart-stroke'>
                        <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z"/>
                    </svg>
                    <span v-on:click="like" class='heart-clip'></span>
                </button>
                <button>Répondre</button>
            </div>
        </article>
    </section>

        <!--<h2>Tous les messages</h2>
        {{ date }}
        Tous les messages 
        <article v-for="item in publicationList" :key="item.id" class="messagetext">     
            <div v-if="filter == 'all' || (filter == 'mine' && item.authorId == currentAuthorId) || (filter == 'messages' && item.type == 'message')" >
                <h2>{{ item.username }}</h2>        
                <p>{{ item.message }}</p>
                <img>
                <span>{{ item.date }}</span>            
            </div>
        </article>
        
        
      
        <button v-on:click="loadNewMessages">Charger les nouveaux messages</button>
    </section>-->
</template>

<script>

    export default {
        name: 'Wall',
        components: {
            
        },
        props: ['filter'],
        data: function () {
            return {
                showWriteElement: false,
                date: 'Jeudi 11 9:00',
                currentAuthorId: 2,
                lastUpdateDate: 0,
                publicationList: [
                    { 
                        id: 1234,
                        type: 'message',
                        authorId: 1,
                        username: 'Jean Jacques', 
                        message: 'il fait beau',
                        imageUrl: '42.png',
                        date: 123456789
                    },
                    { 
                        id: 1235,
                        type: 'message',
                        authorId: 2,
                        username: 'Jean Michel', 
                        message: 'chez moi il pleut',
                        imageUrl: '42.png',
                        date: 123456789
                    }
                ]        
            }
        },
        mounted: function() {
            // alert('C\'est ici qu\'on charge les messages à l\'init');
            // this.publicationList = await this.$http.get('/posts');  ($http est un wrapper vueJS autour de axios) 
            // fetch() 
        },
        methods: {
            togglewWriteElement: function() {
                this.showWriteElement = !this.showWriteElement
            },
            loadNewMessages: function() {
                // let headers = {
                    // Authorization: 'token'
                // }
                // let newMessages = await this.$http.get('/posts?date=' + this.lastUpdateDate, {headers: headers})
                // boucler sur les messages qui arrivent
                // messages.forEach(element => {
                    // ajouter le message dans publicationList
                    // this.lastUpdateDate = message.date
                // } )
                // ajouter les messages dans publicationList ... 
                this.publicationList.push({
                    id: 1236,
                    type: 'message',
                    authorId: 2,
                    username: 'Cléa', 
                    message: 'Mon chien a faim',
                    imageUrl: '42.png',
                    date: 123456789
                })
            }
        }
    }    
</script>

<style lang="scss" scoped>
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