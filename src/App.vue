<template>
<div id="app">
    <HeaderMobile />
    <Writing />
    <Wall />  
</div>
</template>

<script>
import HeaderMobile from './components/HeaderMobil.vue'
import Writing from './components/Writing.vue'
import Wall from './components/Wall.vue'

export default {
  name: 'App',
  components: {
    HeaderMobile,
    Writing,
    Wall
  }
}
</script>


<style lang='scss'>

/*Police*/
@font-face {
    font-family: 'modern';
    src: url(assets/modern/ModernSans-Light.otf);}

/*Général*/
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

/*Responsive*/
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
