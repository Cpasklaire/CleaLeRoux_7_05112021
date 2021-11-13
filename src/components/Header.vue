<template>
  <header>
    <!-- Header pour mobil -->  
    <input type="checkbox" id="menu-toggle"/>
    <label id="trigger" for="menu-toggle"></label>
    <label id="burger" for="menu-toggle"></label>
    <ul id="menu">
        <li>
            <select>
                <option v-on:click="showMessages('all')">Voir tous les messages</option>
                <option v-on:click="showMessages('new')">Voir les messages non lu</option>
                <option v-on:click="showMessages('image')">Voir les images</option>
                <option v-on:click="showMessages('text')">Voir les textes</option>
            </select>
        </li>
        <li>
            <Profil/>
        </li> 
    </ul> 
    <button v-on:click="togglewWriteElement"><i class="fas fa-edit"></i></button>
    <Writing v-if="showWriteElement" />
  </header>
</template>

<script>
    import Writing from './Writing.vue'
    import Profil from './Profil.vue'       
    export default {name: 'Header',
        components: {
            Writing,
            Profil
        },
    data() {
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
    }
}

</script>

<style lang="scss">
header 
{
@keyframes checked-anim {
    50% {
        width: 100%;
        height: 100%;
    }
    100% {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
}
li, a {
    margin: 75px 0 -55px 0;
    color: black;
    text-decoration: none;
    text-transform: none;
    display: none;
}
li {
    width: 230px;
    text-indent: 56px;
    }

#trigger, #burger, #burger:before, #burger:after {
    position: absolute;
    top: 25px;
    left: 25px;
    background: #091F43;
    width: 30px;
    height: 5px;
    transition: .2s ease;
    cursor: pointer;
    z-index: 1;
}
#trigger {
    height: 25px;
    background: none;
}
#burger:before {
    content: " ";
    top: 10px;
    left: 0;
}
#burger:after {
    content: " ";
    top: 20px;
    left: 0;
}
#menu-toggle:checked + #trigger + #burger {
    top: 35px;
    transform: rotate(180deg);
    transition: transform .2s ease;
}

#menu-toggle:checked + #trigger + #burger:before {
    width: 20px;
    top: -2px;
    left: 18px;
    transform: rotate(45deg) translateX(-5px);
    transition: transform .2s ease;
}
#menu-toggle:checked + #trigger + #burger:after {
    width: 20px;
    top: 2px;
    left: 18px;
    transform: rotate(-45deg) translateX(-5px);
    transition: transform .2s ease;
}
#menu {
    position: absolute;
    margin: 0; padding: 0;
    width: 110px;
    height: 110px;
    background-color: #fff;
    border-bottom-right-radius: 100%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.26);
    animation: not-checked-anim .2s both;
    transition: .2s;
}
#menu-toggle:checked + #trigger + #burger + #menu {
    animation: checked-anim 1s ease both;
}
#menu-toggle:checked + #trigger ~ #menu > li, a {
    display: block;
}
[type="checkbox"]:not(:checked), [type="checkbox"]:checked {
    display: none;
}

.fa-edit
{
    position: absolute;
    bottom: 5%;
    right: 5%;
    background-color: #091F43;
    padding: 3%;
    border-radius: 100%;
    box-shadow: rgb(129, 129, 129) 2px 2px 3px;
    color: white;
    font-size: 1.5em;
}
}
</style>