<template>
  <header >

  <button v-on:click="showMessages('all')">Tous</button>
  <button v-on:click="showMessages('mine')">Mes messages</button>
  <button v-on:click="showMessages('images')">Image</button>

  <!--<div class="mobil">
    <b-navbar toggleable="lg" >
      
      <b-navbar-brand>
        <h1>GroupoSocial</h1>

      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          lien vers compte user
          <b-navbar-nav>
            <b-nav-item href="http://localhost:8080/userId">Mon compte</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>-->
  <!--<div class="pc">
    <nav>
      
      <div class="nav-item">
        <h1>GroupoSocial</h1>
        par 
        
      </div>
      
      <div class="nav-item">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>
      lien vers compte user
      <div class="nav-item">
        <a href="http://localhost:8080/moncompte?userId">Mon compte</a>
      </div>
    </nav>
    </div>-->
  </header>
</template>

<script>
export default {
    data() {
        return {
            selected: 'a',
            options: [
                { value: 'a', text: 'Voir tous les messages' },
                { value: 'b', text: 'Messages non lu' },
                { value: 'c', text: 'Messages textuel' },
                { value: 'd', text: 'Messages avec image' },
            ],
            userId: "123"  
        }    
    },
    methods: {
        showMessages: function(filter) {
            this.$emit('filterMessages', filter)
        }
    }
}
/* value
a = reload all
b = select new message
c = select textMess
d = select imgMess
*/
</script>

<style lang="scss">
.mobil
{
/*couleur*/
    h1
  {
    font-size: 1em;
    color: white;
  }
        select
      {
        background-color: #091F43;
        color: white;
        border: none;
        option
        {
          color: white;
        }
        &:focus
        {
          border: none;
        }
      }
}
.pc
{
  background-color: #091F43;
  
  nav
  {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 2%;
    margin-right: 2%;

    .nav-item
    {
      color: white;

      h1
      {
        color: white;
        font-size: 1.5em;
      }

      select
      {
        width: 110%;
        height: 100px;
        background-color: #091F43;
        color: white;
        border: none;
        
        option
        {
          color: white;
        }
      }

      a
      {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>