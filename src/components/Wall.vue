<template>
    <section class="wall">

        <button v-on:click="togglewWriteElement">Ecrire</button>

        <Writing v-if="showWriteElement" />

        <h2>Tous les messages</h2>
        {{ date }}
        <!--Tous les messages -->
        <article v-for="item in publicationList" :key="item.id" class="messagetext">     
            <div v-if="filter == 'all' || (filter == 'mine' && item.authorId == currentAuthorId) || (filter == 'messages' && item.type == 'message')" >
                <h2>{{ item.username }}</h2>        
                <p>{{ item.message }}</p>
                <img>
                <span>{{ item.date }}</span>            
            </div>
        </article>
        
        
        <!--textuel -->        
        <button v-on:click="loadNewMessages">Charger les nouveaux messages</button>
    </section>
</template>

<script>
    import Writing from './Writing.vue'
    export default {
        name: 'Wall',
        components: {
            Writing
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
    div
    {
        border: 3px solid #091F43;
        background-color: white;
        width: 90%;
        padding: 2%;
    }
    p 
    {
        text-align: center;
    }
    span 
    {
        text-align: right;
    }
}
</style>