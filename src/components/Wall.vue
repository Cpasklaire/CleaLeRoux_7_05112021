<template>
  <!--<section class="wall" v-for="item in publicationList">
     tous les messages 
    <article v-if="selected === 'a'">
    <div class="messagetext">
      <h2>{{ Username }}</h2>
      <p>{{ Usertext }}</p>
      <img href: "ouquelleestlimage+  imageNum ">
      <span>{{ date }}</span>
    </div>      
    </article>
        non lu 
    <article v-if="selected === 'b'">
      afficher les message avec une date suppérieur au dernier token donner 
    </article>
        textuel 
    <article v-if="selected === 'c'">
      publication.image == null
    </article>
        tous avec image
    <article v-if="selected === 'd'">
      publication.image == !null
    </article>
  </section>-->
  <section>
  coucou
  </section>
</template>

<script>
/*    const wall = new Vue({
        el: '#wall',
        data: {
            publicationList: [
                { Username: 'Jean Jacques', 
                Usertext: 'il fait beau',
                imageNum: 42,
                date: 123456789
                },
            ]
        }
    })*/
</script>

<style >
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