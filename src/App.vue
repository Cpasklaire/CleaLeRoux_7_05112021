<template>
<div id="app">
    <HeaderMobile />
    <HeaderPC />
    <Writing />
    <Wall />  
</div>
</template>

<script>
import HeaderMobile from './components/HeaderMobil.vue'
import HeaderPC from './components/HeaderPC.vue'
import Writing from './components/Writing.vue'
import Wall from './components/Wall.vue'

export default {
  name: 'App',
  components: {
    HeaderMobile,
    HeaderPC,
    Writing,
    Wall
  }
}
</script>


<style lang='scss'>

/*Police*/
@font-face {
    font-family: 'OpenDyslexic';
    src: url(assets/opendyslexic/OpenDyslexic-Regular.otf);}

/*Général*/
*
{
    font-family: 'OpenDyslexic', Arial, serif;
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
