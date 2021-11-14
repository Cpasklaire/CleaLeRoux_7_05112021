<template>
    <section class="profil">
        <div class="entete">
            <img src="../../backend/images/avatars/seiya.jpg" alt="avatar de Seiya Pégase" class="avatar">
            <h2>Seiya Pégase</h2>
        </div>
        <p>description : je suis super !!</p>
        <div class="infoUser">
            <span>Mes infos personnelles</span> <br>
            <span>Courriel : *****@groupomania.fr</span><br>
            <span>Mot de passe : **********</span><br>
            <span>Statut : Ressource humaine</span><br>
        </div>
        <div class="bouton">
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
        <div class="date">
            <span>Création du compte : 11/11/1111</span><br>
            <span>Derniére connection : 22/22/222</span>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Profil',
        components: {}
    }
</script>

<style lang="scss" scoped>
.profil
{
    width: 100%;
    height: 100%;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 15%;
    text-indent: 0px;
    .entete 
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        img 
        {
            width: 100px;
            height: 100px;
            border-radius: 100%;
        }
        h2 
        {
            white-space: nowrap; 
            color: #D1515A;
            font-weight: bold;
            font-size: 2em;
            text-indent: 0;
            margin: 10%;
        }
    }
    p 
    {
        background-color: rgba(9, 31, 67, 0.1);
        border-radius: 30px;
        width: 100%;
        margin-top: 5%;
        height: 200px;
        padding: 3%;
        text-align: center;
    }
    .bouton
    {
        display: flex;
        justify-content: space-around;
        margin-top: 5%;
        margin-bottom: 5%;
        button 
        {
            margin: 0;
        }
    }
}

</style>