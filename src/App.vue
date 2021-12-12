<template>
  <div id="app">  
    <router-view/>
  </div>
</template>


<style lang="scss">
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
    button
    {
        border-radius: 30px;
        box-shadow: 0px 3px 5px #091F43;
        width: 50%;
        font-size: 1.3em;
        color: #D1515A;
        margin-top: 3%;
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
