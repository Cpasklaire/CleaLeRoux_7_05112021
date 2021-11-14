<template>
    <div id="app">              
        <router-view />    
    </div>
</template>


<script>    
    export default {
        name: 'App'        
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
