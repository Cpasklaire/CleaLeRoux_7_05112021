<template v-if="!token">
    <section class="connect">
        <form class="login">
            <label>Couriel</label>
            <input type="email" required/>
            <label>Mot de passe</label>
            <input type="password" required/>
            <button v-on:click="connect" value="Submit">Connection</button>
        </form>
        <form class="signin">
            <label>Nom</label>
            <input type="text" required placeholder="Phenix"/>
            <label>Prénom</label>
            <input type="text" required placeholder="Ikki"/>
            <label>Couriel</label>
            <input required type="email" pattern=".+@groupamania.fr" placeholder="ikkiphenix@groupamania.fr"/>
            <label>Mot de passe</label>
            <input type="password" required/>
            <button v-on:click="creatUser" value="Submit">S'inscrire</button>
        </form>
        <span>{{msgError}}</span>
    </section>
</template>

<script>
    export default {
        name: 'Connect',
        components: {},
        data:function(){
            return{
            }
        },
        methods:{
      creatUser() {
          axios
            .post("http://localhost:3000/api/auth/signup", fd, {
              headers: {
                //Authorization: "Bearer " + window.localStorage.getItem("token")
              }
            })
            .then(response => {
              if (response) {
                window.location.reload();
              }
            })
            .catch(error => (this.messError = error));
        }
      },
            connect() {
          axios
            .post("http://localhost:3000/api/auth/login", fd, {
              headers: {
                //Authorization: "Bearer " + window.localStorage.getItem("token")
              }
            })
            .then(response => {
              if (response) {
                window.location.reload();
              }
            })
            .catch(error => (this.messError = error));
        }
      },
    }
</script>

<style lang="scss" scoped>


</style>