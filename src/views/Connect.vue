<template v-if="!token">
    <section class="connect">
        <form class="login">
            <label>Couriel</label>
            <input type="email" required/>
            <label>Mot de passe</label>
            <input type="password" required/>
            <button type="submit">Connection</button>
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
            <button type="submit">S'inscrire</button>
        </form>
    </section>
</template>

<script>
    export default {
        name: 'Connect',
        components: {},
        data:function(){
            return{
            }
        }
    }
</script>

<style lang="scss" scoped>


</style>