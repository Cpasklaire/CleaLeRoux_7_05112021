<template>
    <div id="app">
        <h1>Groupomania</h1>
        <Header @filterMessages="filterMessage" />        
        <Wall :filter="filter"/>
    </div>
</template>


<script>
    import Header from './components/Header.vue'    
    import Wall from './components/Wall.vue'

    export default {
        name: 'App',
        components: {
            Header,            
            Wall
        },
        data() {
            return {
                filter: 'all'
            }
        },
        methods: {
            filterMessage: function(filter) {
                this.filter = filter
            }
        }
    }
</script>


<style lang='scss'>

    html, 
    body {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0
    }

    #app {
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0
    }

    /* Police */
    @font-face {
        font-family: 'modern';
        src: url(assets/modern/ModernSans-Light.otf);
    }

    /* Général */
    *
    {
        font-family: 'modern', Arial, serif;
        text-decoration: none;
        color: black;
    }

body
{
  background-color: #D1515A;
}

/* Responsive */
@media (min-width: 992px)
{
    .mobil
    {
        display: none;
    }

}

@media (max-width: 992px)
{
    .pc
    {
        display: none;
    }
}
</style>
