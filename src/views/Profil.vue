<template>
    <div>
        <section class="profil" v-for="item in userInfo" :key="item.id">
        <router-link to="/"><i class="fas fa-arrow-circle-left"></i></router-link>
            <div class="entete">
                <img :src="'../../backend/images/avatars/' + item.avatar" :alt="'avatar de' + item.userName" class="avatar">
                <h2>{{item.userName}}</h2>
            </div>
            <p>{{item.description}}</p>
            <div class="infoUser">
                <span>Mes infos personnelles</span> <br>
                <span>Courriel : {{item.mail}}</span><br>
                <span>Mot de passe : **********</span><br>
                <span>Statut : Ressource humaine</span><br>
            </div>
            <div class="bouton">
                <button>Modifier</button>
                <button>Supprimer</button>
            </div>
            <div class="date">
                <span>Création du compte : {{item.createDate}}</span><br>
                <span>Derniére connection : {{item.lastRefreshDate}}</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'Profil',
        components: {},
        data:function(){
            return{
                userInfo: [
                    { 
                        userId: 'user.id',
                        avatar: 'user.avatar',
                        userName: 'user.firstname + user.lastname',
                        mail: 'user.mail',
                        createDate: 'user.createDate',
                        lastRefreshDate: 'user.lastRefreshDate', 
                    },
                ]
            }
        },
        mounted: {
            appelProfil: function() {
                const userId = localStorage.getItem('userId');
				this.$http.get('http://localhost:3000/api/user/' + userId, {
					headers: {
						//Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(response => {response.userInfo, console.log(response.data.user)})
			},
        },
        methods: {
            
        },
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