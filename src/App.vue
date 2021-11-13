<template>
    <div id="app">
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
    /* Police */
    @font-face {
        font-family: 'modern';
        src: url(assets/modern/ModernSans-Light.otf);
    }

    /* Général */
*
{
    font-family: 'modern', Arial, serif; 
    color: black;   
    text-decoration: none;
    background-color: transparent;
    margin: 0;
    border: none;
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
