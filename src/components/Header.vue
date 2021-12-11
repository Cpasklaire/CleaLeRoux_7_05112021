<template>  
      <header>
    <!-- Header pour mobil -->
    <div class="top">
        <div class="nav">
            <router-link to="/profil"><i class="fas fa-user-tie"></i></router-link>
            <img v-on:click="actualiser" src="../assets/illutration/icon-left-font.png" alt="Logo de Groupomania"/>
        </div>   
            <select>
                <option v-on:click="showMessages('all')">Voir tous les messages</option>
                <option v-on:click="showMessages('new')">Voir les messages non lu</option>
                <option v-on:click="showMessages('image')">Voir les images</option>
                <option v-on:click="showMessages('text')">Voir les textes</option>
            </select>
    </div>    
    
    <button v-on:click="togglewWriteElement"><i class="fas fa-edit"></i></button>
    <Writing v-if="showWriteElement" />
  </header>
</template>

<script>
    import Writing from '../components/Writing.vue'

    export default {
        name: 'Header',
        components: {
            Writing, 
        },
        
        data(){
            return {
                showWriteElement: false,
            }
        },
        
        methods: {
            showMessages: function(filter) {
                this.$emit('filterMessages', filter)
            },
            togglewWriteElement: function() {
                this.showWriteElement = !this.showWriteElement
            },
            actualiser: function() {
                window.location.reload()
            },
        }
    }
</script>

<style scoped lang="scss">
header 
{
    .top
    {
        margin: 3%;
        .nav
        {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5%;
            .fa-user-tie
            {
                font-size: 3em;
                color: #091F43;
            }
            img
            {
                width: 60%;
            }
        }
        select
        {
            font-size: 1.3em;
            position: absolute;
            right: 3%;
        }
    }
    .fa-edit
    {
        position: absolute;
        bottom: 5%;
        right: 5%;
        background-color: #091F43;
        padding: 4%;
        border-radius: 100%;
        box-shadow: rgb(129, 129, 129) 2px 2px 3px;
        color: white;
        font-size: 1.5em;
    }
}
</style>